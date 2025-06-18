import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/pages/Carrinho.css";

function Carrinho() {
  const user = useSelector((state) => state.user);

  const [carrinho, setCarrinho] = useState(null);
  const [error, setError] = useState(null);
  const [anuncios, setAnuncios] = useState([]);
  const [joias, setJoias] = useState([]);

  const [notificacao, setNotificacao] = useState("");
  const [loading, setLoading] = useState(true);

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

  // Função para agrupar anúncios e contar quantidade
  const agruparItensComQuantidade = (anunciosIdsArray) => {
    const map = {};
    anunciosIdsArray.forEach((id) => {
      map[id] = (map[id] || 0) + 1;
    });
    return map; // ex: { "1": 3, "2": 1 }
  };

  // Aumentar quantidade de um anúncio no carrinho
  const aumentarQuantidade = async (anuncioId) => {
    try {
      const usuarioId = user?.id;
      if (!usuarioId) return;

      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${usuarioId}`
      );
      if (!response.ok) throw new Error("Erro ao buscar carrinho");
      const data = await response.json();

      const novosAnuncios = [
        ...data.anunciosId.anunciosId,
        anuncioId.toString(),
      ];

      const carrinhoAtualizado = {
        ...data,
        anunciosId: { anunciosId: novosAnuncios },
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

      await fetchCarrinho();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao aumentar quantidade");
    }
  };

  // Diminuir quantidade de um anúncio no carrinho
  const diminuirQuantidade = async (anuncioId) => {
    try {
      const usuarioId = user?.id;
      if (!usuarioId) return;

      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Carrinho/GetByUsuarioIdCarrinho?usuarioId=${usuarioId}`
      );
      if (!response.ok) throw new Error("Erro ao buscar carrinho");
      const data = await response.json();

      const anunciosAtuais = [...data.anunciosId.anunciosId];
      const index = anunciosAtuais.indexOf(anuncioId.toString());
      if (index !== -1) {
        anunciosAtuais.splice(index, 1);
      } else {
        toast.error("Produto não encontrado no carrinho");
        return;
      }

      const carrinhoAtualizado = {
        ...data,
        anunciosId: { anunciosId: anunciosAtuais },
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

      await fetchCarrinho();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao diminuir quantidade");
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

  // Objeto com quantidades de cada anuncioId
  const quantidades = carrinho?.anunciosId?.anunciosId
    ? agruparItensComQuantidade(carrinho.anunciosId.anunciosId)
    : {};

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
                const quantidade = quantidades[anuncio.id] || 0;

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
                      <div className="item-quantidade">
                        <button
                          onClick={() => diminuirQuantidade(anuncio.id)}
                          disabled={quantidade <= 1}
                        >
                          -
                        </button>
                        <span>{quantidade}</span>
                        <button onClick={() => aumentarQuantidade(anuncio.id)}>
                          +
                        </button>
                      </div>
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
                  R${" "}
                  {carrinho.valorTotal?.toLocaleString("pt-BR", {
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
                  {carrinho.valorTotal?.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <button className="btn-finalizar-compra">FINALIZAR PEDIDO</button>
              <p className="installments">
                Em até 9x de R${" "}
                {(carrinho.valorTotal / 9).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="pix-discount">
                Pix: R${" "}
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
