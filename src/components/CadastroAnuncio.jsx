import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import DragAndDropUploader from "./DragAndDropUploader";
import SpecificInputs, { validateSpecificInputs } from "./SpecificInputs";


import "../styles/components/CadastroAnuncio.css";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "https://marketplacejoias-api-latest.onrender.com/api";

const initialFormState = {
  tipoPeca: "",
  valor: "",
  descricao: "",
  peso: "",
  material: "",
  isStudded: false,
  materialCravejado: "",
  tamanho: "",
  formato: "",
  tipoFecho: "",
  modelo: "",
  altura: "",
  pesoIndividual: "",
  comprimento: "",
  espessura: "",
  havePendant: false,
  tipoCorrente: "",
  regiao: "",
  fechamento: "",
  isAntiallergic: false,
  haveCharms: false,
  flexibilidade: "",
  tipoMovimento: "",
  haveWaterResistance: false,
  diametroCaixa: "",
  materialPulseira: "",
  fonteEnergia: "",
};


const CadastroAnuncio = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [joiaId, setJoiaId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");

  const [joiaData, setJoiaData] = useState(initialFormState);

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

  const handleFilesUploaded = (files) => {
    setSelectedImages(files);
  };

  const handleUploadImages = async () => {
    if (!selectedImages || selectedImages.length === 0) {
      toast.error("Nenhuma imagem selecionada.");
      return [];
    }

    const formData = new FormData();
    selectedImages.forEach((file) => {
      console.log("Appending file:", file.name, file.size);
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${apiBaseUrl}/Anuncio/UploadImagesAnuncio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao enviar imagens: ${response.status} - ${errorText}`);
      }

      const urlsResponse = await response.json();
      console.log("Upload response URLs:", urlsResponse);
      toast.success("Imagens enviadas com sucesso!");
      return urlsResponse;
    } catch (error) {
      toast.error(`Erro ao enviar imagens: ${error.message}`);
      console.error("Upload images error:", error);
      return [];
    }
  };


  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  async function handleCreateAnuncio(e) {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoadingAnuncio(true);

    try {
      setLoadingJoia(true);

      // Remove campos vazios e converte para número quando aplicável
      const joiaDataClean = Object.fromEntries(
        Object.entries(joiaData)
          .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
          .map(([k, v]) => {
            if (["valor", "peso", "tamanho"].includes(k)) {
              return [k, v !== "" && v !== null ? Number(v) : null];
            }
            return [k, v];
          })
      );

      // Se o backend espera valor em centavos, converte aqui
      if (typeof joiaDataClean.valor === "number" && joiaDataClean.valor < 10) {
        joiaDataClean.valor = Math.round(joiaDataClean.valor * 100);
      }

      console.log("Enviando para /Joia/PostJoia:", joiaDataClean);

      const responseJoia = await fetch(`${apiBaseUrl}/Joia/PostJoia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joiaDataClean),
      });

      setLoadingJoia(false);

      if (!responseJoia.ok) {
        const errorText = await responseJoia.text();
        throw new Error(`Erro ao criar joia: ${responseJoia.status} - ${errorText}`);
      }

      const { id: joiaIdCreated } = await responseJoia.json();

      toast.success("Joia criada com sucesso!");

      const uploadedUrls = await handleUploadImages();
      if (!uploadedUrls.length) {
        throw new Error("Nenhuma imagem foi enviada.");
      }

      const anuncioData = {
        joiaId: joiaIdCreated,
        titulo,
        urLs: uploadedUrls, // cuidado com a chave, deve ser igual ao backend
        usuarioId: user?.id,
      };

      const responseAnuncio = await fetch(`${apiBaseUrl}/Anuncio/PostAnuncio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anuncioData),
      });

      if (!responseAnuncio.ok) {
        throw new Error(`Erro ao criar anúncio: ${responseAnuncio.status}`);
      }

      toast.success("Anúncio criado com sucesso!");
      navigate(`/catalogo/todos`);

      setTitulo("");
      setJoiaId(null);
      setSelectedImages([]);
      setJoiaData(initialFormState);
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

  const handleNumberChange = (field, value) => {
    // Permite campo vazio
    if (value === "") {
      setJoiaData((prev) => ({ ...prev, [field]: "" }));
      return;
    }

    let v = value.replace(/[^0-9.]/g, "");

    // Garante que só tenha um ponto
    if ((v.match(/\./g) || []).length > 1) {
      v = v.substring(0, v.lastIndexOf("."));
    }

    setJoiaData((prev) => ({ ...prev, [field]: v }));
  };




  return (
    <div className="PostAnuncios">
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

          <label>Peso (G)</label>
          <input
            type="text"
            placeholder="Peso"
            value={joiaData.peso}
            onChange={(e) => handleNumberChange("peso", e.target.value)}
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

export default CadastroAnuncio;
