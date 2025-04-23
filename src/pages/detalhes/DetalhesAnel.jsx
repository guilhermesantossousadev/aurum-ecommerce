import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/DetalhesAnuncio.css";
import "../../styles/detalhes/DetalhesAnel.css";

function DetalhesAnel() {
  const [anuncio, setAnuncio] = useState(null);
  const [joia, setJoia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const anuncioResponse = await fetch(
          `https://localhost:7081/api/Anuncio/GetByIdAnuncio?id=${id}`
        );

        if (!anuncioResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do anúncio");
        }

        const anuncioData = await anuncioResponse.json();

        if (!anuncioData) {
          throw new Error("Anúncio não encontrado");
        }

        setAnuncio(anuncioData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchJoia = async () => {
      try {
        const joiaResponse = await fetch(
          `https://localhost:7081/api/Joia/GetByIdJoia?id=${anuncio.joiaId}`
        );

        if (!joiaResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes da joia");
        }

        const joiaData = await joiaResponse.json();
        setJoia(joiaData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados da joia:", err);
      } finally {
        setLoading(false);
      }
    };

    if (anuncio && anuncio.joiaId) {
      fetchJoia();
    }
  }, [anuncio]);

  if (loading) {
    return (
      <div className="detalhes-container">
        <div className="loading-message">Carregando detalhes do anel...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalhes-container">
        <button className="voltar-button" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!anuncio) {
    return (
      <div className="detalhes-container">
        <button className="voltar-button" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <div className="error-message">Anel não encontrado</div>
      </div>
    );
  }

  const formatarPreco = (preco) => {
    try {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco);
    } catch (error) {
      return "Preço não disponível";
    }
  };

  return (
    <div className="Anel">
      <div className="detalhes-container">
        <button className="voltar-button" onClick={() => navigate(-1)}>
          Voltar
        </button>

        <div className="detalhes-content">
          <div className="detalhes-header">
            <h1>{anuncio.tipoPeca}</h1>
            <p className="categoria">Anel</p>
          </div>

          <div className="detalhes-info">
            {/* Detalhes do Anúncio */}
            <div className="detalhes-anuncio">
              <h2>Detalhes do Anúncio</h2>
              <p>
                <strong>Titulo:</strong> {anuncio.titulo}
              </p>
              <p>
                <strong>Descrição:</strong>{" "}
                {anuncio.tipoPeca || "tipo peça não disponível"}
              </p>
            </div>

            {/* Detalhes da Joia */}
            <div className="detalhes-joia">
              <h2>Detalhes do Anel</h2>
              <p>
                <strong>tamanho:</strong>{" "}
                {joia.tamanho || "tamanho não disponível"}
              </p>
              <p>
                <strong>formato:</strong>{" "}
                {joia.formato || "formato não disponível"}
              </p>
              <p>
                <strong>tipoPeca:</strong>{" "}
                {joia.tipoPeca || "tipoPeca não disponível"}
              </p>
              <p>
                <strong>valor:</strong>{" "}
                {formatarPreco(joia.valor) || "valor não disponível"}
              </p>
              <p>
                <strong>descricao:</strong> {joia.descricao}
              </p>
              {joia.isStudded && (
                <p>
                  <strong>Material Cravejado:</strong>{" "}
                  {joia.materialCravejado || "Não especificado"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesAnel;
