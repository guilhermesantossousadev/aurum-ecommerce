import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

import formatCurrency from "../../components/utils/formatCurrency.jsx";
import Popup from "../../components/Popup"; // ajuste o caminho conforme sua estrutura

import "../../styles/Cruds/Cruds.css";
import PostAnuncios from "./Actions/PostAnuncios";

const apiBaseUrl =
  "https://marketplacejoias-api-latest.onrender.com/api/Anuncio";

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

  // State do popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAnuncio, setSelectedAnuncio] = useState(null);

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

  const confirmDelete = (id) => {
    toast.custom((t) => (
      <div
        style={{
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          maxWidth: "300px",
          textAlign: "center",
        }}
      >
        <p>Tem certeza que deseja deletar este Anuncio?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={async () => {
              await handleDelete(id);
              toast.dismiss(t.id);
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
            onClick={() => toast.dismiss(t.id)}
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
    ));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/DeleteAnuncio?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir Anuncio.");
      toast.success("Anuncio excluído com sucesso!");
      fetchAnuncios();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Funções do popup
  const handleOpenPopup = (anuncio) => {
    setSelectedAnuncio(anuncio);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnuncio(null);
  };

  function corrigirAcentoTipoPeca(tipoPeca) {
    if (!tipoPeca) return "";

    const tipo = tipoPeca.trim().toLowerCase();

    const correcoes = {
      anel: "Anel",
      colar: "Colar",
      pulseira: "Pulseira",
      brinco: "Brinco",
      joia: "Jóia",
      relogio: "Relógio",
    };

    return correcoes[tipo] || tipoPeca;
  }

  return (
    <div className="Separator">
      {isLoading ? (
        <div className="crud-spinner-wrapper">
          <div className="crud-spinner"></div>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div className="Principal">
              <div className="Principal__Create">
                <div className="Principal__Create__item left">
                  <h2>Anúncios</h2>
                </div>
                <div className="Principal__Create__item right">
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      background: "#3f4d67",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Criar Anúncio
                  </button>
                </div>
              </div>
              <section className="Principal__box">
                <div className="Principal__box__detalhes">
                  <div className="Principal__box__detalhes__item">Tipo</div>
                  <div className="Principal__box__detalhes__item">Título</div>
                  <div className="Principal__box__detalhes__item">Valor</div>
                  <div className="Principal__box__detalhes__item">Ações</div>
                </div>

                {anuncios.length === 0 ? (
                  <p className="Principal__box__item__inside">
                    Nenhum anúncio encontrado.
                  </p>
                ) : (
                  <ul>
                    {anuncios.map((anuncio) => (
                      <li key={anuncio.id} className="Principal__box__item">
                        <div className="Principal__box__item__inside">
                          {corrigirAcentoTipoPeca(anuncio.tipoPeca)}
                        </div>
                        <div className="Principal__box__item__inside">
                          {anuncio.titulo}
                        </div>
                        <div className="Principal__box__item__inside">
                          {formatCurrency(anuncio.valor)}
                        </div>
                        <div className="Principal__box__item__inside acoes">
                          <button
                            onClick={() => handleOpenPopup(anuncio)}
                            style={{
                              background: "#3f4d67",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              cursor: "pointer",
                              fontSize: "12px"
                            }}
                          >
                            Visualizar
                          </button>

                          <button
                            onClick={() => confirmDelete(anuncio.id)}
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
                <div className="Principal__Create__item left">
                  <h2>Anúncios</h2>
                </div>
                <div className="Principal__Create__item right">
                  <button
                    onClick={() => setStep(0)}
                    style={{
                      background: "#3f4d67",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Voltar
                  </button>
                </div>
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

          {isPopupOpen && selectedAnuncio && (
            <Popup anuncio={selectedAnuncio} onClose={handleClosePopup} />
          )}
        </>
      )}
    </div>
  );
}

export default CrudAnuncios;
