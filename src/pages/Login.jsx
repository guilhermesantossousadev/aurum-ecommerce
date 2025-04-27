import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/userSlice"; // Certo agora
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://localhost:7081/api/Usuario/LoginUsuario?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const user = await response.json();
      
      dispatch(login(user)); // Atualiza o Redux e localStorage

      setSuccess(`Login realizado com sucesso! Bem-vindo, ${user.nome}`);
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <div className="Login__container">
        <h1 className="Login__title">Login</h1>

        {error && <div className="Login__error">{error}</div>}
        {success && <div className="Login__success">{success}</div>}

        <form className="Login__form" onSubmit={handleSubmit}>
          <input
            className="Login__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="Login__input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="Login__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="Login__links">
          <Link to="/register" className="Login__link">
            Não tem uma conta? Cadastre-se
          </Link>
          <Link to="/token-authentication" className="Login__link">
            Esqueceu sua senha? Redefina aqui
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
