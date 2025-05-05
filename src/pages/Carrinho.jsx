import "../styles/Carrinho.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

function Carrinho() {
  const user = useSelector((state) => state.user);

  const [carrinho, setCarrinho] = useState(null);
  const [error, setError] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [joias, setJoias] = useState([]);
  const [loading, setLoading] = useState(true);

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

      const valorValue = await fetch(
        `https://localhost:7081/api/Carrinho/CompileValue?usuarioId=${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await fetch(
        `https://localhost:7081/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${user.id}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar carrinho");
      }

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

  const removerDoCarrinho = async (anuncioId) => {
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

      // Encontra o índice do primeiro anúncioId que corresponde
      const indexToRemove = anunciosAtuais.indexOf(anuncioId.toString());

      // Se encontrar, remove a primeira ocorrência
      if (indexToRemove !== -1) {
        anunciosAtuais.splice(indexToRemove, 1); // Remove apenas a primeira ocorrência
      }

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
        valorTotal: carrinhoData.valorTotal, // usa null se o valor não estiver presente
      };

      console.log(JSON.stringify(carrinhoAtualizado));

      // 4. Requisição PUT para remover o item
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

      if (!updateResponse.ok) {
        throw new Error("Erro ao atualizar carrinho");
      }

      // 5. Recalcular o valor total do carrinho
      const valorValue = await fetch(
        `https://localhost:7081/api/Carrinho/CompileValue?usuarioId=${usuarioId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!valorValue.ok) {
        throw new Error("Erro ao calcular o valor total do carrinho");
      }
    } catch (err) {
      console.error("Erro ao remover do carrinho:", err);
      alert("Erro ao remover item do carrinho");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCarrinho();
    }
  }, [user]);

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
                      R$
                      {joia?.valor}
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
                <span>R$ {carrinho.valorTotal}</span>
              </div>
              <div className="resumo-item">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className="resumo-total">
                <span>Total:</span>
                <span>R$ {carrinho.valorTotal}</span>
              </div>
              <button className="btn-finalizar-compra">FINALIZAR PEDIDO</button>
              <p className="installments">
                Em até 9x de R${" "}
                {(carrinho.valorTotal / 9).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="pix-discount">
                Pix: R$ {carrinho.valorTotal * 0.95}
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
