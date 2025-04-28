import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/userSlice"; // Certo agora
import "../styles/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [focus, setFocus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP.");
      } else {
        setFocus("numero");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return null;
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto > 9 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    const cepData = await searchCEP();

    const enderecoFormatado = cepData
      ? `${cepData.logradouro} Nº ${numero}, ${cepData.bairro}, ${cepData.localidade}, ${cepData.uf}, ${cepData.cep}`
      : "Endereço não encontrado";

    const data = {
      nome: nome,
      cpf: cpf.replace(/[^\d]/g, ""),
      idade: parseInt(idade) || 0,
      email: email,
      password: password,
      cep: cep.replace(/[^\d]/g, ""),
      numero: parseInt(numero) || 0,
      complemento: "",
      endereco: enderecoFormatado,
    };

    try {
      const response = await fetch(
        "https://localhost:7081/api/Usuario/PostUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar conta");
      }

      const user = await response.json();
      setSuccess("Conta criada com sucesso!");

      dispatch(login(user)); // Atualiza o Redux e localStorage

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(
        error.message || "Não foi possível criar sua conta. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Register">
      <div className="Register__container">
        <h1 className="Register__title">Criar Conta</h1>

        {error && <div className="Register__error">{error}</div>}
        {success && <div className="Register__success">{success}</div>}
        {cpfError && <div className="Register__error">{cpfError}</div>}

        <form className="Register__form" onSubmit={handleSubmit}>
          <input
            className="Register__input"
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className="Register__input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="Register__input"
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="Register__input"
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            className="Register__input"
            type="text"
            name="cpf"
            placeholder="CPF"
            value={cpf}
            onChange={handleCpfChange}
            required
          />
          <input
            className="Register__input"
            type="text"
            name="cep"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
          <input
            className="Register__input"
            type="text"
            name="numero"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <button
            className="Register__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <div className="Register__links">
          <Link to="/login" className="Register__link">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
