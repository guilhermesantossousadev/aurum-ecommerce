import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/userSlice";
import { toast } from "react-toastify";

import "../styles/pages/Login.css";
import testimg from "../images/Carreiras/carreirasimg.jpeg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Usuario/LoginUsuario?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const user = await response.json();

      dispatch(login(user));

      if (user.isAdmin) {
        toast.success(
          `Login realizado com sucesso! Bem-vindo Admin, ${user.nome}`
        );
        setTimeout(() => navigate("/adminPage"), 1500);
      } else {
        toast.success(`Login realizado com sucesso! Bem-vindo, ${user.nome}`);
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Email ou senha incorretos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <div className="Login__left">
        <img src={testimg} alt="Login" />
      </div>
      <div className="Login__rigth">
        <div className="Login__container">
          
          <h1 className="Login__title">Login</h1>

          <form className="Login__form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className="Login__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha</label>
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
              Redefina sua senha
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
