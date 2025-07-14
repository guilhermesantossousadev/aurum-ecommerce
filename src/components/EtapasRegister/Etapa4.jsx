import React, { useState } from "react";
import "../../styles/pages/Register.css";

const Etapa4 = ({
  cep,
  numero,
  complemento,
  setComplemento,
  next,
  back,
  enderecoFormatado,
  corrigirEndereco,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await next();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: "100%" }} />
      </div>

      <div className="Etapa">
        <h2 className="Register__title">Confirme seu endereço</h2>
        <p className="Register__text">{enderecoFormatado}</p>

        <div className="Register__form-group">
          <input
            type="text"
            placeholder="Complemento (opcional)"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            className="Register__input"
          />
        </div>

        <div className="Register__form-buttons">
          <button type="button" onClick={back} className="Register__button">
            Voltar
          </button>
          <button
            type="button"
            onClick={corrigirEndereco}
            className="Register__button Register__button--secondary"
          >
            Corrigir Endereço
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="Register__button"
            disabled={isLoading}
          >
            {isLoading ? <div className="loading-spinner-register" /> : "Avançar"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Etapa4;
