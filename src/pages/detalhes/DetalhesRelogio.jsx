import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/detalhes/DetalhesComum.css";
import ImageCarousel from "../../components/ImageCarousel";
import setaesquerdabranca from "../../images/seta-esquerda-branca.png";

function DetalhesRelogio() {
  const [anuncio, setAnuncio] = useState(null);
  const [relogio, setRelogio] = useState(null);
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
          throw new Error("Relógio não encontrado");
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
    const fetchRelogio = async () => {
      try {
        const relogioResponse = await fetch(
          `https://localhost:7081/api/Joia/GetByIdJoia?id=${anuncio.joiaId}`
        );

        if (!relogioResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do relógio");
        }

        const relogioData = await relogioResponse.json();
        setRelogio(relogioData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados do relógio:", err);
      } finally {
        setLoading(false);
      }
    };

    if (anuncio && anuncio.joiaId) {
      fetchRelogio();
    }
  }, [anuncio]);

  if (loading) {
    return (
      <div className="detalhes__container">
        <div className="loading__message">Carregando detalhes do relógio...</div>
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
        <div className="error__message">Relógio não encontrado</div>
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
            <img src={anuncio.url} alt="Imagem do relógio" />
          )}
        </div>

        {/* Detalhes do Anúncio */}
        <p className="detalhes__info__titulo">{anuncio.titulo}</p>
        <div className="detalhes__info">
          <div className="detalhes__info__item">
            {/* Detalhes do Relógio */}
            <h2>Detalhes do Relógio</h2>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Tipo de Movimento</strong>{" "}
              {relogio?.tipoMovimento || "Tipo de movimento não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Resistente à Água</strong>{" "}
              {relogio?.haveWaterResistance ? "Sim" : "Não"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Diâmetro da Caixa</strong>{" "}
              {relogio?.diametroCaixa ? `${relogio.diametroCaixa}mm` : "Diâmetro não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Material da Pulseira</strong>{" "}
              {relogio?.materialPulseira || "Material não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Fonte de Energia</strong>{" "}
              {relogio?.fonteEnergia || "Fonte de energia não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Peso</strong>{" "}
              {relogio?.peso ? `${relogio.peso}g` : "Peso não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Material</strong>{" "}
              {relogio?.material || "Material não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Valor</strong>{" "}
              {formatarPreco(relogio?.valor) || "Valor não disponível"}
            </p>
            {relogio?.isStudded && (
              <p className="detalhes__info__item__p">
                <strong className="detalhes__info__item__p__strong">Material Cravejado</strong>{" "}
                {relogio?.materialCravejado || "Não especificado"}
              </p>
            )}
          </div>
          <div className="detalhes__info__item descricao">
            <p className="detalhes__info__item__p">{relogio?.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesRelogio; 