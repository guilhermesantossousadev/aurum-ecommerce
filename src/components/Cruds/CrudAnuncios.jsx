import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import DragAndDropUploader from "../../components/DragAndDropUploader";
import SpecificInputs from "../../components/SpecificInputs";

function CrudAnuncios() {
  const user = useSelector((state) => state.user);
  const [step, setStep] = useState(1); // 1: Joia, 2: Anúncio

  const [joiaId, setJoiaId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [urLs, setUrLs] = useState([""]);
  const [usuarioId, setUsuarioId] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);

  const [anuncios, setAnuncios] = useState([]);

  const [editingAnuncio, setEditingAnuncio] = useState(null);

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

  // Função para buscar anúncios
  async function fetchAnuncios() {
    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetAnuncio"
      );
      if (!response.ok) {
        throw new Error(`Erro ao buscar anúncios: ${response.status}`);
      }
      const data = await response.json();
      setAnuncios(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAnuncios();
  }, []);

  // Upload imagens
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

  const handleChange = (field, value) => {
    setJoiaData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanChange = (field, value) => {
    setJoiaData((prev) => ({ ...prev, [field]: value }));
  };

  // Criar joia
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
      setStep(2); // Avança para criação do anúncio
    } catch (error) {
      toast.error(`Erro ao criar joia: ${error.message}`);
    }
  }

  // Criar anúncio
  async function handleCreateAnuncio() {
    handleUploadImages();
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
      fetchAnuncios();
    } catch (error) {
      toast.error(`Erro ao criar anúncio: ${error.message}`);
    }
  }

  // Editar anúncio (carregar no form)
  const handleEditClick = (anuncio) => {
    setStep(2);
    setEditingAnuncio(anuncio);
    setTitulo(anuncio.titulo);
    setJoiaId(anuncio.joiaId);
    setUrLs(anuncio.urLs || []);
  };

  // Atualizar anúncio
  async function handleUpdateAnuncio() {
    if (!editingAnuncio) return;

    const anuncioData = {
      id: editingAnuncio.id,
      joiaId,
      titulo,
      urLs,
      usuarioId,
    };

    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Anuncio/PutAnuncio",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(anuncioData),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao atualizar anúncio: ${response.status}`);
      }

      toast.success("Anúncio atualizado com sucesso!");
      setEditingAnuncio(null);
      setTitulo("");
      setJoiaId(null);
      setUrLs([""]);
      setSelectedImages([]);
      setStep(1);
      fetchAnuncios();
    } catch (error) {
      toast.error(`Erro ao atualizar anúncio: ${error.message}`);
    }
  }

  // Deletar anúncio
  async function handleDeleteAnuncio(id) {
    if (!window.confirm("Tem certeza que quer deletar este anúncio?")) return;

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/DeleteAnuncio?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao deletar anúncio: ${response.status}`);
      }

      toast.success("Anúncio deletado com sucesso!");
      fetchAnuncios();
    } catch (error) {
      toast.error(`Erro ao deletar anúncio: ${error.message}`);
    }
  }

  return (
    <>
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
            if (editingAnuncio) {
              handleUpdateAnuncio();
            } else {
              handleCreateAnuncio();
            }
          }}
        >
          <h2>{editingAnuncio ? "Editar Anúncio" : "Cadastro do Anúncio"}</h2>

          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <DragAndDropUploader onFilesUploaded={setSelectedImages} />

          <button type="submit">
            {editingAnuncio ? "Atualizar Anúncio" : "Cadastrar Anúncio"}
          </button>

          {editingAnuncio && (
            <button
              type="button"
              onClick={() => {
                setEditingAnuncio(null);
                setTitulo("");
                setJoiaId(null);
                setUrLs([""]);
                setSelectedImages([]);
                setStep(1);
              }}
              style={{ marginLeft: "1rem" }}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      )}

      {/* Lista de anúncios */}
      <section>
        <h2>Anúncios Cadastrados</h2>
        {anuncios.length === 0 && <p>Nenhum anúncio encontrado.</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {anuncios.map((anuncio) => (
            <div
              key={anuncio.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                width: "300px",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <h3>{anuncio.titulo}</h3>
              <p>ID Joia: {anuncio.joiaId}</p>
              <div style={{ marginTop: "0.5rem" }}>
                {user.isAdmin ? (
                  <button onClick={() => handleEditClick(anuncio)}>
                    Editar
                  </button>
                ) : (
                  <span></span>
                )}
                <button
                  onClick={() => handleDeleteAnuncio(anuncio.id)}
                  style={{ marginLeft: "0.5rem", color: "red" }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CrudAnuncios;
