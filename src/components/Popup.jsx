import React from "react";
import "../styles/components/Popup.css";
import formatCurrency from "../components/utils/formatCurrency";

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
          <div className="popup-images-container">
            <strong>Imagens:</strong>
            <div className="popup-images-list">
              {anuncio.urLs.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Imagem ${index + 1}`}
                  className="popup-image"
                />
              ))}
            </div>
          </div>
        )}

        <button onClick={onClose} className="popup-close-button">
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Popup;
