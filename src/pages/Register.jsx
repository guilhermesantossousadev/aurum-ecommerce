// Register.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { login } from "../store/userSlice";
import Etapa1 from "../components/EtapasRegister/Etapa1";
import Etapa2 from "../components/EtapasRegister/Etapa2";
import Etapa3 from "../components/EtapasRegister/Etapa3";
import ConfirmacaoToken from "../components/EtapasRegister/ConfirmacaoToken";

import "../styles/pages/Register.css";
import registervideo from "../images/videos/register.mp4";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
      ? `${cepData?.logradouro || ""} Nº ${numero}, ${cepData?.bairro || ""}, ${cepData?.localidade || ""}, ${cepData?.uf || ""}, ${cepData?.cep || ""}`
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
              {subStep === 1 && (
                <Etapa1 style={{ width: "100%", height: "100%" }} nome={nome} setNome={setNome} cpf={cpf} setCpf={setCpf} idade={idade} setIdade={setIdade} validarCPF={validarCPF} next={() => setSubStep(2)} />
              )}
              {subStep === 2 && (
                <Etapa2 email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} checkEmailExists={checkEmailExists} next={() => setSubStep(3)} back={() => setSubStep(1)} />
              )}
              {subStep === 3 && (
                <Etapa3 cep={cep} setCep={setCep} numero={numero} setNumero={setNumero} isLoading={isLoading} back={() => setSubStep(2)} />
              )}
              {subStep === 3 && (
                <button className="Register__button" type="submit" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Validar Email"}
                </button>
              )}
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
        <ConfirmacaoToken token={token} setToken={setToken} handleSubmit={handleSubmit} isLoading={isLoading} />
      )}

      <div className="Register__rigth">
        <video autoPlay muted loop width="100%">
          <source src={registervideo} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      </div>
    </div>
  );
};

export default Register;
