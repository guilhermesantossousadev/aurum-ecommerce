import React from "react";
import "../styles/components/BotaoPrimario.css";

function BotaoPrimario({ texto, onClick }) {
  return (
    <button className="botao-primario" onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotaoPrimario;
