import React from "react";
import "../styles/components/Popup.css";
import formatCurrency from "../components/utils/formatCurrency"; // ajuste o caminho se necessário

function Popup({ anuncio, onClose }) {
  if (!anuncio) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{anuncio.titulo}</h2>
        <p>
          <strong>Tipo:</strong> {anuncio.tipoPeca}
        </p>
        <p>
          <strong>Valor:</strong> {formatCurrency(anuncio.valor)}
        </p>

        {anuncio.urLs && anuncio.urLs.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <strong>Imagens:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {anuncio.urLs.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Imagem ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Popup;
