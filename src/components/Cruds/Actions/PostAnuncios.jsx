import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

import DragAndDropUploader from "../../../components/DragAndDropUploader";
import SpecificInputs from "../../../components/SpecificInputs";
import { validateSpecificInputs } from "../../../components/SpecificInputs";

import "../../../styles/Cruds/Actions/PostAnuncios.css";

const PostAnuncios = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Joia, 2: Anúncio

  const [joiaId, setJoiaId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");

  const [joiaData, setJoiaData] = useState({
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
    materialPulseira: "",
    tipoMovimento: "",
    haveWaterResistance: false,
    diametroCaixa: 0,
    fonteEnergia: "",
  });

  const [loadingJoia, setLoadingJoia] = useState(false);
  const [loadingAnuncio, setLoadingAnuncio] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      setUsuarioId(user.id);
    }
  }, [user]);

  // Atualiza valor numérico com validação simples
  const handleCurrencyChange = (inputValue) => {
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

  // Atualiza as imagens selecionadas vindas do DragAndDropUploader
  const handleFilesUploaded = (files) => {
    setSelectedImages(files);
  };

  // Upload das imagens para o backend, retorna array de URLs
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
      return urlsResponse;
    } catch (error) {
      toast.error(`Erro ao enviar imagens: ${error.message}`);
      return [];
    }
  };

  // Avança para o step 2 (formulário do anúncio)
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Cria joia + upload + cria anúncio no step 2
  async function handleCreateAnuncio(e) {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoadingAnuncio(true);
    try {
      // Cria a joia primeiro
      setLoadingJoia(true);
      const joiaDataClean = {
        ...joiaData,
        valor: Number(joiaData.valor),
      };

      const responseJoia = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Joia/PostJoia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(joiaDataClean),
        }
      );

      setLoadingJoia(false);

      if (!responseJoia.ok) {
        throw new Error(`Erro ao criar joia: ${responseJoia.status}`);
      }

      const joiaIdCreated = await responseJoia.text();
      setJoiaId(joiaIdCreated);
      toast.success("Joia criada com sucesso!");

      // Upload das imagens
      const uploadedUrls = await handleUploadImages();

      if (uploadedUrls.length === 0) {
        throw new Error("Nenhuma imagem foi enviada.");
      }

      // Cria o anúncio com o joiaId retornado
      const anuncioData = {
        joiaId: joiaIdCreated,
        titulo,
        urls: uploadedUrls, // corrigi "urLs" para "urls"
        usuarioId,
      };

      const responseAnuncio = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Anuncio/PostAnuncio",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(anuncioData),
        }
      );

      if (!responseAnuncio.ok) {
        throw new Error(`Erro ao criar anúncio: ${responseAnuncio.status}`);
      }

      toast.success("Anúncio criado com sucesso!");

      navigate(`/catalogo/todos`)

      // Limpa estados e volta para step 1
      setTitulo("");
      setJoiaId(null); s
      setSelectedImages([]);
      setJoiaData({
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
        materialPulseira: "",
        tipoMovimento: "",
        haveWaterResistance: false,
        diametroCaixa: 0,
        fonteEnergia: "",
      });
      setStep(1);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAnuncio(false);
      setLoadingJoia(false);
    }
  }


  const validateStep1 = () => {
    const errors = [];

    // Validações gerais
    if (!joiaData.tipoPeca) errors.push("Tipo de joia é obrigatório.");
    if (joiaData.valor <= 0) errors.push("Valor deve ser maior que zero.");
    if (!joiaData.descricao.trim()) errors.push("Descrição é obrigatória.");
    if (joiaData.peso <= 0) errors.push("Peso deve ser maior que zero.");
    if (!joiaData.material) errors.push("Material da joia é obrigatório.");
    if (joiaData.isStudded && !joiaData.materialCravejado.trim()) {
      errors.push("Material cravejado é obrigatório para joias cravejadas.");
    }
    if (joiaData.tamanho && joiaData.tamanho <= 0) {
      errors.push("Tamanho deve ser maior que zero.");
    }

    // Validação específica
    const specificErrors = validateSpecificInputs(joiaData.tipoPeca, joiaData);
    errors.push(...specificErrors);

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const errors = [];

    if (!titulo.trim()) errors.push("Título do anúncio é obrigatório.");
    if (!selectedImages || selectedImages.length === 0) {
      errors.push("É necessário selecionar pelo menos uma imagem.");
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return false;
    }

    return true;
  };


  return (
    <div className="PostAnuncios">
      <Toaster position="top-right" />

      <div className="step-counter-anuncios">
        <p>{step === 1 ? "Cadastro da Joia" : "Cadastro do Anúncio"}</p>
        <div className="step-bar-anuncios">
          <div className={`step-progress-anuncios ${step === 2 ? "complete" : ""}`} />
        </div>
      </div>

      {step === 1 && (
        <form onSubmit={handleNextStep}>
          <select
            value={joiaData.tipoPeca}
            onChange={(e) => handleChange("tipoPeca", e.target.value)}
            required
          >
            <option value="">Selecione o tipo de joia</option>
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
            placeholder="Valor"
          />

          <textarea
            placeholder="Descrição"
            value={joiaData.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            required
          />

          <label>Peso(mm)</label>
          <input
            type="text"
            placeholder="Peso"
            inputMode="decimal"
            value={joiaData.peso}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(",", ".");
              if (/^\d*\.?\d*$/.test(value)) {
                handleChange("peso", value);
              }
            }}
            required
          />

          <select
            value={joiaData.material}
            onChange={(e) => handleChange("material", e.target.value)}
            required
          >
            <option value="">Selecione o material da joia</option>
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
            <div className="material-cravejado-wrapper" style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Material Cravejado"
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

          <button type="submit" disabled={loadingJoia}>
            {loadingJoia ? "Carregando..." : "Avançar para Anúncio"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCreateAnuncio} className="form-etapa2">
          <label>Título do Anúncio</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label>Imagens do Anúncio</label>
          <DragAndDropUploader onFilesUploaded={handleFilesUploaded} />

          {selectedImages.length > 0 && (
            <div className="preview-images" style={{ marginTop: 10 }}>
              {selectedImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  style={{ width: 100, height: 100, objectFit: "cover", marginRight: 10 }}
                />
              ))}
            </div>
          )}

          <button type="submit" disabled={loadingAnuncio || loadingJoia}>
            {loadingAnuncio || loadingJoia ? "Carregando..." : "Cadastrar Anúncio"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PostAnuncios;
