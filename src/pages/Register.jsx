import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../store/userSlice";
import "../styles/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");

  const searchCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return null; // Retorna null em caso de erro
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const cepData = await searchCEP();

    const enderecoFormatado = cepData
      ? `${cepData.logradouro} Nº ${numero}, ${cepData.bairro}, ${cepData.localidade}, ${cepData.uf}, ${cepData.cep}`
      : "Endereço não encontrado";

    const data = {
      nome,
      cpf,
      idade,
      email,
      password,
      cep,
      numero,
      endereco: enderecoFormatado,
    };

    try {
      const response = await fetch(
        "https://localhost:7081/api/Usuario/PostUsuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Falha no cadastro. Verifique os dados.");
      }

      const user = await response.json();

      dispatch(login(user));
      navigate("/");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <div className="Register">
      <form onSubmit={handleRegister}>
        <h2>Cadastre-se</h2>

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />

        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />

        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="CEP"
        />

        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Número"
        />

        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/login">Já tem uma conta? Faça login</Link>
    </div>
  );
};

export default Register;
