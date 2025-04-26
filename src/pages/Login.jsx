import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const req = await fetch(
        `https://localhost:7081/api/Usuario/LoginUsuario?email=${Email}&password=${Password}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!req.ok) {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }

      const user = await req.json();
      alert(`Usuario logado com sucesso, Bem-Vindo ${user.nome}`);

      dispatch(login(user)); // Atualiza o Redux e o localStorage
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Email ou senha incorretos. Por favor, tente novamente.");
    }
  };

  return (
    <div className="Auth">
      <div className="Auth__container">
        <h2 className="Auth__title">Login</h2>
        <form className="Auth__form" onSubmit={handleLogin}>
          <input
            className="Auth__input"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="Auth__input"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          {error && <p className="Auth__error">{error}</p>}
          <button className="Auth__button" type="submit">
            Entrar
          </button>
        </form>
        <Link to="/register" className="Auth__link">
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default Login;
