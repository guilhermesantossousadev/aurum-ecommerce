import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/TokenAuthentication.css";

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
        `https://localhost:7081/api/Suport/RequestToken?email=${formData.email}`,
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

      setSuccess("Token enviado para seu email!");
      setStep(2);
    } catch (error) {
      setError(
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
        `https://localhost:7081/api/Suport/AuthenticateToken?codigoToken=${formData.token}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Token inválido");
      }

      setSuccess("Token verificado com sucesso!");
      setStep(3);
    } catch (error) {
      setError("Token inválido ou expirado. Tente novamente.");
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
        "https://localhost:7081/api/Usuario/ResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            token: formData.token,
            newPassword: formData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao redefinir senha");
      }

      setSuccess("Senha redefinida com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError("Não foi possível redefinir a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="TokenAuth">
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
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button
              className="TokenAuth__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Solicitar Token"}
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
              {isLoading ? "Verificando..." : "Verificar Token"}
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
              {isLoading ? "Redefinindo..." : "Redefinir Senha"}
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
