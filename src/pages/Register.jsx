import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { login } from "../store/userSlice";
import { toast } from "react-toastify";

import "../styles/pages/Register.css";
import testimg from "../images/Carreiras/carreirasimg.jpeg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [token, setToken] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkEmailExists = async () => {
    if (!email) return;
    const response = await fetch(
      `https://marketplacejoias-api-latest.onrender.com/api/Suport/ExistenceAuthenticationEmail?email=${encodeURIComponent(
        email
      )}`
    );
    const result = await response.text();
    if (!response.ok) {
      toast.error(result);
    } else {
      toast.success("E-mail disponível!");
    }
  };

  const searchCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP.");
      return await response.json();
    } catch {
      return null;
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if ((resto > 9 ? 0 : resto) !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    return (resto > 9 ? 0 : resto) === parseInt(cpf.charAt(10));
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
    if (formattedCpf.length === 14 && !validarCPF(formattedCpf)) {
      toast.error("CPF inválido");
    }
  };

  const handleRequestToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    const cepData = await searchCEP();
    const enderecoFormatado = cepData
      ? `${cepData?.logradouro || ""} Nº ${numero}, ${cepData?.bairro || ""}, ${
          cepData?.localidade || ""
        }, ${cepData?.uf || ""}, ${cepData?.cep || ""}`
      : "Endereço não encontrado";

    const data = {
      nome,
      cpf: cpf.replace(/[^\d]/g, ""),
      idade: parseInt(idade) || 0,
      email,
      password,
      cep: cep.replace(/[^\d]/g, ""),
      numero,
      complemento: "",
      endereco: enderecoFormatado,
    };

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/RequestTokenAuth?email=${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Erro ao solicitar token.");
      toast.success("Token enviado para seu e-mail.");
      setUsuario(data);
      setStep(2);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/AuthenticateToken?codigoToken=${encodeURIComponent(
          token
        )}`
      );

      if (!response.ok) {
        toast.error("Token inválido ou expirado.");
        setStep(1);
        return;
      }

      const resCreate = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Usuario/PostUsuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (!resCreate.ok) {
        const errorData = await resCreate.json();
        throw new Error(errorData.message || "Erro ao criar conta");
      }

      const user = await resCreate.json();
      toast.success("Conta criada com sucesso!");
      dispatch(login(user));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Register">
      {step === 1 && (
        <div className="Register__left">
          <div className="Register__container">
            <h1 className="Register__title">Cadastro</h1>
            <form className="Register__form" onSubmit={handleRequestToken}>
              <div className="Register__form__item__container">
                <div className="Register__form__item">
                  <div className="Register__form-group">
                    <label>Nome Completo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      className="Register__input"
                    />
                  </div>
                  <div className="Register__form-group">
                    <label>E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={checkEmailExists}
                      required
                      className="Register__input"
                    />
                  </div>
                  <div className="Register__form-group">
                    <label>Senha</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="Register__input"
                    />
                  </div>
                  <div className="Register__form-group">
                    <label>Confirmar Senha</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="Register__input"
                    />
                  </div>
                </div>
                <div className="Register__form__item">
                  <div className="Register__form-group">
                    <label>CPF</label>
                    <input
                      type="text"
                      value={cpf}
                      onChange={handleCpfChange}
                      required
                      className="Register__input"
                    />
                  </div>
                  <div className="Register__form-group">
                    <label>Idade</label>
                    <input
                      type="number"
                      value={idade}
                      onChange={(e) => setIdade(e.target.value)}
                      required
                      className="Register__input"
                    />
                  </div>
                  <div className="Register__form-group">
                    <label>CEP</label>
                    <input
                      type="text"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      maxLength={9}
                      required
                      className="Register__input"
                    />
                  </div>
                  <div className="Register__form-group">
                    <label>Número</label>
                    <input
                      type="text"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                      className="Register__input"
                    />
                  </div>
                </div>
              </div>
              <button
                className="Register__button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Validar Email"}
              </button>
            </form>
            <div className="Register__links">
              <Link to="/login" className="Register__link">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="Register__left">
          <div className="Register__container">
            <h1 className="Register__title">Confirme o Token</h1>
            <form className="Register__form" onSubmit={handleSubmit}>
              <div className="Register__form__item__container">
                <div className="Register__form-group">
                  <label>Token</label>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    className="Register__input"
                  />
                </div>
              </div>
              <button
                className="Register__button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Validando..." : "Validar"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="Register__rigth">
        <img src={testimg} alt="Cadastro" className="Register__image" />
      </div>
    </div>
  );
};

export default Register;
