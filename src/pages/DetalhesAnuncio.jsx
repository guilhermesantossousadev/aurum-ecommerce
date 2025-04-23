import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DetalhesAnuncio.css";

function DetalhesAnuncio() {
  const [anuncio, setAnuncio] = useState(null);
  const [joia, setJoia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar detalhes do anúncio
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

        // Buscar detalhes da joia
        const joiaResponse = await fetch(
          `https://localhost:7081/api/Joia/GetByIdJoia?id=${anuncioData.joiaId}`
        );
        
        if (!joiaResponse.ok) {
          throw new Error("Não foi possível carregar os detalhes da joia");
        }
        
        const joiaData = await joiaResponse.json();
        
        if (!joiaData) {
          throw new Error("Joia não encontrada");
        }
        
        setJoia(joiaData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="detalhes-container">
        <div className="loading-message">Carregando detalhes do anúncio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalhes-container">
        <button className="voltar-button" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!anuncio || !joia) {
    return (
      <div className="detalhes-container">
        <button className="voltar-button" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <div className="error-message">Anúncio não encontrado</div>
      </div>
    );
  }

  const formatarData = (data) => {
    try {
      return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return "Data não disponível";
    }
  };

  const formatarPreco = (preco) => {
    try {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(preco);
    } catch (error) {
      return "Preço não disponível";
    }
  };

  return (
    <div className="detalhes-container">
      <button className="voltar-button" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <div className="detalhes-content">
        <div className="detalhes-header">
          <h1>{joia.formato || "Nome não disponível"}</h1>
          <p className="categoria">{joia.categoria || "Categoria não disponível"}</p>
        </div>

        <div className="detalhes-info">
          <div className="detalhes-anuncio">
            <h2>Detalhes do Anúncio</h2>
            <p>
              <strong>Preço:</strong>{" "}
              <span className="preco">{formatarPreco(anuncio.preco)}</span>
            </p>
            <p>
              <strong>Data de Publicação:</strong>{" "}
              {formatarData(anuncio.dataPublicacao)}
            </p>
            <p>
              <strong>Descrição:</strong> {anuncio.descricao || "Descrição não disponível"}
            </p>
          </div>

          <div className="detalhes-joia">
            <h2>Detalhes da Joia</h2>
            <p>
              <strong>Material:</strong> {joia.material || "Material não disponível"}
            </p>
            <p>
              <strong>Peso:</strong> {joia.peso ? `${joia.peso}g` : "Peso não disponível"}
            </p>
            <p>
              <strong>Dimensões:</strong> {joia.dimensoes || "Dimensões não disponíveis"}
            </p>
            <p>
              <strong>Estado:</strong> {joia.estado || "Estado não disponível"}
            </p>
            <p>
              <strong>Marca:</strong> {joia.marca || "Marca não disponível"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalhesAnuncio;
