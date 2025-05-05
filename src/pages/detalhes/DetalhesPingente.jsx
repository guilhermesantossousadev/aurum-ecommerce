import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/detalhes/DetalhesComum.css";
import ImageCarousel from "../../components/ImageCarousel";
import setaesquerdabranca from "../../images/seta-esquerda-branca.png";

function DetalhesPingente() {
  const user = useSelector((state) => state.user);

  const [anuncio, setAnuncio] = useState(null);
  const [pingente, setPingente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const adicionarAoCarrinho = async () => {
    try {
      const usuarioId = user?.id;
      if (!usuarioId) {
        alert("Usuário não está logado.");
        return;
      }

      // 1. Buscar carrinho atual do usuário
      const carrinhoResponse = await fetch(
        `https://localhost:7081/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${usuarioId}`
      );

      if (!carrinhoResponse.ok) {
        throw new Error("Erro ao buscar carrinho");
      }

      const carrinhoData = await carrinhoResponse.json();

      // 2. Atualizar lista de anúncios
      const anunciosAtuais = carrinhoData.anunciosId?.anunciosId || [];
      const anuncioIdString = anuncio.id.toString();

      // Adiciona o novo ID SEM checar duplicação
      anunciosAtuais.push(anuncioIdString);

      // 3. Criar objeto PUT conforme especificado
      const carrinhoAtualizado = {
        baseUrl: "string", // fixo
        requestClientOptions: {
          schema: "string",
          headers: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
          queryParams: {
            additionalProp1: "string",
            additionalProp2: "string",
            additionalProp3: "string",
          },
        },
        id: carrinhoData.id,
        usuarioId: usuarioId,
        anunciosId: {
          anunciosId: anunciosAtuais,
        },
        valorTotal: ""
      };

      console.log(JSON.stringify(carrinhoAtualizado));

      // 4. Requisição PUT
      const updateResponse = await fetch(
        `https://localhost:7081/api/Carrinho/PutCarrinho`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carrinhoAtualizado),
        }
      );

      const valorValue = await fetch(
        `https://localhost:7081/api/Carrinho/CompileValue?usuarioId=${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Erro ao atualizar carrinho");
      }
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      alert("Erro ao adicionar ao carrinho");
    }
  };

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
          throw new Error("Pingente não encontrado");
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
    const fetchPingente = async () => {
      try {
        const pingenteResponse = await fetch(
          `https://localhost:7081/api/Joia/GetByIdJoia?id=${anuncio.joiaId}`
        );

        if (!pingenteResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do pingente");
        }

        const pingenteData = await pingenteResponse.json();
        setPingente(pingenteData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados do pingente:", err);
      } finally {
        setLoading(false);
      }
    };

    if (anuncio && anuncio.joiaId) {
      fetchPingente();
    }
  }, [anuncio]);

  if (loading) {
    return (
      <div className="detalhes__container">
        <div className="loading__message">
          Carregando detalhes do pingente...
        </div>
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
        <div className="error__message">Pingente não encontrado</div>
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
            <img src={anuncio.url} alt="Imagem do pingente" />
          )}
        </div>

        {/* Detalhes do Anúncio */}
        <p className="detalhes__info__titulo">{anuncio.titulo}</p>
        <div className="detalhes__info">
          <div className="detalhes__info__item">
            {/* Detalhes do Pingente */}
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Tipo de Pingente
              </strong>{" "}
              {pingente?.tipoPingente || "Tipo de pingente não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Tamanho
              </strong>{" "}
              {pingente?.tamanho
                ? `${pingente.tamanho} cm`
                : "Tamanho não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Espessura
              </strong>{" "}
              {pingente?.espessura
                ? `${pingente.espessura} mm`
                : "Espessura não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Peso</strong>{" "}
              {pingente?.peso ? `${pingente.peso}g` : "Peso não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Material
              </strong>{" "}
              {pingente?.material || "Material não disponível"}
            </p>

            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Valor</strong>{" "}
              <div className="detalhes__venda__container">
                <p className="detalhes__valor">
                  {formatarPreco(pingente?.valor) || "Valor não disponível"}
                </p>
                <BotaoPrimario
                  texto="Adicionar ao carrinho"
                  onClick={adicionarAoCarrinho}
                />
              </div>
            </p>
            {pingente?.isStudded && (
              <p className="detalhes__info__item__p">
                <strong className="detalhes__info__item__p__strong">
                  Material Cravejado
                </strong>{" "}
                {pingente?.materialCravejado || "Não especificado"}
              </p>
            )}
          </div>
          <div className="detalhes__info__item descricao">
            <p className="detalhes__info__item__p">{pingente?.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesPingente;
