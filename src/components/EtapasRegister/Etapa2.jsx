
import "../../styles/pages/Register.css";

const Etapa2 = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, checkEmailExists, next, back }) => {
    return (
        <>
            <div className="progress-bar">
                <div className="progress" style={{ width: "66%" }} />
            </div>

            <div className="Register__form-group">
                <label>E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={checkEmailExists}
                    required
                    className="Register__input"
                />
            </div>
            <div className="Register__form-group">
                <label>Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="Register__input"
                />
            </div>
            <div className="Register__form-group">
                <label>Confirmar Senha</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="Register__input"
                />
            </div>
            <div className="Register__form-buttons">
                <button type="button" onClick={back} className="Register__button">Voltar</button>
                <button type="button" onClick={next} className="Register__button">Próximo</button>
            </div>
        </>
    );
};

export default Etapa2;