import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

import { login } from "../store/userSlice";
import Etapa1 from "../components/EtapasRegister/Etapa1";
import Etapa2 from "../components/EtapasRegister/Etapa2";
import Etapa3 from "../components/EtapasRegister/Etapa3";
import Etapa4 from "../components/EtapasRegister/Etapa4"; // ✅ importado
import ConfirmacaoToken from "../components/EtapasRegister/ConfirmacaoToken";

import "../styles/pages/Register.css";
import registervideo from "../images/videos/register.mp4";
import SetaPretaEsquerda from "../images/Setas/SetaPretaEsquerda.png"

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
  const [complemento, setComplemento] = useState(""); // ✅
  const [enderecoFormatado, setEnderecoFormatado] = useState(""); // ✅

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

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarFormulario = () => {
    if (
      !nome ||
      !cpf ||
      !idade ||
      !email ||
      !password ||
      !confirmPassword ||
      !cep ||
      !numero
    ) {
      toast.error("Todos os campos são obrigatórios.");
      return false;
    }
    if (!validarCPF(cpf)) {
      toast.error("CPF inválido.");
      return false;
    }
    const idadeInt = parseInt(idade, 10);
    if (isNaN(idadeInt) || idadeInt < 10 || idadeInt > 120) {
      toast.error("Idade inválida.");
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("E-mail inválido.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return false;
    }
    if (!/^\d{8}$/.test(cep.replace(/\D/g, ""))) {
      toast.error("CEP inválido.");
      return false;
    }
    return true;
  };

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
    const cepLimpo = cep.replace(/\D/g, "");
    if (!/^\d{8}$/.test(cepLimpo)) return null;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP.");
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return null;
      }

      return data;
    } catch {
      toast.error("Erro ao buscar CEP. Verifique sua conexão.");
      return null;
    }
  };


  const handleRequestToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validarFormulario()) {
      setIsLoading(false);
      return;
    }

    const cepData = await searchCEP();

    if (!cepData) {
      setIsLoading(false);
      return; // Não avança se CEP inválido ou não encontrado
    }

    const enderecoCompleto = `${cepData.logradouro || ""} Nº ${numero}, ${cepData.bairro || ""}, ${cepData.localidade || ""}, ${cepData.uf || ""}, ${cepData.cep || ""}`;

    setEnderecoFormatado(enderecoCompleto);
    setSubStep(4);
    setIsLoading(false);
  };


  const solicitarTokenPosEndereco = async () => {
    setIsLoading(true);

    const data = {
      nome,
      cpf: cpf.replace(/[^\d]/g, ""),
      idade: parseInt(idade) || 0,
      email,
      password,
      cep: cep.replace(/[^\d]/g, ""),
      numero,
      complemento,
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
        )}`,
        { method: "GET" }
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

      const result = await resCreate.json();

      if (!resCreate.ok) {
        throw new Error(result.message || "Erro ao criar conta");
      }

      toast.success("Conta criada com sucesso!");
      dispatch(login(result));
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Erro inesperado ao cadastrar");
    } finally {
      setIsLoading(false);
    }
  };

  const corrigirEndereco = () => {
    setEnderecoFormatado("");
    setSubStep(3);
  };

  const validarEtapa1 = () => {
    if (!nome.trim() || !cpf.trim() || !idade.trim()) {
      toast.error("Preencha nome, CPF e idade.");
      return false;
    }
    if (!validarCPF(cpf)) {
      toast.error("CPF inválido.");
      return false;
    }
    const idadeInt = parseInt(idade, 10);
    if (isNaN(idadeInt) || idadeInt < 10 || idadeInt > 120) {
      toast.error("Idade inválida.");
      return false;
    }
    return true;
  };

  const validarEtapa2 = () => {
    if (!email.trim() || !password || !confirmPassword) {
      toast.error("Preencha e-mail e senha.");
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("E-mail inválido.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return false;
    }
    return true;
  };

  const validarEtapa3 = () => {

    if (!cepLimpo || !numero.trim()) {
      toast.error("Preencha o CEP e o número.");
      return false;
    }
    if (!/^\d{8}$/.test(cepLimpo)) {
      toast.error("CEP inválido. Deve conter 8 números.");
      return false;
    }
    return true;
  };


  return (
    <div className="Register">
      {step === 1 && (
        <div className="Register__left">
          <div className="Register__container">
            <h1 className="Register__title">Cadastro</h1>
            <form className="Register__form" onSubmit={handleRequestToken}>
              {subStep === 1 && (
                <Etapa1
                  nome={nome}
                  setNome={setNome}
                  cpf={cpf}
                  setCpf={setCpf}
                  idade={idade}
                  setIdade={setIdade}
                  validarCPF={validarCPF}
                  next={() => validarEtapa1() && setSubStep(2)}
                />
              )}

              {subStep === 2 && (
                <Etapa2
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  checkEmailExists={checkEmailExists}
                  next={() => validarEtapa2() && setSubStep(3)}
                  back={() => setSubStep(1)}
                />
              )}

              {subStep === 3 && (
                <>
                  <Etapa3
                    cep={cep}
                    setCep={setCep}
                    numero={numero}
                    setNumero={setNumero}
                    isLoading={isLoading}
                    back={() => setSubStep(2)}
                  />
                  <button
                    className="Register__button"
                    type="submit"
                    disabled={isLoading}
                    onClick={(e) => {
                      if (!validarEtapa3()) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLoading ? "Carregando..." : "Verificar Endereço"}
                  </button>
                </>
              )}

              {subStep === 4 && (
                <Etapa4
                  complemento={complemento}
                  setComplemento={setComplemento}
                  enderecoFormatado={enderecoFormatado}
                  next={solicitarTokenPosEndereco}
                  back={() => setSubStep(3)}
                  corrigirEndereco={corrigirEndereco}
                  isLoading={isLoading}
                />
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
        <ConfirmacaoToken
          token={token}
          setToken={setToken}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
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
