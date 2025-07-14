import "../../styles/pages/Register.css";

const Etapa3 = ({ cep, setCep, numero, setNumero, isLoading, back }) => {
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove não dígitos
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5, 8);
    }
    setCep(value);
  };

  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: "75%" }} />
      </div>

      <div className="Register__form-group">
        <input
          type="text"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          required
          className="Register__input"
          placeholder="CEP"
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
      <div className="Register__form-buttons">
        <button type="button" onClick={back} className="Register__button">
          Voltar
        </button>
      </div>
    </>
  );
};

export default Etapa3;
