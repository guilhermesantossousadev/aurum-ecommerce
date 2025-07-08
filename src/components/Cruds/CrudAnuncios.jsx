import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

import formatCurrency from "../../components/utils/formatCurrency.jsx"; // ajuste o caminho

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
    const toastId = toast.custom((t) => (
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
              toast.dismiss(t.id); // Fecha o toast após deletar
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
              <div className="Principal__box__detalhes__item">Tipo</div>
              <div className="Principal__box__detalhes__item">Título</div>
              <div className="Principal__box__detalhes__item">Valor</div>
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
                      {anuncio.tipoPeca}
                    </div>
                    <div className="Principal__box__item__inside">
                      {anuncio.titulo}
                    </div>
                    <div className="Principal__box__item__inside">
                      Valor: {formatCurrency(anuncio.valor)}
                    </div>
                    <div className="Principal__box__item__inside acoes">
                      <button onClick={() => console.log(anuncio.id)}>
                        Visualizar Joia
                      </button>
                      <button onClick={() => confirmDelete(anuncio.id)}>
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
