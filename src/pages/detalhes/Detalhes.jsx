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
  const [parcelas, setParcelas] = useState(null);
  const [joia, setJoia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAddCarrinho, setLoadingAddCarrinho] = useState(false);
  const [isCalculed, setIsCalculed] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);
  const [opcoesFrete, setOpcoesFrete] = useState([]);
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [freteSelecionado, setFreteSelecionado] = useState(null);

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
    const cepSemHifen = cep.replace(/\D/g, "");
    if (!cepSemHifen || cepSemHifen.length !== 8) {
      toast.error("CEP inválido.");
      return;
    }
    setLoadingFrete(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepSemHifen}/json/`
      );
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
      setIsCalculed(true);
      setOpcoesFrete(opcoes);
      setFreteSelecionado(null); // resetar opção selecionada ao calcular frete

      // Atualizar valor total somente com preço da joia inicialmente
      if (joia) {
        setValorTotal(joia.valor);
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      toast.error("Erro ao calcular o frete.");
    } finally {
      setLoadingFrete(false);
    }
  };

  const adicionarAoCarrinho = async () => {
    console.log("Iniciando adicionarAoCarrinho...");
    setLoadingAddCarrinho(true);
    try {
      const usuarioId = user?.id;
      console.log("Usuário ID:", usuarioId);
      if (!usuarioId) {
        toast.error("Usuário não está logado.");
        setLoadingAddCarrinho(false);
        return;
      }

      console.log("Buscando carrinho do usuário...");
      const carrinhoResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${usuarioId}`
      );
      console.log("Resposta do fetch do carrinho:", carrinhoResponse);

      if (!carrinhoResponse.ok) throw new Error("Erro ao buscar carrinho");

      const carrinhoData = await carrinhoResponse.json();
      console.log("Dados do carrinho:", carrinhoData);

      const anunciosAtuais = Array.isArray(carrinhoData.anunciosId?.anunciosId)
        ? [...carrinhoData.anunciosId.anunciosId]
        : [];

      console.log("Anúncios atuais no carrinho:", anunciosAtuais);
      console.log("ID do anúncio atual:", anuncio.id);

      if (!anunciosAtuais.includes(anuncio.id.toString())) {
        anunciosAtuais.push(anuncio.id.toString());
        console.log("Anúncio adicionado ao array:", anunciosAtuais);
      } else {
        console.log(
          "Anúncio já está no carrinho. Não será adicionado novamente."
        );
      }

      const carrinhoAtualizado = {
        baseUrl: "string",
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
        usuarioId,
        anunciosId: {
          anunciosId: anunciosAtuais, // Aqui é o ponto importante!
        },
        valorTotal: 0,
      };

      console.log("Enviando carrinho atualizado:", carrinhoAtualizado);
      const putResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/PutCarrinho`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carrinhoAtualizado),
        }
      );
      console.log("Resposta PUT carrinho:", putResponse);
      if (!putResponse.ok) throw new Error("Erro ao atualizar carrinho");

      console.log("Atualizando valor total...");
      const compileValueResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/CompileValue?usuarioId=${usuarioId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Resposta do CompileValue:", compileValueResponse);
      if (!compileValueResponse.ok)
        throw new Error("Erro ao compilar valor total");

      toast.success("Produto adicionado ao carrinho com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      toast.error("Erro ao adicionar ao carrinho");
    } finally {
      setLoadingAddCarrinho(false);
      console.log("Finalizado adicionarAoCarrinho.");
    }
  };

  // Atualize sua função calcValorParcelas para receber o valor
  const calcValorParcelas = async (valor) => {
    try {
      if (!valor) return;
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/CalcValorParcelas?preco=${valor}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.text();

      const numero = Number(data.replace(/\./g, "").replace(",", "."));

      if (!isNaN(numero)) {
        // Formata para moeda BRL
        const valorFormatado = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(numero);
        setParcelas(valorFormatado);
      } else {
        setParcelas(data);
      }
    } catch (err) {
      console.error("Erro ao calcular parcelas:", err);
    }
  };

  useEffect(() => {
    if (valorTotal !== null) {
      const numeroParcelas = 4;
      const valorParcela = valorTotal / numeroParcelas;

      const valorParcelaFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorParcela);

      setParcelas(`${numeroParcelas}x Sem Juros de ${valorParcelaFormatado}`);
    }
  }, [valorTotal]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Anúncio
        const anuncioResponse = await fetch(
          `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByIdAnuncio?id=${id}`
        );
        if (!anuncioResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do anúncio");
        }
        const anuncioData = await anuncioResponse.json();
        setAnuncio(anuncioData);

        // Fetch Joia usando anuncioData.joiaId
        const joiaResponse = await fetch(
          `https://marketplacejoias-api-latest.onrender.com/api/Joia/GetByIdJoia?id=${anuncioData.joiaId}`
        );
        if (!joiaResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes da joia");
        }
        const joiaData = await joiaResponse.json();
        setJoia(joiaData);

        // Inicializar valor total com preço da joia
        setValorTotal(joiaData.valor);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Atualiza valorTotal quando muda a opção de frete selecionada
  useEffect(() => {
    if (!joia) return;

    if (freteSelecionado) {
      setValorTotal(joia.valor + freteSelecionado.preco);
    } else {
      setValorTotal(joia.valor);
    }
  }, [freteSelecionado, joia]);

  const formatarPreco = (preco) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);

  if (loading)
    return (
      <div className="detalhes__container">
        <div className="loading-container">
          <h2 className="loading-text">Carregando Anúncio...</h2>
          <span className="loading-spinner"></span>
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
              <img src={anuncio.url} alt="Imagem da joia" />
            )}
          </div>
          <div className="detalhes__container__internal__right">
            <p className="detalhes__info__titulo">{anuncio.titulo}</p>
            <div className="detalhes__info__item__p">
              <div className="detalhes__venda__container">
                <span>{parcelas}</span>
                <p className="detalhes__valor">
                  {joia ? formatarPreco(joia.valor) : "Valor não disponível"}
                </p>
              </div>
            </div>
            <div
              className={`frete__container ${
                anuncio.isAvaliable === true ? "" : "not-available"
              }`}
            >
              <div
                className={`frete__container__item ${isCalculed ? "left" : ""}`}
              >
                <button
                  className="btn-adicionar-carrinho"
                  onClick={adicionarAoCarrinho}
                  disabled={loadingAddCarrinho}
                >
                  {loadingAddCarrinho ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    "Adicionar ao carrinho"
                  )}
                </button>

                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => {
                    let valor = e.target.value.replace(/\D/g, "").slice(0, 8);
                    if (valor.length > 5) {
                      valor = valor.slice(0, 5) + "-" + valor.slice(5);
                    }
                    setCep(valor);
                  }}
                  maxLength={9}
                  className="frete__input"
                />

                <button
                  className={`btn-calcular-frete ${
                    loadingFrete ? "loading" : ""
                  }`}
                  onClick={calcularFrete}
                >
                  {loadingFrete ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    "Calcular Frete"
                  )}
                </button>
              </div>
              <div className="frete__container__item">
                {opcoesFrete.length > 0 && (
                  <div className="frete__resultado">
                    {opcoesFrete.map((opcao, idx) => (
                      <div key={idx} className="frete__opcao">
                        <label>
                          <span>
                            {opcao.tipo}:{" "}
                            {opcao.preco === 0
                              ? "Grátis"
                              : formatarPreco(opcao.preco)}{" "}
                            - {opcao.descricao}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`anuncio__notAvaliable ${
                anuncio.isAvaliable === true ? "hidden" : ""
              }`}
            >
              <h1>Anúncio não disponível</h1>
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
