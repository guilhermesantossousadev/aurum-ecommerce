import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

import DragAndDropUploader from "../../../components/DragAndDropUploader";
import SpecificInputs from "../../../components/SpecificInputs";

import "../../../styles/Cruds/Actions/PostAnuncios.css";

const PostAnuncios = () => {
  const user = useSelector((state) => state.user);

  const [step, setStep] = useState(1); // 1: Joia, 2: Anúncio

  const [joiaId, setJoiaId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [urls, setUrls] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);

  const [usuarioId, setUsuarioId] = useState("");

  // Agora valor numérico (number), não string formatada
  const [joiaData, setJoiaData] = useState({
    tipoPeca: "",
    valor: 0, // número
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
    materialPulseira: "",
    tipoMovimento: "",
    haveWaterResistance: false,
    diametroCaixa: 0,
    fonteEnergia: "",
  });

  useEffect(() => {
    if (user && user.id) {
      setUsuarioId(user.id);
    }
  }, [user]);

  // Atualiza valor numérico com validação simples
  const handleCurrencyChange = (inputValue) => {
    // Remove tudo que não for dígito
    const onlyDigits = inputValue.replace(/\D/g, "");
    const numberValue = Number(onlyDigits) / 100;

    setJoiaData((prev) => ({ ...prev, valor: numberValue }));
  };

  // Formata o valor para exibir no input como moeda BRL
  const formattedValor = joiaData.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const handleChange = (field, value) => {
    setJoiaData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (field, value) => {
    setJoiaData((prev) => ({ ...prev, [field]: value }));
  };

  // Envio das imagens: retorna as URLs enviadas ou [] em erro
  const handleUploadImages = async () => {
    if (!selectedImages || selectedImages.length === 0) {
      toast.error("Nenhuma imagem selecionada.");
      return [];
    }

    const formData = new FormData();
    selectedImages.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Anuncio/UploadImagesAnuncio",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao enviar imagens: ${response.status}`);
      }

      toast.success("Imagens enviadas com sucesso!");
      const urlsResponse = await response.json();
      setUrls(urlsResponse);
      return urlsResponse;
    } catch (error) {
      toast.error(`Erro ao enviar imagens: ${error.message}`);
      return [];
    }
  };

  // Criação da joia, agora valor numérico direto
  async function handleCreateJoia() {
    try {
      const joiaDataClean = {
        ...joiaData,
        // valor já é número, só garantir
        valor: Number(joiaData.valor),
      };


      console.log("Enviando joia:", JSON.stringify(joiaDataClean));

      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Joia/PostJoia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(joiaDataClean),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao criar joia: ${response.status}`);
      }

      const data = await response.text();
      setJoiaId(data);
      toast.success("Joia criada com sucesso!");
      setStep(2);
    } catch (error) {
      toast.error(`Erro ao criar joia: ${error.message}`);
    }
  }

  // Criação do anúncio usando URLs retornadas do upload
  async function handleCreateAnuncio() {
    const uploadedUrls = await handleUploadImages();

    if (uploadedUrls.length === 0) {
      // Se não teve imagens válidas, aborta criação
      return;
    }

    const anuncioData = {
      joiaId,
      titulo,
      urLs: uploadedUrls,
      usuarioId,
    };

    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Anuncio/PostAnuncio",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(anuncioData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao criar anúncio: ${response.status}`);
      }

      toast.success("Anúncio criado com sucesso!");
      // Limpa estados para novo cadastro
      setTitulo("");
      setJoiaId(null);
      setUrls([]);
      setSelectedImages([]);
      setStep(1);
    } catch (error) {
      toast.error(`Erro ao criar anúncio: ${error.message}`);
    }
  }

  return (
    <div className="PostAnuncios">
      <Toaster position="top-right" />

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
            value={joiaData.tipoPeca}
            onChange={(e) => handleChange("tipoPeca", e.target.value)}
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
            value={formattedValor}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            required
            placeholder="R$ 0,00"
          />

          <label>Descrição</label>
          <textarea
            value={joiaData.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            required
          />

          <label>Peso</label>
          <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.,]?[0-9]*"
            value={joiaData.peso}
            onChange={(e) => {
              const value = e.target.value.replace(",", ".");
              if (/^\d*\.?\d*$/.test(value)) {
                handleChange("peso", value);
              }
            }}
            required
          />

          <label>Material</label>
          <select
            value={joiaData.material}
            onChange={(e) => handleChange("material", e.target.value)}
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

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={joiaData.isStudded}
              onChange={(e) => handleBooleanChange("isStudded", e.target.checked)}
            />
            Cravejada
          </label>

          {joiaData.isStudded && (
            <div>
              <label>Material Cravejado</label>
              <input
                type="text"
                value={joiaData.materialCravejado}
                onChange={(e) => handleChange("materialCravejado", e.target.value)}
                required
              />
            </div>
          )}

          <SpecificInputs
            tipoPeca={joiaData.tipoPeca}
            joiaData={joiaData}
            handleChange={handleChange}
            handleBooleanChange={handleBooleanChange}
          />

          <button type="submit">Cadastrar Joia</button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateAnuncio();
          }}
          className="form-etapa2"
        >
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <DragAndDropUploader onFilesUploaded={setSelectedImages} />

          <button type="submit">Cadastrar Anúncio</button>
        </form>
      )}
    </div>
  );
};

export default PostAnuncios;
