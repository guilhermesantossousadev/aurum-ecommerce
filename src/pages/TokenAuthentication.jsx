import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import SetaPretaEsquerda from "../images/Setas/SetaPretaEsquerda.png";

import "../styles/pages/TokenAuthentication.css";

const TokenAuthentication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/RequestToken?email=${formData.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Token enviado para seu email!");
      setStep(2);
    } catch {
      toast.error("Não foi possível enviar o token. Verifique o email e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/AuthenticateToken?codigoToken=${formData.token}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error();

      toast.success("Token verificado com sucesso!");
      setStep(3);
    } catch {
      toast.error("Token inválido ou expirado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Usuario/ResetPassword?email=${formData.email}&password=${formData.newPassword}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      toast.error("Não foi possível redefinir a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="TokenAuth">
      <Toaster position="top-right" richColors />
      <div
        className="return__token"
        onClick={() => {
          if (step === 1) navigate("/login");
          else setStep(step - 1);
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={SetaPretaEsquerda} alt="Voltar" />
        Voltar
      </div>

      <div className="TokenAuth__container">
        <h1 className="TokenAuth__title">Redefinição de Senha</h1>

        <div className="TokenAuth__step">
          {step === 1 && "Solicite o token de redefinição"}
          {step === 2 && "Digite o token recebido no seu E-mail"}
          {step === 3 && "Crie sua nova senha"}
        </div>

        {step === 1 && (
          <form className="TokenAuth__form" onSubmit={handleRequestToken}>
            <input
              className="TokenAuth__input"
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button className="TokenAuth__button" type="submit" disabled={isLoading}>
              {isLoading ? <span className="loading-spinner-token"></span> : "Solicitar Token"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="TokenAuth__form" onSubmit={handleVerifyToken}>
            <input
              className="TokenAuth__input"
              type="text"
              name="token"
              placeholder="Digite o token recebido"
              value={formData.token}
              onChange={handleChange}
              required
            />
            <button className="TokenAuth__button" type="submit" disabled={isLoading}>
              {isLoading ? <span className="loading-spinner-token"></span> : "Verificar Token"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="TokenAuth__form" onSubmit={handleResetPassword}>
            <div className="TokenAuth__input-wrapper">
              <input
                className="TokenAuth__input"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Nova senha"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <span
                className="TokenAuth__eye"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>


            <div className="TokenAuth__input-wrapper">
              <input
                className="TokenAuth__input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirme a nova senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="TokenAuth__eye"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="TokenAuth__button" type="submit" disabled={isLoading}>
              {isLoading ? <span className="loading-spinner-token"></span> : "Redefinir Senha"}
            </button>
          </form>
        )}

        <div className="TokenAuth__links">
          <Link to="/login" className="TokenAuth__link">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TokenAuthentication;
