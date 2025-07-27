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
  const [urLs, setUrLs] = useState([""]);

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

  useEffect(() => {
    if (user && user.id) {
      setUsuarioId(user.id);
    }
  }, [user]);

  const handleCurrencyChange = (inputValue) => {
    // Remove tudo que não for dígito
    const onlyDigits = inputValue.replace(/\D/g, "");
    const numberValue = Number(onlyDigits) / 100;

    // Atualiza o estado formatado como string
    const formattedValue = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    handleChange("valor", formattedValue);
  };

  const handleChange = (field, value) => {
    setJoiaData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (field, value) => {
    setJoiaData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadImages = async () => {
    if (!selectedImages || selectedImages.length === 0) {
      toast.error("Nenhuma imagem selecionada.");
      return;
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
      const urls = await response.json();
      setUrLs(urls);
    } catch (error) {
      toast.error(`Erro ao enviar imagens: ${error.message}`);
    }
  };

  async function handleCreateJoia() {
    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Joia/PostJoia",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(joiaData),
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

  async function handleCreateAnuncio() {
    await handleUploadImages();

    const anuncioData = {
      joiaId,
      titulo,
      urLs,
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
      setTitulo("");
      setJoiaId(null);
      setUrLs([""]);
      setSelectedImages([]);
      setStep(1);
    } catch (error) {
      toast.error(`Erro ao criar anúncio: ${error.message}`);
    }
  }

  return (
    <div className="PostAnuncios">
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateJoia();
          }}
        >
          <h2>Cadastro da Joia</h2>

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
            value={joiaData.valor}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            required
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
              const value = e.target.value.replace(",", "."); // aceita vírgula ou ponto
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
            <option value="Prata">Prata</option>
            <option value="Prata de Lei">Prata de Lei</option>
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
              onChange={(e) =>
                handleBooleanChange("isStudded", e.target.checked)
              }
            />
            Cravejada
          </label>


          {joiaData.isStudded && (
            <div>
              <label>Material Cravejado</label>
              <input
                type="text"
                value={joiaData.materialCravejado}
                onChange={(e) =>
                  handleChange("materialCravejado", e.target.value)
                }
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
        >
          <h2>Cadastro do Anúncio</h2>

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
