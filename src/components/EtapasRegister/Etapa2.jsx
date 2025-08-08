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
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="Register__input"
            placeholder="Senha"
            style={{ paddingRight: "40px" }} // espaço para o ícone
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "20%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: 0,
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="Register__form-group">
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="Register__input"
            placeholder="Confirmar Senha"
            style={{ paddingRight: "40px" }} // espaço para o ícone
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "20%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: 0,
            }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="Register__form-buttons">
        <button type="button" onClick={next} className="Register__button">
          Próximo
        </button>
      </div>
    </>
  );
};

export default Etapa2;
