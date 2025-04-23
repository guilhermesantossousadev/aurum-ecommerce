import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetalhesAnel from "./DetalhesAnel";
import DetalhesBrinco from "./DetalhesBrinco";
import DetalhesColar from "./DetalhesColar";
import DetalhesPiercing from "./DetalhesPiercing";
import DetalhesPingente from "./DetalhesPingente";
import DetalhesPulseira from "./DetalhesPulseira";
import DetalhesRelogio from "./DetalhesRelogio";

function DetalhesRouter() {
  const [tipoJoia, setTipoJoia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoJoia = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar detalhes do anúncio para identificar o tipo de joia
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

        setTipoJoia(anuncioData.tipoPeca.toLowerCase());
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTipoJoia();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="detalhes-container">
        <div className="loading-message">Carregando detalhes...</div>
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

  // Renderiza o componente apropriado com base no tipo de joia
  switch (tipoJoia) {
    case "anel":
      return <DetalhesAnel />;
    case "brinco":
      return <DetalhesBrinco />;
    case "colar":
      return <DetalhesColar />;
    case "piercing":
      return <DetalhesPiercing />;
    case "pingente":
      return <DetalhesPingente />;
    case "pulseira":
      return <DetalhesPulseira />;
    case "relogio":
      return <DetalhesRelogio />;
    default:
      return (
        <div className="detalhes-container">
          <button className="voltar-button" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <div className="error-message">Tipo de joia não reconhecido</div>
        </div>
      );
  }
}

export default DetalhesRouter; 