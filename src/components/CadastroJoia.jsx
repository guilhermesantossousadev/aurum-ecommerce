import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import DragAndDropUploader from "../components/DragAndDropUploader";
import "../styles/components/cadastroJoia.css";

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

  const [valor, setValor] = useState("");

  const handleChangeNumeros = (e) => {
    const { name, value } = e.target;
    // Permite números e apenas um ponto
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
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
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

  const renderSpecificInputs = () => {
    switch (form.tipoPeca) {
      case "Anel":
        return (
          <>
            <label>Tamanho</label>
            <input
              name="tamanho"
              type="number"
              value={form.tamanho}
              onChange={handleChange}
            />
            <label>Formato</label>
            <input
              name="formato"
              type="text"
              value={form.formato}
              onChange={handleChange}
            />
          </>
        );
      case "Brinco":
        return (
          <>
            <label>Tipo Fecho</label>
            <input
              name="tipoFecho"
              type="text"
              value={form.tipoFecho}
              onChange={handleChange}
            />
            <label>Modelo</label>
            <input
              name="modelo"
              type="text"
              value={form.modelo}
              onChange={handleChange}
            />
          </>
        );
      case "Colar":
        return (
          <>
            <label>Comprimento</label>
            <input
              name="comprimento"
              type="number"
              value={form.comprimento}
              onChange={handleChange}
            />
            <label>Possui Pingente</label>
            <input
              name="havePendant"
              type="checkbox"
              checked={form.havePendant}
              onChange={handleChange}
            />
            <label>Tipo Corrente</label>
            <input
              name="tipoCorrente"
              type="text"
              value={form.tipoCorrente}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="CadastroJoia">
      <div className="CadastroJoia__container">
        <h2>{step === 1 ? "Cadastrar Joia" : "Cadastrar Anúncio"}</h2>

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
              <option value="">-- Selecione --</option>
              {[
                "Anel",
                "Brinco",
                "Colar",
                "Piercing",
                "Pingente",
                "Pulseira",
                "Relogio",
              ].map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <label>Valor</label>
            <input
              name="valor"
              type="text"
              step="0.01"
              value={form.valor}
              onChange={handleChangeNumeros}
            />

            <label>Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />

            <label>Peso</label>
            <input
              name="peso"
              type="number"
              step="0.01"
              value={form.peso}
              onChange={handleChange}
            />

            <label>Material</label>
            <input
              name="material"
              type="text"
              value={form.material}
              onChange={handleChange}
            />

            {renderSpecificInputs()}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Avançar para Anúncio"}
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
    </div>
  );
};

export default CadastroAnuncio;
