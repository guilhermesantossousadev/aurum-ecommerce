import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/userSlice";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/pages/Login.css";
import loginvideo from "../images/videos/login.mp4";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        setTimeout(() => navigate("/"), 500);
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
        <video autoPlay muted loop width="100%">
          <source src={loginvideo} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      </div>
      <div className="Login__rigth">
        <div className="Login__container">
          <h1 className="Login__title">Login</h1>

          <form className="Login__form" onSubmit={handleSubmit}>
            <input
              className="Login__input"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="Login__input-container">
              <input
                className="Login__input"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <button
              className="Login__button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner-login"></span>
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="Login__links">
            <Link to="/register" className="Login__link left">
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
