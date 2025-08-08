import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setError("");
    setSuccess("");

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

      if (!response.ok) {
        throw new Error("Erro ao solicitar token");
      }
      toast.success("Token enviado para seu email!");
      setStep(2);
    } catch (error) {
      toast.error(
        "Não foi possível enviar o token. Verifique o email e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/AuthenticateToken?codigoToken=${formData.token}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Token inválido");
      }

      toast.success("Token verificado com sucesso!");
      setStep(3);
    } catch (error) {
      toast.error("Token inválido ou expirado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Usuario/ResetPassword?email=${formData.email}&password=${formData.newPassword}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao redefinir senha");
      }

      toast.success("Senha redefinida com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error("Não foi possível redefinir a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="TokenAuth">
      <div
        className="return__token"
        onClick={() => {
          if (step === 1) {
            navigate("/login");
          } else if (step === 2) {
            setStep(1);
          } else if (step === 3) {
            setStep(2);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={SetaPretaEsquerda} alt="Voltar" />
        {step === 1 && "Voltar"}
        {step === 2 && "Voltar"}
        {step === 3 && "Voltar"}
      </div>

      <div className="TokenAuth__container">
        <h1 className="TokenAuth__title">Redefinição de Senha</h1>

        {error && <div className="TokenAuth__error">{error}</div>}
        {success && <div className="TokenAuth__success">{success}</div>}

        <div className="TokenAuth__step">
          {step === 1 && "Solicite o token de redefinição"}
          {step === 2 && "Digite o token recebido"}
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
            <button
              className="TokenAuth__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner-token"></span>
              ) : (
                "Solicitar Token"
              )}
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
            <button
              className="TokenAuth__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner-token"></span>
              ) : (
                "Verificar Token"
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="TokenAuth__form" onSubmit={handleResetPassword}>
            <input
              className="TokenAuth__input"
              type="password"
              name="newPassword"
              placeholder="Nova senha"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <input
              className="TokenAuth__input"
              type="password"
              name="confirmPassword"
              placeholder="Confirme a nova senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              className="TokenAuth__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner-token"></span>
              ) : (
                "Redefinir Senha"
              )}
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
