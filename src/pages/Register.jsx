import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../store/userSlice";
import { toast } from "react-toastify";

import "../styles/pages/Register.css";

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
  const [isLoading, setIsLoading] = useState(false);

  const searchCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP.");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      return null;
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto > 9 ? 0 : resto;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto > 9 ? 0 : resto;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;

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
        toast.error("CPF inválido");
      } else {
      }
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    const cepData = await searchCEP();
    const enderecoFormatado = cepData
      ? `${cepData.logradouro} Nº ${numero}, ${cepData.bairro}, ${cepData.localidade}, ${cepData.uf}, ${cepData.cep}`
      : "Endereço não encontrado";

    const data = {
      nome,
      cpf: cpf.replace(/[^\d]/g, ""),
      idade: parseInt(idade) || 0,
      email,
      password,
      cep: cep.replace(/[^\d]/g, ""),
      numero: numero,
      complemento: "",
      endereco: enderecoFormatado,
    };

    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Usuario/PostUsuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao criar conta");
      }

      const user = await response.json();
      toast.success("Conta criada com sucesso!");
      dispatch(login(user));
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error(error.message || "Não foi possível criar sua conta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Register">
      <div className="Register__container">
        <div className="Register__container__left">
          <div className="Register__container__left__top">
            <h1 className="Register__title">Cadastro</h1>
          </div>

          <div className="Register__container__left__middle">
            <form className="Register__form" onSubmit={handleSubmit}>
              <div className="Register__grid">
                <div className="Register__form-group">
                  <label htmlFor="nome">Nome completo</label>
                  <input
                    className="Register__input"
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="Register__input"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    className="Register__input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input
                    className="Register__input"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    className="Register__input"
                    type="text"
                    name="cpf"
                    value={cpf}
                    onChange={handleCpfChange}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="idade">Idade</label>
                  <input
                    className="Register__input"
                    type="number"
                    name="idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="cep">CEP</label>
                  <input
                    className="Register__input"
                    type="text"
                    name="cep"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9}
                    required
                  />
                </div>

                <div className="Register__form-group">
                  <label htmlFor="numero">Número</label>
                  <input
                    className="Register__input"
                    type="text"
                    name="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                className="Register__button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </button>
            </form>
          </div>

          <div className="Register__container__left__bottom">
            <div className="Register__links">
              <Link to="/login" className="Register__link">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </div>
        </div>
        <div className="Register__container__rigth">
          <img src={testimg} alt="Cadastro" className="Register__image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
