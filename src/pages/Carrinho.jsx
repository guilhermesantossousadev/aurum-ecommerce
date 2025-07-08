import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

import formatCurrency from "../components/utils/formatCurrency";

import "../styles/pages/Carrinho.css";

function Carrinho() {
  const user = useSelector((state) => state.user);

  const [carrinho, setCarrinho] = useState(null);
  const [error, setError] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [joias, setJoias] = useState([]);

  const [parcelas, setParcelas] = useState("");

  const [notificacao, setNotificacao] = useState("");
  const [loading, setLoading] = useState(true);

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);

  const [isFinalizando, setIsFinalizando] = useState(false);
  const [isCalculandoFrete, setIsCalculandoFrete] = useState(false);

  const finalizarPedido = async () => {
    if (!frete) {
      toast.error("Calcule o frete antes de finalizar o pedido.");
      return;
    }

    setIsFinalizando(true);

    const anunciosParaPagamento = anunciosUnicos.map((anuncio) => {
      const joia = joias.find((j) => j.id === anuncio.joiaId);
      return {
        titulo: anuncio.titulo,
        valor: parseFloat(joia?.valor || 0),
      };
    });

    const totalComFrete =
      parseFloat(carrinho.valorTotal) + parseFloat(frete.valor);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/MercadoPago/MercadoPagoCheckoutPro?usuarioId=${user.id}&valorTotal=${totalComFrete}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(anunciosParaPagamento),
        }
      );

      if (!response.ok) throw new Error("Erro ao criar pagamento.");

      const data = await response.json();
      if (data?.initPoint) {
        window.location.href = data.initPoint;
      } else {
        toast.error("URL de pagamento não recebida.");
      }
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      toast.error("Erro ao finalizar pedido.");
    } finally {
      setIsFinalizando(false);
    }
  };
  const CalcParcelas = async () => {
    if (isNaN(parseFloat(carrinho?.valorTotal))) {
      setParcelas("0,00");
      return;
    }

    const totalComFrete =
      parseFloat(carrinho?.valorTotal || 0) + parseFloat(frete?.valor || 0);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/CalcValorParcelas?preco=${carrinho?.valorTotal}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Erro ao calcular parcelas.");

      const data = await response.text();

      setParcelas(
        parseFloat(data || 0).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })
      );
    } catch (error) {
      console.error("Erro ao calcular parcelas:", error);
      toast.error("Erro ao calcular parcelas.");
    }
  };

  const calcularFrete = async () => {
    if (!cep || cep.length < 8) return toast.error("Informe um CEP válido");

    setIsCalculandoFrete(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) return toast.error("CEP inválido");

      const valorFrete = carrinho.valorTotal < 2000 ? 19.9 : 0;
      const prazoEntrega = carrinho.valorTotal < 500 ? 5 : 3;

      setFrete({
        valor: valorFrete.toFixed(2),
        prazo: prazoEntrega,
      });

      toast.success("Frete calculado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao calcular o frete");
    } finally {
      setIsCalculandoFrete(false);
    }
  };

  // Tratamento para usuário não logado
  if (!user?.id) {
    return (
      <div className="Carrinho">
        <div className="carrinho-container">
          <div className="carrinho-error">
            <h2>Você não está logado</h2>
            <p>Por favor, faça login para acessar o carrinho.</p>
            <a href="/login" className="btn-login">
              Ir para Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  const mostrarNotificacao = (mensagem) => {
    setNotificacao(mensagem);
    setTimeout(() => setNotificacao(""), 3000);
  };

  const buscarDetalhesAnuncios = async (anunciosIds) => {
    try {
      const detalhesAnuncios = await Promise.all(
        anunciosIds.map(async (id) => {
          const response = await fetch(
            `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByIdAnuncio?id=${id}`
          );
          if (!response.ok) throw new Error(`Erro ao buscar anúncio ${id}`);
          return response.json();
        })
      );
      setAnuncios(detalhesAnuncios);

      const joiasIds = detalhesAnuncios.map((anuncio) => anuncio.joiaId);
      await buscarDetalhesJoia(joiasIds);
    } catch (error) {
      console.error("Erro ao buscar detalhes dos anúncios:", error);
      setError("Erro ao carregar os detalhes dos anúncios");
    }
  };

  const buscarDetalhesJoia = async (joiasIds) => {
    try {
      const detalhesJoias = await Promise.all(
        joiasIds.map(async (id) => {
          const response = await fetch(
            `https://marketplacejoias-api-latest.onrender.com/api/Joia/GetByIdJoia?id=${id}`
          );
          if (!response.ok) throw new Error(`Erro ao buscar joia ${id}`);
          return response.json();
        })
      );
      setJoias(detalhesJoias);
    } catch (error) {
      console.error("Erro ao buscar detalhes das joias:", error);
      setError("Erro ao carregar os detalhes das joias");
    }
  };

  const fetchCarrinho = async () => {
    try {
      setLoading(true);
      setError(null);

      await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/CompileValue?usuarioId=${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${user.id}`
      );
      if (!response.ok) throw new Error("Erro ao buscar carrinho");

      const data = await response.json();
      setCarrinho(data);

      if (data?.anunciosId?.anunciosId?.length > 0) {
        await buscarDetalhesAnuncios(data.anunciosId.anunciosId);
      } else {
        setAnuncios([]);
        setJoias([]);
      }
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err);
      setError("Erro ao carregar o carrinho");
    } finally {
      setLoading(false);
    }
  };

  // Remover totalmente do carrinho (todos os itens desse anúncio)
  const removerDoCarrinho = async (anuncioId) => {
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

      // Remove todas as ocorrências do anuncioId
      const anunciosAtualizados = anunciosAtuais.filter(
        (id) => id !== anuncioId.toString()
      );

      const carrinhoAtualizado = {
        ...carrinhoData,
        anunciosId: { anunciosId: anunciosAtualizados },
      };

      const updateResponse = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/PutCarrinho`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carrinhoAtualizado),
        }
      );

      if (!updateResponse.ok) throw new Error("Erro ao atualizar carrinho");

      await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/CompileValue?usuarioId=${usuarioId}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );

      toast.success("Produto removido do carrinho com sucesso!");

      await fetchCarrinho();
    } catch (err) {
      console.error("Erro ao remover do carrinho:", err);
      toast.error("Erro ao remover do carrinho");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCarrinho();
    }
  }, [user?.id]);

  useEffect(() => {
    if (carrinho) {
      CalcParcelas();
    }
  }, [carrinho, frete]);

  if (error) {
    return (
      <div className="Carrinho">
        <div className="carrinho-container">
          <div className="carrinho-error">
            <h2>Ops! Algo deu errado</h2>
            <p>{error}</p>
            <button onClick={fetchCarrinho}>Tentar novamente</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="Carrinho">
        <div className="carrinho-container">
          <div className="carrinho-loading">
            <div className="loading-spinner"></div>
            <p>Carregando seu carrinho...</p>
          </div>
        </div>
      </div>
    );
  }

  // Garante anúncios únicos (sem repetição)
  const anunciosUnicos = anuncios.filter(
    (anuncio, index, self) =>
      index === self.findIndex((a) => a.id === anuncio.id)
  );

  return (
    <div className="Carrinho">
      <div className="carrinho-container">
        {!carrinho?.anunciosId?.anunciosId?.length ? (
          <div className="carrinho-vazio">
            <h2>Seu carrinho está vazio</h2>
            <p>Explore nossa coleção de joias exclusivas</p>

            <Link to="/catalogo/todos" className="btn-continuar-comprando">
              Catálogo
            </Link>
          </div>
        ) : (
          <div className="carrinho-content">
            <div className="carrinho-items">
              {anunciosUnicos.map((anuncio) => {
                const joia = joias.find((j) => j.id === anuncio.joiaId);

                return (
                  <div key={anuncio.id} className="carrinho-item">
                    <div className="item-imagem">
                      {anuncio.urLs?.length > 0 && (
                        <img src={anuncio.urLs[0]} alt={anuncio.titulo} />
                      )}
                    </div>
                    <div className="item-detalhes">
                      <h3>{anuncio.titulo}</h3>
                      <p className="item-tipo">Tipo: {joia?.tipoPeca}</p>
                      <p className="item-material">
                        Material: {joia?.material}
                      </p>
                      {joia?.isStudded && (
                        <p className="item-cravejado">
                          Material Cravejado: {joia.materialCravejado}
                        </p>
                      )}
                      <button
                        className="btn-remover"
                        onClick={() => removerDoCarrinho(anuncio.id)}
                      >
                        <FaTrash /> Remover
                      </button>
                    </div>
                    <div className="item-valor">
                      R${" "}
                      {joia?.valor?.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="carrinho-resumo">
              <h3>Resumo do pedido</h3>

              <div className="resumo-item">
                <span>Subtotal do pedido</span>
                <span>
                  R$
                  {carrinho.valorTotal?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <input
                type="text"
                className="frete-input"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />

              <button
                className="frete-btn"
                onClick={calcularFrete}
                disabled={isCalculandoFrete}
              >
                {isCalculandoFrete ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "Calcular Frete"
                )}
              </button>

              {frete && (
                <p
                  className={`frete-simulado ${
                    frete.valor === "0.00" ? "frete-gratis" : ""
                  }`}
                >
                  Frete via PAC:{" "}
                  {frete.valor === "0.00" ? (
                    <>
                      <strong>Grátis</strong> •{" "}
                      <strong>Entrega em {frete.prazo} dias úteis</strong>
                    </>
                  ) : (
                    <>
                      R${frete.valor} • Entrega em {frete.prazo} dias úteis
                    </>
                  )}
                </p>
              )}

              <div className="resumo-total">
                <span>Total:</span>
                <span>Valor: {formatCurrency(carrinho.valorTotal)}</span>
              </div>

              <button
                className="btn-finalizar-compra"
                onClick={finalizarPedido}
                disabled={isFinalizando}
              >
                {isFinalizando ? (
                  <span className="loading-spinner"></span>
                ) : (
                  "FINALIZAR PEDIDO"
                )}
              </button>

              <p className="installments">
                Em até 9x de R$
                {parcelas}
              </p>
              <p className="pix-discount">
                Pix: R$
                {(carrinho.valorTotal * 0.95).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}{" "}
                (5% nos produtos)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrinho;
