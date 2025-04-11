import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../store/userSlice";
import "../styles/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Nome, setNome] = useState("");
  const [Idade, setIdade] = useState("");
  const [Cpf, setCpf] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      nome: Nome,
      idade: Idade,
      cpf: Cpf,
      email: Email,
      password: Password,
    };

    try {
      const req = await fetch(
        "https://localhost:7081/api/Usuario/PostUsuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!req.ok) {
        throw new Error("Falha no cadastro. Verifique suas credenciais.");
      }

      const user = await req.json();

      dispatch(login(user)); // Atualiza o Redux e o localStorage
      navigate("/vision");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="Register">
      <form onSubmit={handleRegister}>
        <h2>Cadastre-se</h2>
        <input
          type="text" // Alterado para tipo de entrada "cpf" para validação
          value={Cpf}
          onChange={(e) => setCpf(e.target.value)} // Corrigido para cpf
          placeholder="Cpf"
        />
        <input
          type="number" // Alterado para tipo de entrada "idade" para validação
          value={Idade}
          onChange={(e) => setIdade(e.target.value)} // Corrigido para Idade
          placeholder="Idade"
        />

        <input
          type="text" // Alterado para tipo de entrada "nome" para validação
          value={Nome}
          onChange={(e) => setNome(e.target.value)} // Corrigido para Nome
          placeholder="Nome"
        />
        <input
          type="email" // Alterado para tipo de entrada "email" para validação
          value={Email}
          onChange={(e) => setEmail(e.target.value)} // Corrigido para Email
          placeholder="Email"
        />
        <input
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)} // Corrigido para Password
          placeholder="Password"
        />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/login">Já tem uma conta? Faça login</Link>
    </div>
  );
};

export default Register;
