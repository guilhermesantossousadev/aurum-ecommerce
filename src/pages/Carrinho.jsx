import "../styles/Carrinho.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

function Carrinho() {
  const [carrinho, setCarrinho] = useState(null);
  const [error, setError] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [joias, setJoias] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const buscarDetalhesAnuncios = async (anunciosIds) => {
    try {
      const detalhesAnuncios = await Promise.all(
        anunciosIds.map(async (id) => {
          const response = await fetch(
            `https://localhost:7081/api/Anuncio/GetByIdAnuncio?id=${id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(`Erro ao buscar anúncio ${id}`);
          }
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
            `https://localhost:7081/api/Joia/GetByIdJoia?id=${id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(`Erro ao buscar joia ${id}`);
          }
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

      const response = await fetch(
        `https://localhost:7081/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar o carrinho.");
      }

      const data = await response.json();
      setCarrinho(data);

      if (data?.anunciosId?.anunciosId?.length > 0) {
        await buscarDetalhesAnuncios(data.anunciosId.anunciosId);
      }
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removerDoCarrinho = async (anuncioId) => {
    try {
      const response = await fetch(
        `https://localhost:7081/api/Carrinho/RemoveAnuncioFromCarrinho?usuarioId=${user.id}&anuncioId=${anuncioId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao remover item do carrinho");
      }

      await fetchCarrinho();
    } catch (error) {
      console.error("Erro ao remover item:", error);
      setError("Erro ao remover item do carrinho");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCarrinho();
    }
  }, [user]);

  const calcularTotal = () => {
    return joias.reduce((total, joia) => total + (joia?.valor || 0), 0);
  };

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

  return (
    <div className="Carrinho">
      <div className="carrinho-container">
        {!carrinho?.anunciosId?.anunciosId?.length ? (
          <div className="carrinho-vazio">
            <h2>Seu carrinho está vazio</h2>
            <p>Explore nossa coleção de joias exclusivas</p>
            <a href="/" className="btn-continuar-comprando">
              Continuar Comprando
            </a>
          </div>
        ) : (
          <div className="carrinho-content">
            <div className="carrinho-items">
              {anuncios.map((anuncio, index) => {
                const joia = joias.find((j) => j.id === anuncio.joiaId);
                return (
                  <div key={index} className="carrinho-item">
                    <div className="item-imagem">
                      {anuncio.urLs && anuncio.urLs.length > 0 && (
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
              <a href="/catalogo" className="btn-continuar-comprando">
                Continuar comprando
              </a>
            </div>

            <div className="carrinho-resumo">
              <h3>Resumo do pedido</h3>
              <div className="resumo-item">
                <span>Subtotal do pedido</span>
                <span>
                  R${" "}
                  {calcularTotal().toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="resumo-item">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className="resumo-total">
                <span>Total:</span>
                <span>
                  R${" "}
                  {calcularTotal().toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <button className="btn-finalizar-compra">FINALIZAR PEDIDO</button>
              <p className="installments">
                Em até 9x de R${" "}
                {(calcularTotal() / 9).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="pix-discount">
                Pix: R${" "}
                {(calcularTotal() * 0.95).toLocaleString("pt-BR", {
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
