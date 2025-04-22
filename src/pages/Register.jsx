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
  const [cpfError, setCpfError] = useState("");
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

  const validarCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, "");

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto > 9 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto > 9 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };

  const handleCpfChange = (e) => {
    const value = e.target.value;
    // Formata o CPF enquanto digita
    const formattedCpf = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");

    setCpf(formattedCpf);

    if (formattedCpf.length === 14) {
      if (!validarCPF(formattedCpf)) {
        setCpfError("CPF inválido");
      } else {
        setCpfError("");
      }
    } else {
      setCpfError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (cpfError) {
      alert("Por favor, insira um CPF válido");
      return;
    }

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
          onChange={handleCpfChange}
          placeholder="CPF"
          maxLength={14}
        />
        {cpfError && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>{cpfError}</span>
        )}

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
