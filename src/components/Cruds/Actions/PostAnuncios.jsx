import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from 'sonner';

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
            type="number"
            min={0}
            value={joiaData.valor}
            onChange={(e) => handleChange("valor", Number(e.target.value) || 0)}
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
            type="number"
            min={0}
            value={joiaData.peso}
            onChange={(e) => handleChange("peso", Number(e.target.value) || 0)}
            required
          />

          <label>Material</label>
          <input
            type="text"
            value={joiaData.material}
            onChange={(e) => handleChange("material", e.target.value)}
            required
          />

          <label>
            Cravejada
            <input
              type="checkbox"
              checked={joiaData.isStudded}
              onChange={(e) =>
                handleBooleanChange("isStudded", e.target.checked)
              }
            />
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
