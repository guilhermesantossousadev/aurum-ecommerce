import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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

      dispatch(login(user)); // Atualiza o Redux e o localStorage
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/register">Não tem uma conta? Cadastre-se</Link>
    </div>
  );
};

export default Login;
