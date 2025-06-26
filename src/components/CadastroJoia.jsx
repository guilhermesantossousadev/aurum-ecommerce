import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { Toaster, toast } from 'sonner';

import DragAndDropUploader from "../components/DragAndDropUploader";

import "../styles/components/cadastroJoia.css"

const apiBaseUrl = "https://marketplacejoias-api-latest.onrender.com/api";

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
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadImages = async () => {
    if (!selectedImages.length) {
      toast.error("Nenhuma imagem selecionada.");
      return [];
    }

    const formData = new FormData();
    selectedImages.forEach((file) => {
      formData.append("files", file);
    });

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
      setUploadedUrls(urls);
      toast.success("Imagens enviadas com sucesso!");
      return urls;  // ✅ Adicione esta linha para devolver as URLs!
    } catch (error) {
      toast.error(error.message);
      return []; // também devolve um array vazio em caso de erro
    }
  };


  const handleCreateJoia = async () => {
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
    }
  };

  const handleCreateAnuncio = async () => {
    const urls = await handleUploadImages();
    const anuncioData = {
      joiaId,
      titulo,
      urLs: urls, // ✅ Usar as URLs retornadas
      usuarioId: user.id,
    };


    try {
      const response = await fetch(`${apiBaseUrl}/Anuncio/PostAnuncio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anuncioData),
      });
      if (!response.ok) throw new Error("Erro ao criar anúncio.");
      toast.success("Anúncio criado com sucesso!");
      // Resetar tudo
      setStep(1);
      setForm(initialFormState);
      setJoiaId(null);
      setTitulo("");
      setSelectedImages([]);
      setUploadedUrls([]);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const renderSpecificInputs = () => {
    switch (form.tipoPeca) {
      case "Anel":
        return (
          <>
            <label>Tamanho</label>
            <input
              type="number"
              value={form.tamanho}
              onChange={(e) => handleChange("tamanho", Number(e.target.value))}
            />
            <label>Formato</label>
            <input
              type="text"
              value={form.formato}
              onChange={(e) => handleChange("formato", e.target.value)}
            />
          </>
        );
      case "Brinco":
        return (
          <>
            <label>Tipo Fecho</label>
            <input
              type="text"
              value={form.tipoFecho}
              onChange={(e) => handleChange("tipoFecho", e.target.value)}
            />
            <label>Modelo</label>
            <input
              type="text"
              value={form.modelo}
              onChange={(e) => handleChange("modelo", e.target.value)}
            />
          </>
        );
      case "Colar":
        return (
          <>
            <label>Comprimento</label>
            <input
              type="number"
              value={form.comprimento}
              onChange={(e) =>
                handleChange("comprimento", Number(e.target.value))
              }
            />
            <label>Possui Pingente</label>
            <input
              type="checkbox"
              checked={form.havePendant}
              onChange={(e) => handleChange("havePendant", e.target.checked)}
            />
            <label>Tipo Corrente</label>
            <input
              type="text"
              value={form.tipoCorrente}
              onChange={(e) => handleChange("tipoCorrente", e.target.value)}
            />
          </>
        );
      // ... (outros cases iguais ao seu CadastroJoia)
      default:
        return null;
    }
  };

  return (
    <div className="CadastroJoia">
      <div className="CadastroJoia__container">
        <h2>
          {step === 1 ? "Cadastrar Joia" : "Cadastrar Anúncio"}
        </h2>
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateJoia();
            }}
          >
            <label>Tipo da Peça</label>
            <select
              value={form.tipoPeca}
              onChange={(e) => handleChange("tipoPeca", e.target.value)}
              required
            >
              <option value="">-- Selecione --</option>
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
              type="number"
              step="0.01"
              value={form.valor}
              onChange={(e) => handleChange("valor", Number(e.target.value))}
            />

            <label>Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
            />

            <label>Peso</label>
            <input
              type="number"
              step="0.01"
              value={form.peso}
              onChange={(e) => handleChange("peso", Number(e.target.value))}
            />

            <label>Material</label>
            <input
              type="text"
              value={form.material}
              onChange={(e) => handleChange("material", e.target.value)}
            />

            {renderSpecificInputs()}

            <button type="submit">Avançar para Anúncio</button>
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

            <button type="submit">Cadastrar Anúncio</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CadastroAnuncio;
