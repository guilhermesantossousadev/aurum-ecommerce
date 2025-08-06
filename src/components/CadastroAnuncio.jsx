import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import DragAndDropUploader from "./DragAndDropUploader";
import SpecificInputs from "./SpecificInputs";

import "../styles/components/CadastroAnuncio.css";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "https://marketplacejoias-api-latest.onrender.com/api";

const initialFormState = {
  tipoPeca: "",
  valor: 0,
  descricao: "",
  peso: 0,
  material: "",
  isStudded: false,
  materialCravejado: "",
  tamanho: 0,
  formato: "",
  tipoFecho: "",
  modelo: "",
  altura: 0,
  pesoIndividual: 0,
  comprimento: 0,
  espessura: 0,
  havePendant: false,
  tipoCorrente: "",
  regiao: "",
  fechamento: "",
  isAntiallergic: false,
  haveCharms: false,
  flexibilidade: "",
  tipoMovimento: "",
  haveWaterResistance: false,
  diametroCaixa: 0,
  materialPulseira: "",
  fonteEnergia: "",
};

const CadastroAnuncio = () => {
  const user = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialFormState);
  const [joiaId, setJoiaId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Verificação de login
  if (!user || !user.id) {
    return (
      <div className="CadastroAnuncio">
        <div className="CadastroAnuncio-container">
          <div className="CadastroAnuncio-error">
            <h2>Você não está logado</h2>
            <p>Por favor, faça login para acessar o cadastro de anúncio.</p>
            <a href="/login" className="btn-login">
              Ir para Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleChangeNumeros = (e) => {
    const { name, value } = e.target;
    const somenteNumeros = value.replace(/[^0-9.]/g, "");
    const partes = somenteNumeros.split(".");
    let formatted = partes[0];
    if (partes.length > 1) {
      formatted += "." + partes.slice(1).join("");
    }

    setForm((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "radio" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleBooleanChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImages = async () => {
    if (!selectedImages.length) {
      toast.error("Nenhuma imagem selecionada.");
      return [];
    }

    const formData = new FormData();
    selectedImages.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(
        `${apiBaseUrl}/Anuncio/UploadImagesAnuncio`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Erro ao enviar imagens.");
      const urls = await response.json();
      toast.success("Imagens enviadas com sucesso!");
      return urls;
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  };

  const handleCreateJoia = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/Joia/PostJoia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Erro ao criar joia.");
      const id = await response.text();
      setJoiaId(id);
      toast.success("Joia criada com sucesso!");
      setStep(2);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAnuncio = async () => {
    setIsLoading(true);
    try {
      const urls = await handleUploadImages();
      const anuncioData = {
        joiaId,
        titulo,
        urLs: urls,
        usuarioId: user.id,
      };
      const response = await fetch(`${apiBaseUrl}/Anuncio/PostAnuncio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anuncioData),
      });
      if (!response.ok) throw new Error("Erro ao criar anúncio.");
      toast.success("Anúncio criado com sucesso!");
      setStep(1);
      setForm(initialFormState);
      setJoiaId(null);
      setTitulo("");
      setSelectedImages([]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="PostAnuncios">
      <div className="step-counter">
        <p>{step === 1 ? "Cadastro da Joia" : "Cadastro do Anúncio"}</p>
        <div className="step-bar">
          <div className={`step-progress ${step === 2 ? "complete" : ""}`} />
        </div>
      </div>

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateJoia();
          }}
        >
          <label>Tipo da Peça</label>
          <select
            name="tipoPeca"
            value={form.tipoPeca}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Anel">Anel</option>
            <option value="Brinco">Brinco</option>
            <option value="Colar">Colar</option>
            <option value="Piercing">Piercing</option>
            <option value="Pingente">Pingente</option>
            <option value="Pulseira">Pulseira</option>
            <option value="Relogio">Relógio</option>
          </select>

          <label>Valor</label>
          <input
            type="text"
            name="valor"
            value={form.valor}
            onChange={handleChangeNumeros}
            required
          />

          <label>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
          />

          <label>Peso</label>
          <input
            type="text"
            name="peso"
            inputMode="decimal"
            value={form.peso}
            onChange={handleChangeNumeros}
            required
          />

          <label>Material</label>
          <select
            name="material"
            value={form.material}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Ouro">Ouro</option>
            <option value="Ouro Branco">Ouro Branco</option>
            <option value="Ouro Rosé">Ouro Rosé</option>
            <option value="Prata 950">Prata 950</option>
            <option value="Prata 925">Prata 925</option>
            <option value="Platina">Platina</option>
            <option value="Paládio">Paládio</option>
            <option value="Aço Inoxidável">Aço Inoxidável</option>
            <option value="Cobre">Cobre</option>
            <option value="Latão">Latão</option>
            <option value="Níquel">Níquel</option>
            <option value="Ródio">Ródio</option>
            <option value="Zircônia">Zircônia</option>
            <option value="Titânio">Titânio</option>
            <option value="Tungstênio">Tungstênio</option>
            <option value="Cerâmica">Cerâmica</option>
            <option value="Madeira">Madeira</option>
            <option value="Resina">Resina</option>
            <option value="Cristal">Cristal</option>
            <option value="Vidro">Vidro</option>
          </select>

          <label className="radio-label">
            <input
              type="radio"
              name="isStudded"
              checked={form.isStudded}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  isStudded: !prev.isStudded,
                }))
              }
            />
            Cravejada
          </label>

          {form.isStudded && (
            <>
              <label>Material Cravejado</label>
              <input
                type="text"
                name="materialCravejado"
                value={form.materialCravejado}
                onChange={handleChange}
                required
              />
            </>
          )}

          <SpecificInputs
            tipoPeca={form.tipoPeca}
            joiaData={form}
            handleChange={handleChange}
            handleBooleanChange={handleBooleanChange}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Cadastrar Joia"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateAnuncio();
          }}
        >
          <label>Título do Anúncio</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label>Imagens do Anúncio</label>
          <DragAndDropUploader onFilesUploaded={setSelectedImages} />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Publicando..." : "Cadastrar Anúncio"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CadastroAnuncio;
