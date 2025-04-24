import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/detalhes/DetalhesAnel.css";

import setaEsquerda from "../../images/seta-esquerda.png";

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
      <div className="detalhes__container">
        <div className="loading__message">Carregando detalhes do anel...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalhes__container">
        <button className="voltar__button" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <div className="error__message">{error}</div>
      </div>
    );
  }

  if (!anuncio) {
    return (
      <div className="detalhes__container">
        <button className="voltar__button" onClick={() => navigate(-1)}>
          <img src={setaEsquerda} alt="Voltar" />
        </button>
        <div className="error__message">Anel não encontrado</div>
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
      <div className="detalhes__container">
        <button className="voltar__button" onClick={() => navigate(-1)}>
          <img src={setaEsquerda} alt="Voltar" />
        </button>

        {/* Detalhes do Anúncio */}
        <p className="detalhes__info__titulo">{anuncio.titulo}</p>
        <p>{anuncio.tipoPeca || "tipo peça não disponível"}</p>
        <div className="detalhes__info">
          <div className="detalhes__info__item">
            {/* Detalhes da Joia */}
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
              <strong>peso:</strong> {joia.peso || "peso não disponível"}
            </p>
            <p>
              <strong>material:</strong>{" "}
              {joia.material || "material não disponível"}
            </p>
            <p>
              <strong>valor:</strong>{" "}
              {formatarPreco(joia.valor) || "valor não disponível"}
            </p>
            {joia.isStudded && (
              <p>
                <strong>Material Cravejado:</strong>{" "}
                {joia.materialCravejado || "Não especificado"}
              </p>
            )}
          </div>
          <div className="detalhes__info__item descricao">
            <p>{joia.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesAnel;
