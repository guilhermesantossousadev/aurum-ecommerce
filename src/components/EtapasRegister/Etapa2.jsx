import "../../styles/pages/Register.css";

const Etapa2 = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  checkEmailExists,
  next,
  back,
}) => {
  return (
    <>
      <div className="progress-bar">
        <div className="progress" style={{ width: "50%" }} />
      </div>

      <div className="Register__form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={checkEmailExists}
          required
          className="Register__input"
          placeholder="E-mail"
        />
      </div>
      <div className="Register__form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="Register__input"
          placeholder="Senha"
        />
      </div>
      <div className="Register__form-group">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="Register__input"
          placeholder="Confirmar Senha"
        />
      </div>
      <div className="Register__form-buttons">
        <button type="button" onClick={next} className="Register__button">
          Próximo
        </button>
        <button type="button" onClick={back} className="Register__button">
          Voltar
        </button>
      </div>
    </>
  );
};

export default Etapa2;
