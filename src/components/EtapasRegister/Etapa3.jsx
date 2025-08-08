import "../../styles/pages/Register.css";
import SetaPretaEsquerda from "../../images/Setas/SetaPretaEsquerda.png";

const Etapa3 = ({ cep, setCep, numero, setNumero, isLoading, back }) => {
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // só números
    if (value.length > 8) value = value.slice(0, 8);

    // Aplica máscara: 12345678 -> 12345-678
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    setCep(value);
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
          maxLength={9} // 8 números + 1 hífen
          className="Register__input"
        />
      </div>
      <div className="Register__form-group">
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
          className="Register__input"
          placeholder="Número"
        />
      </div>
    </>
  );
};

export default Etapa3;
