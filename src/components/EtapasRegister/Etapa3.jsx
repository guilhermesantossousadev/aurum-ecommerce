import { useState } from "react";
import { toast } from "sonner";
import "../../styles/pages/Register.css";
import SetaPretaEsquerda from "../../images/Setas/SetaPretaEsquerda.png";

const Etapa3 = ({ cep, setCep, numero, setNumero, isLoading, back }) => {
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    setCep(value);
  };

  const handleNumeroChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setNumero(value);

      if (value === "" || Number(value) <= 0) {
        toast.error("Informe um número válido maior que zero.");
      }
    } else {
      // Opcional: mostrar toast ao tentar digitar caractere inválido
      toast.error("Apenas números são permitidos.");
    }
  };

  return (
    <>
      <div className="return__register" onClick={back} style={{ cursor: "pointer" }}>
        <img src={SetaPretaEsquerda} alt="Voltar" />
        Voltar à etapa anterior
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: "75%" }} />
      </div>

      <div className="Register__form-group">
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          className="Register__input"
        />
      </div>

      <div className="Register__form-group">
        <input
          type="text"
          value={numero}
          onChange={handleNumeroChange}
          required
          className="Register__input"
          placeholder="Número"
        />
      </div>
    </>
  );
};

export default Etapa3;
