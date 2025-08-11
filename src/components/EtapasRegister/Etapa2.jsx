import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../../styles/pages/Register.css";
import SetaPretaEsquerda from "../../images/Setas/SetaPretaEsquerda.png";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNext = () => {
    next();
  };

  return (
    <>
      <div
        className="return__register"
        onClick={back}
        style={{ cursor: "pointer" }}
      >
        <img src={SetaPretaEsquerda} alt="Voltar" />
        Voltar à etapa anterior
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: "50%" }} />
      </div>

      <div className="Register__form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => checkEmailExists(e.target.value)}
          required
          className="Register__input"
          placeholder="E-mail"
        />
      </div>

      <div className="Register__form-group">
        <div className="Register__input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="Register__input"
            placeholder="Senha"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="Register__input-btn"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="Register__form-group">
        <div className="Register__input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="Register__input"
            placeholder="Confirmar Senha"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="Register__input-btn"
            aria-label={
              showConfirmPassword
                ? "Esconder confirmação de senha"
                : "Mostrar confirmação de senha"
            }
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="Register__form-buttons">
        <button type="button" onClick={handleNext} className="Register__button">
          Próximo
        </button>
      </div>
    </>
  );
};

export default Etapa2;
