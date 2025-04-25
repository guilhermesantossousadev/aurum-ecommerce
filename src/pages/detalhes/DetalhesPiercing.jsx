import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/detalhes/DetalhesComum.css";
import ImageCarousel from "../../components/ImageCarousel";
import setaesquerdabranca from "../../images/seta-esquerda-branca.png";

function DetalhesPiercing() {
  const [anuncio, setAnuncio] = useState(null);
  const [piercing, setPiercing] = useState(null);
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
    const fetchPiercing = async () => {
      try {
        const piercingResponse = await fetch(
          `https://localhost:7081/api/Joia/GetByIdJoia?id=${anuncio.joiaId}`
        );

        if (!piercingResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do piercing");
        }

        const piercingData = await piercingResponse.json();
        setPiercing(piercingData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados do piercing:", err);
      } finally {
        setLoading(false);
      }
    };

    if (anuncio && anuncio.joiaId) {
      fetchPiercing();
    }
  }, [anuncio]);

  if (loading) {
    return (
      <div className="detalhes__container">
        <div className="loading__message">Carregando detalhes do piercing...</div>
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
          <img src={setaesquerdabranca} alt="Voltar" />
        </button>
        <div className="error__message">Piercing não encontrado</div>
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
    <div className="detalhes">
      <div className="detalhes__container">
        <button className="voltar__button" onClick={() => navigate(-1)}>
          <img src={setaesquerdabranca} alt="Voltar" />
        </button>

        <div className="detalhes__container__imagem">
          {anuncio.urLs && anuncio.urLs.length > 0 ? (
            <ImageCarousel images={anuncio.urLs} />
          ) : (
            <img src={anuncio.url} alt="Imagem do piercing" />
          )}
        </div>

        {/* Detalhes do Anúncio */}
        <p className="detalhes__info__titulo">{anuncio.titulo}</p>
        <div className="detalhes__info">
          <div className="detalhes__info__item">
            {/* Detalhes do Piercing */}
            <h2>Detalhes do Piercing</h2>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Região</strong>{" "}
              {piercing?.regiao || "Região não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Fechamento</strong>{" "}
              {piercing?.fechamento || "Fechamento não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Tamanho</strong>{" "}
              {piercing?.tamanho ? `${piercing.tamanho}mm` : "Tamanho não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Peso</strong>{" "}
              {piercing?.peso ? `${piercing.peso}g` : "Peso não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Material</strong>{" "}
              {piercing?.material || "Material não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Valor</strong>{" "}
              {formatarPreco(piercing?.valor) || "Valor não disponível"}
            </p>
            {piercing?.isStudded && (
              <p className="detalhes__info__item__p">
                <strong className="detalhes__info__item__p__strong">Material Cravejado</strong>{" "}
                {piercing?.materialCravejado || "Não especificado"}
              </p>
            )}
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Anti-alérgico</strong>{" "}
              {piercing?.isAntiallergic ? "Sim" : "Não"}
            </p>
          </div>
          <div className="detalhes__info__item descricao">
            <p className="detalhes__info__item__p">{piercing?.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesPiercing; 