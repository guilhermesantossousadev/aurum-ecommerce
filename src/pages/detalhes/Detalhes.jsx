// Detalhes.jsx corrigido, pronto para colar

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BotaoPrimario from "../../components/BotaoPrimario";
import { Toaster, toast } from "sonner";
import "../../styles/detalhes/Detalhes.css";

import ImageCarousel from "../../components/ImageCarousel";
import SetaRosaEsquerda from "../../images/Setas/SetaRosaEsquerda.png";

function Detalhes() {
  const user = useSelector((state) => state.user);

  const [anuncio, setAnuncio] = useState(null);
  const [joia, setJoia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAddCarrinho, setLoadingAddCarrinho] = useState(false);
  const [isCalculed, setisCalculed] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [loadingFrete, setLoadingFrete] = useState(false);

  const tabelaFrete = { SP: 22, RJ: 25, MG: 20 };

  const formatarData = (data) => {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      toast.error("CEP inválido.");
      return;
    }
    setLoadingFrete(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }
      const uf = data.uf;
      const freteBase = tabelaFrete[uf] ?? 30;
      const hoje = new Date();
      const opcoes = [
        {
          tipo: "Retire em loja",
          preco: 0,
          prazo: new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            hoje.getDate() + ((5 - hoje.getDay() + 7) % 7) + 1
          ),
          descricao: "Retire em uma loja a partir de sexta-feira",
        },
        {
          tipo: "Entrega expressa",
          preco: freteBase + 5,
          prazo: new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            hoje.getDate() + 4
          ),
          descricao:
            "Chegará " +
            formatarData(
              new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 4)
            ),
        },
        {
          tipo: "Entrega econômica",
          preco: freteBase,
          prazo: new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            hoje.getDate() + 7
          ),
          descricao:
            "Chegará " +
            formatarData(
              new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 7)
            ),
        },
      ];
      setisCalculed(true);
      setOpcoesFrete(opcoes);
      if (joia) {
        setValorTotal(joia.valor + freteBase);
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      toast.error("Erro ao calcular o frete.");
    } finally {
      setLoadingFrete(false);
    }
  };

  const adicionarAoCarrinho = async () => {
    setLoadingAddCarrinho(true);
    try {
      const usuarioId = user?.id;
      if (!usuarioId) {
        toast.error("Usuário não está logado.");
        return;
      }
      const carrinhoResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${usuarioId}`
      );
      if (!carrinhoResponse.ok) throw new Error("Erro ao buscar carrinho");
      const carrinhoData = await carrinhoResponse.json();
      const anunciosAtuais = carrinhoData.anunciosId?.anunciosId || [];
      anunciosAtuais.push(anuncio.id.toString());
      const carrinhoAtualizado = {
        baseUrl: "string",
        requestClientOptions: {
          schema: "string",
          headers: {
            additionalProp1: "string",
          },
          queryParams: {
            additionalProp1: "string",
          },
        },
        id: carrinhoData.id,
        usuarioId,
        anunciosId: { anunciosId: anunciosAtuais },
        valorTotal: 0,
      };
      await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/PutCarrinho`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carrinhoAtualizado),
        }
      );
      await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/CompileValue?usuarioId=${usuarioId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Produto adicionado ao carrinho com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      toast.error("Erro ao adicionar ao carrinho");
    } finally {
      setLoadingAddCarrinho(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Anuncio
        const anuncioResponse = await fetch(
          `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByIdAnuncio?id=${id}`
        );
        if (!anuncioResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do anúncio");
        }
        const anuncioData = await anuncioResponse.json();
        setAnuncio(anuncioData);

        // Fetch Joia using anuncioData.joiaId
        const joiaResponse = await fetch(
          `https://marketplacejoias-api-latest.onrender.com/api/Joia/GetByIdJoia?id=${anuncioData.joiaId}`
        );
        if (!joiaResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes da joia");
        }
        const joiaData = await joiaResponse.json();
        setJoia(joiaData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Dependência apenas do ID

  const formatarPreco = (preco) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);

  if (loading)
    return (
      <div className="detalhes__container">
        <div className="loading__message">
          <div className="loading-spinner-detalhes"></div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="detalhes__container">
        <button onClick={() => navigate(-1)}>Voltar</button>
        <div>{error}</div>
      </div>
    );

  return (
    <div className="detalhes">
      <div className="detalhes__container">
        <div className="Voltar__container">
          <img
            src={SetaRosaEsquerda}
            alt="Voltar"
            className="Voltar__btn"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="detalhes__container__internal">
          <div className="detalhes__container__internal__left">
            {anuncio.urLs?.length ? (
              <ImageCarousel images={anuncio.urLs} />
            ) : (
              <img src={anuncio.url} alt="Imagem do joia" />
            )}
          </div>
          <div className="detalhes__container__internal__right">
            <p className="detalhes__info__titulo">{anuncio.titulo}</p>
            <div className="detalhes__info__item__p">
              <div className="detalhes__venda__container">
                <span>
                  4x sem juros de {joia ? formatarPreco(joia.valor / 4) : "-"}
                </span>
                <p className="detalhes__valor">
                  {joia ? formatarPreco(joia.valor) : "Valor não disponível"}
                </p>
              </div>
            </div>
            <div
              className={`frete__container ${
                anuncio.isAvaliable === true ? "" : "isAvaliable"
              }`}
            >
              <div
                className={`frete__container__item ${isCalculed ? "left" : ""}`}
              >
                <BotaoPrimario
                  texto="Adicionar ao carrinho"
                  onClick={adicionarAoCarrinho}
                  loading={loadingAddCarrinho}
                />

                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) =>
                    setCep(e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                  maxLength={8}
                  className="frete__input"
                />
                <BotaoPrimario
                  onClick={calcularFrete}
                  loading={loadingFrete}
                  texto="Calcular Frete"
                />
              </div>
              <div className="frete__container__item">
                {opcoesFrete.length > 0 && (
                  <div className="frete__resultado">
                    {opcoesFrete.map((opcao, idx) => (
                      <div key={idx} className="frete__opcao">
                        <span>
                          {opcao.tipo}:{" "}
                          {opcao.preco === 0
                            ? "Grátis"
                            : formatarPreco(opcao.preco)}{" "}
                          - {opcao.descricao}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`anuncio__notAvaliable ${
                anuncio.isAvaliable === true ? "" : "isAvaliable"
              }`}
            >
              <h1>Anuncio não disponível</h1>
            </div>
          </div>
        </div>

        <div className="detalhes__part">
          <div className="detalhes__part__inside"></div>
        </div>

        {/* Detalhes do Anúncio */}
        <div className="detalhes__info">
          <div className="detalhes__info__item">
            {[
              { key: "modelo", label: "Modelo" },
              { key: "tipoFecho", label: "Tipo de Fecho" },
              { key: "altura", label: "Altura", suffix: "mm" },
              { key: "pesoIndividual", label: "Peso Individual", suffix: "g" },
              { key: "material", label: "Material" },
              {
                key: "materialCravejado",
                label: "Material Cravejado",
                condition: joia?.isStudded,
              },
              { key: "peso", label: "Peso", suffix: "g" },
              { key: "tamanho", label: "Tamanho", suffix: "mm" },
              { key: "formato", label: "Formato" },
              { key: "comprimento", label: "Comprimento", suffix: "mm" },
              { key: "espessura", label: "Espessura", suffix: "mm" },
              { key: "tipoCorrente", label: "Tipo de Corrente" },
              { key: "regiao", label: "Região" },
              { key: "fechamento", label: "Fechamento" },
              { key: "flexibilidade", label: "Flexibilidade" },
              { key: "tipoMovimento", label: "Tipo de Movimento" },
              {
                key: "diametroCaixa",
                label: "Diâmetro da Caixa",
                suffix: "mm",
              },
              { key: "materialPulseira", label: "Material da Pulseira" },
              { key: "fonteEnergia", label: "Fonte de Energia" },
              { key: "havePendant", label: "Possui Pingente", boolean: true },
              { key: "isAntiallergic", label: "Antialérgico", boolean: true },
              { key: "haveCharms", label: "Possui Charms", boolean: true },
              {
                key: "haveWaterResistance",
                label: "Resistente à Água",
                boolean: true,
              },
            ]
              .filter(
                ({ key, condition }) =>
                  condition !== false &&
                  joia?.[key] !== undefined &&
                  joia?.[key] !== null
              )
              .map(({ key, label, suffix = "", boolean }) => (
                <p key={key} className="detalhes__info__item__p">
                  <strong className="detalhes__info__item__p__strong">
                    {label}
                  </strong>{" "}
                  {boolean
                    ? joia[key]
                      ? "Sim"
                      : "Não"
                    : `${joia[key]}${suffix}`}
                </p>
              ))}
          </div>
        </div>

        <div className="detalhes__part">
          <div className="detalhes__part__inside"></div>
        </div>

        {joia?.descricao && (
          <div className="detalhes__info__item descricao">
            <p className="detalhes__info__item__p">{joia.descricao}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detalhes;
