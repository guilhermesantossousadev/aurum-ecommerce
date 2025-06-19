
import "../../styles/pages/Register.css";

const Etapa3 = ({ cep, setCep, numero, setNumero, isLoading, back }) => {
    return (
        <>
            <div className="progress-bar">
                <div className="progress" style={{ width: "100%" }} />
            </div>

            <div className="Register__form-group">
                <label>CEP</label>
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9}
                    required
                    className="Register__input"
                />
            </div>
            <div className="Register__form-group">
                <label>Número</label>
                <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                    className="Register__input"
                />
            </div>
            <div className="Register__form-buttons">
                <button type="button" onClick={back} className="Register__button">Voltar</button>
            </div>
        </>
    );
};

export default Etapa3;