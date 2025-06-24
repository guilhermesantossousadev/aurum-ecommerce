import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "../../styles/Cruds/Cruds.css";
import PostAnuncios from "./Actions/PostAnuncios";

function CrudAnuncios() {
  const user = useSelector((state) => state.user);

  const [anuncios, setAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingAnuncio, setEditingAnuncio] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [joiaId, setJoiaId] = useState(null);
  const [urLs, setUrLs] = useState([""]);
  const [usuarioId, setUsuarioId] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (user && user.id) {
      setUsuarioId(user.id);
    }
  }, [user]);

  useEffect(() => {
    fetchAnuncios();
  }, []);

  async function fetchAnuncios() {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditClick = (anuncio) => {
    setEditingAnuncio(anuncio);
    setTitulo(anuncio.titulo);
    setJoiaId(anuncio.joiaId);
    setUrLs(anuncio.urLs || []);
    setStep(1);
  };

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
      setStep(0);
      fetchAnuncios();
    } catch (error) {
      toast.error(`Erro ao atualizar anúncio: ${error.message}`);
    }
  }

  async function confirmDelete(id) {
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

  function handleDeleteAnuncio(id) {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja deletar este anúncio?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={async () => {
                await confirmDelete(id);
                closeToast();
              }}
              style={{
                background: "#d9534f",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Deletar
            </button>
            <button
              onClick={closeToast}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  }

  return (
    <div className="Separator">
      {step === 0 && (
        <div className="Principal">
          <div className="Principal__Create">
            <button
              className="Principal__Create__button"
              onClick={() => setStep(1)}
            >
              Criar Anúncio
            </button>
          </div>
          <section className="Principal__box">
            <div className="Principal__box__detalhes">
              <div className="Principal__box__detalhes__item">Título</div>
              <div className="Principal__box__detalhes__item">JoiaId</div>
              <div className="Principal__box__detalhes__item">Ações</div>
            </div>

            {isLoading ? (
              <p className="Principal__box__item__inside">Carregando...</p>
            ) : anuncios.length === 0 ? (
              <p className="Principal__box__item__inside">
                Nenhum anúncio encontrado.
              </p>
            ) : (
              <ul>
                {anuncios.map((anuncio) => (
                  <li key={anuncio.id} className="Principal__box__item">
                    <div className="Principal__box__item__inside">
                      {anuncio.titulo}
                    </div>
                    <div className="Principal__box__item__inside">
                      ID Joia: {anuncio.joiaId}
                    </div>
                    <div className="Principal__box__item__inside acoes">
                      {user.isAdmin && (
                        <button onClick={() => handleEditClick(anuncio)}>
                          Editar
                        </button>
                      )}
                      <button onClick={() => handleDeleteAnuncio(anuncio.id)}>
                        Deletar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
      {step === 1 && (
        <div className="Separator">
          <div className="Principal__Create">
            <button
              className="Principal__Create__button"
              onClick={() => setStep(0)}
            >
              Voltar
            </button>
          </div>
          <div className="Principal">
            <PostAnuncios
              titulo={titulo}
              setTitulo={setTitulo}
              joiaId={joiaId}
              setJoiaId={setJoiaId}
              urLs={urLs}
              setUrLs={setUrLs}
              handleUpdateAnuncio={handleUpdateAnuncio}
              setStep={setStep}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CrudAnuncios;
