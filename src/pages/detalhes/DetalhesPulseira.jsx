import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/ImageCarousel";
import SetaRosaEsquerda from "../../images/SetaRosaEsquerda.png";

import BotaoPrimario from "../../components/BotaoPrimario";
import { toast } from "react-toastify";

import "../../styles/detalhes/DetalhesComum.css";

function DetalhesPulseira() {
  const user = useSelector((state) => state.user);

  const [anuncio, setAnuncio] = useState(null);
  const [pulseira, setPulseira] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);
  const [valorTotal, setValorTotal] = useState(null);
  const [opcoesFrete, setOpcoesFrete] = useState([]);

  // Tabela de frete base por estado
  const tabelaFrete = {
    SP: 22,
    RJ: 25,
    MG: 20,
  };

  // Função auxiliar para formatar datas (Exemplo simples)
  const formatarData = (data) => {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Função que simula opções de frete com prazo e preço
  const calcularFrete = async () => {
    if (!cep || cep.length !== 8) {
      toast.error("CEP inválido.");
      return;
    }

    try {
      // Buscar estado pelo CEP
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      const uf = data.uf;
      if (!uf) {
        toast.error("Estado não encontrado para esse CEP.");
        return;
      }

      // Base do frete
      const freteBase = tabelaFrete[uf] ?? 30;

      // Data de hoje
      const hoje = new Date();

      // Simular várias opções de frete com prazos diferentes
      const opcoes = [
        {
          tipo: "Retire em loja",
          preco: 0,
          prazo: new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            hoje.getDate() + ((5 - hoje.getDay() + 7) % 7) + 1
          ), // próxima sexta-feira
          descricao: "Retire em uma loja a partir de sexta-feira",
        },
        {
          tipo: "Entrega expressa",
          preco: freteBase + 5,
          prazo: new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            hoje.getDate() + 4
          ), // 4 dias depois
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
          ), // 7 dias depois
          descricao:
            "Chegará " +
            formatarData(
              new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 7)
            ),
        },
      ];

      setOpcoesFrete(opcoes);

      // Atualizar valor total com o frete mais barato (economica)
      setValorTotal((pulseira?.valor || 0) + freteBase);
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      toast.error("Erro ao calcular o frete.");
    }
  };

  const adicionarAoCarrinho = async () => {
    try {
      const usuarioId = user?.id;
      if (!usuarioId) {
        alert("Usuário não está logado.");
        return;
      }

      // 1. Buscar carrinho atual do usuário
      const carrinhoResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${usuarioId}`
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
        valorTotal: 0,
      };

      console.log(JSON.stringify(carrinhoAtualizado));

      // 4. Requisição PUT
      const updateResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/PutCarrinho`,
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

      toast.success("Produto adicionado ao carrinho com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
      toast.error("Erro ao adicionar ao carrinho");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const anuncioResponse = await fetch(
          `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByIdAnuncio?id=${id}`
        );

        if (!anuncioResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes do anúncio");
        }

        const anuncioData = await anuncioResponse.json();

        if (!anuncioData) {
          throw new Error("Pulseira não encontrada");
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
    const fetchPulseira = async () => {
      try {
        const pulseiraResponse = await fetch(
          `https://marketplacejoias-api-latest.onrender.com/api/Joia/GetByIdJoia?id=${anuncio.joiaId}`
        );

        if (!pulseiraResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes da pulseira");
        }

        const pulseiraData = await pulseiraResponse.json();
        setPulseira(pulseiraData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados da pulseira:", err);
      } finally {
        setLoading(false);
      }
    };

    if (anuncio && anuncio.joiaId) {
      fetchPulseira();
    }
  }, [anuncio]);

  if (loading) {
    return (
      <div className="detalhes__container">
        <div className="loading__message">
          Carregando detalhes da pulseira...
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
          <img src={SetaRosaEsquerda} alt="Voltar" />
        </button>
        <div className="error__message">Pulseira não encontrada</div>
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
          <img src={SetaRosaEsquerda} alt="Voltar" />
        </button>

        <div className="detalhes__container__internal">
          <div className="detalhes__container__internal__left">
            <div className="detalhes__container__imagem">
              {anuncio.urLs && anuncio.urLs.length > 0 ? (
                <ImageCarousel images={anuncio.urLs} />
              ) : (
                <img src={anuncio.url} alt="Imagem do pulseira" />
              )}
            </div>
          </div>

          <div className="detalhes__container__internal__right">
            <p className="detalhes__info__item__p">
              <div className="detalhes__venda__container">
                <span>
                  4x sem juros de {formatarPreco(pulseira?.valor / 4)}
                </span>
                <p className="detalhes__valor">
                  {formatarPreco(pulseira?.valor) || "Valor não disponível"}
                </p>
                <BotaoPrimario
                  texto="Adicionar ao carrinho"
                  onClick={adicionarAoCarrinho}
                />
              </div>
            </p>

            <div className="frete__container">
              <div className="Frete__item__container">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                  maxLength={8}
                  className="frete__input"
                />
                <button className="frete__botao" onClick={calcularFrete}>
                  Calcular Frete
                </button>
              </div>

              {/* Mostrar todas opções de frete */}
              {opcoesFrete.length > 0 && (
                <div className="frete__resultado">
                  {opcoesFrete.map((opcao, idx) => (
                    <div key={idx} className="frete__opcao">
                      <span>{opcao.tipo}:</span>
                      {opcao.preco === 0 ? (
                        <span> Grátis</span>
                      ) : (
                        <span> {formatarPreco(opcao.preco)}</span>
                      )}{" "}
                      - <span>{opcao.descricao}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Detalhes do Anúncio */}
        <p className="detalhes__info__titulo">{anuncio.titulo}</p>
        <div className="detalhes__info">
          <div className="detalhes__info__item">
            {/* Detalhes da Pulseira */}
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Tipo de Fecho
              </strong>{" "}
              {pulseira?.tipoFecho || "Tipo de fecho não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Comprimento
              </strong>{" "}
              {pulseira?.comprimento
                ? `${pulseira.comprimento} cm`
                : "Comprimento não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Espessura
              </strong>{" "}
              {pulseira?.espessura
                ? `${pulseira.espessura} mm`
                : "Espessura não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Flexibilidade
              </strong>{" "}
              {pulseira?.flexibilidade || "Flexibilidade não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Peso</strong>{" "}
              {pulseira?.peso ? `${pulseira.peso}g` : "Peso não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">
                Material
              </strong>{" "}
              {pulseira?.material || "Material não disponível"}
            </p>
            <p className="detalhes__info__item__p">
              <strong className="detalhes__info__item__p__strong">Valor</strong>{" "}
              <div className="detalhes__venda__container">
                <p className="detalhes__valor">
                  {formatarPreco(pulseira?.valor) || "Valor não disponível"}
                </p>
                <BotaoPrimario
                  texto="Adicionar ao carrinho"
                  onClick={adicionarAoCarrinho}
                />
              </div>
            </p>
            {pulseira?.isStudded && (
              <p className="detalhes__info__item__p">
                <strong className="detalhes__info__item__p__strong">
                  Material Cravejado
                </strong>{" "}
                {pulseira?.materialCravejado || "Não especificado"}
              </p>
            )}
          </div>
          <div className="detalhes__info__item descricao">
            <p className="detalhes__info__item__p">{pulseira?.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesPulseira;
