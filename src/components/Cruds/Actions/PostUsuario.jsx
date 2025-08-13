import React, { useState } from "react";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../../../styles/Cruds/Actions/PostUsuario.css"

const PostUsuario = ({ onSuccess }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Dados do usuário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [enderecoFormatado, setEnderecoFormatado] = useState("");
  const [token, setToken] = useState("");

  // Mostrar/ocultar senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validação CPF
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

  // Validação email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validação senha
  const validarSenha = (senha) => {
    const minLength = /.{6,}/;
    const maiuscula = /[A-Z]/;
    const minuscula = /[a-z]/;
    const numero = /[0-9]/;
    const especial = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(senha)) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    if (!maiuscula.test(senha)) {
      toast.error("A senha deve conter ao menos uma letra maiúscula.");
      return false;
    }
    if (!minuscula.test(senha)) {
      toast.error("A senha deve conter ao menos uma letra minúscula.");
      return false;
    }
    if (!numero.test(senha)) {
      toast.error("A senha deve conter ao menos um número.");
      return false;
    }
    if (!especial.test(senha)) {
      toast.error("A senha deve conter ao menos um caractere especial.");
      return false;
    }
    return true;
  };

  // Validações por etapa
  const validarEtapa1 = () => {
    if (!nome.trim() || !cpf.trim() || !idade.trim()) {
      toast.error("Preencha nome, CPF e idade.");
      return false;
    }
    if (nome.length < 7) {
      toast.error("O nome precisa conter mais de 6 caracteres.");
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

  const checkEmailExists = async () => {
    if (!email) return false; // vazio, não verifica

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/ExistenceAuthenticationEmail?email=${encodeURIComponent(email)}`
      );

      if (response.status === 409) {
        toast.error("E-mail já está em uso.");
        return false;
      }

      if (response.status === 200) {
        toast.success("E-mail disponível!");
        return true;
      }

      toast.error("Erro ao verificar e-mail.");
      return false;
    } catch (error) {
      toast.error("Erro ao verificar e-mail.");
      return false;
    }
  };

  const handleEmailBlur = async () => {
    if (email.trim()) {
      await checkEmailExists();
    }
  };

  const validarEtapa2 = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      toast.error("Preencha e-mail e senha.");
      return false;
    }
    if (!isValidEmail(email)) {
      toast.error("E-mail inválido.");
      return false;
    }
    // Verifica se email existe
    const emailDisponivel = await checkEmailExists();
    if (!emailDisponivel) {
      // já mostra toast dentro da função
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return false;
    }
    if (!validarSenha(password)) {
      return false;
    }
    return true;
  };

  const validarEtapa3 = () => {
    const cepLimpo = cep.replace(/\D/g, "");
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

  // Buscar endereço pelo CEP
  const buscarEndereco = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      if (!res.ok) throw new Error("Erro ao buscar CEP");
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado.");
        setLoading(false);
        return false;
      }
      setEnderecoFormatado(
        `${data.logradouro || ""} Nº ${numero}, ${data.bairro || ""}, ${data.localidade || ""}, ${data.uf || ""}, ${data.cep || ""}`
      );
      setLoading(false);
      return true;
    } catch (error) {
      toast.error(error.message || "Erro ao buscar CEP.");
      setLoading(false);
      return false;
    }
  };

  // Solicitar token para e-mail
  const solicitarToken = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/RequestTokenAuth?email=${encodeURIComponent(email)}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Erro ao solicitar token");
      toast.success("Token enviado para seu e-mail.");
      setLoading(false);
      return true;
    } catch (error) {
      toast.error(error.message || "Erro ao solicitar token.");
      setLoading(false);
      return false;
    }
  };

  // Validar token
  const validarToken = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/AuthenticateToken?codigoToken=${token}`
      );
      if (!res.ok) throw new Error("Erro ao validar token");
      const text = await res.text();
      setLoading(false);
      if (text === "true") {
        toast.success("Token validado com sucesso!");
        return true;
      } else {
        toast.error("Token inválido ou expirado.");
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Erro ao validar token.");
      setLoading(false);
      return false;
    }
  };

  // Criar usuário no backend
  const criarUsuario = async () => {
    setLoading(true);
    try {
      const usuario = {
        nome,
        cpf: cpf.replace(/[^\d]/g, ""),
        idade: parseInt(idade, 10),
        email,
        password,
        cep: cep.replace(/\D/g, ""),
        numero: parseInt(numero, 10),
        complemento,
        endereco: enderecoFormatado,
      };

      const res = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Usuario/PostUsuario",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const errorMsg = errorData?.message || "Erro ao criar conta";
        throw new Error(errorMsg);
      }

      toast.success("Conta criada com sucesso!");
      setLoading(false);
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      toast.error(error.message || "Erro inesperado ao cadastrar.");
      setLoading(false);
      return false;
    }
  };

  // Avançar etapas
  const nextStep = async () => {
    switch (step) {
      case 1:
        if (validarEtapa1()) setStep(2);
        break;
      case 2:
        if (await validarEtapa2()) setStep(3);
        break;
      case 3:
        if (validarEtapa3()) {
          const ok = await buscarEndereco();
          if (ok) setStep(4);
        }
        break;
      case 4:
        const tokenSolicitado = await solicitarToken();
        if (tokenSolicitado) setStep(5);
        break;
      case 5:
        const tokenValido = await validarToken();
        if (tokenValido) {
          const criado = await criarUsuario();
          if (criado) setStep(6);
        }
        break;
      default:
        break;
    }
  };


  // Voltar etapa
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Corrigir endereço volta para etapa 3
  const corrigirEndereco = () => {
    setStep(3);
  };

  // Handle submit token no form
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const formatCep = (value) => {
    // Remove tudo que não for número
    const onlyNums = value.replace(/\D/g, "");

    // Aplica máscara 99999-999
    if (onlyNums.length <= 5) return onlyNums;
    return onlyNums.slice(0, 5) + "-" + onlyNums.slice(5, 8);
  };

  return (
    <div className="PostUsuario">
      <h2 style={{ paddingBottom: "1rem" }}>Cadastro</h2>
      {step === 1 && (
        <>
          <div className="progress-bar-post" style={{ maxWidth: "400px" }}>
            <div className="progress" style={{ width: "20%" }} />
          </div>

          <div className="PostUsuario__form-group">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="PostUsuario__input"
              placeholder="Nome Completo"
            />
          </div>
          <div className="PostUsuario__form-group">
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              className="PostUsuario__input"
              placeholder="CPF"
              maxLength={14}
            />
          </div>
          <div className="PostUsuario__form-group">
            <input
              type="text"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
              className="PostUsuario__input"
              placeholder="Idade"
              maxLength={3}
            />
          </div>
          <button onClick={nextStep} disabled={loading} className="PostUsuario__button">
            {loading ? <div className="loading-spinner-PostUsuario" /> : "Próximo"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="progress-bar-post" style={{ maxWidth: "400px" }}>
            <div className="progress" style={{ width: "40%" }} />
          </div>
          <div className="PostUsuario__form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              required
              className="PostUsuario__input"
              placeholder="E-mail"
            />
          </div>
          <div className="PostUsuario__form-group">
            <div className="PostUsuario__input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="PostUsuario__input"
                placeholder="Senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="PostUsuario__input-btn"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="PostUsuario__form-group">
            <div className="PostUsuario__input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="PostUsuario__input"
                placeholder="Confirmar Senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="PostUsuario__input-btn"
                aria-label={showConfirmPassword ? "Esconder confirmação de senha" : "Mostrar confirmação de senha"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="PostUsuario__form-buttons">
            <button onClick={prevStep} disabled={loading} className="PostUsuario__button">
              Voltar
            </button>
            <button onClick={nextStep} disabled={loading} className="PostUsuario__button">
              {loading ? <div className="loading-spinner-PostUsuario" /> : "Próximo"}
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="progress-bar-post" style={{ maxWidth: "400px" }}>
            <div className="progress" style={{ width: "60%" }} />
          </div>
          <div className="PostUsuario__form-group">
            <input
              type="text"
              placeholder="CEP"
              value={cep}
              onChange={(e) => {
                const formatted = formatCep(e.target.value);
                setCep(formatted);
              }}
              maxLength={9}
              className="PostUsuario__input"
            />
          </div>
          <div className="PostUsuario__form-group">
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
              className="PostUsuario__input"
              placeholder="Número"
            />
          </div>
          <div className="PostUsuario__form-buttons">
            <button onClick={prevStep} disabled={loading} className="PostUsuario__button">
              Voltar
            </button>
            <button onClick={nextStep} disabled={loading} className="PostUsuario__button">
              {loading ? <div className="loading-spinner-PostUsuario" /> : "Verificar Endereço"}
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="progress-bar-post" style={{ maxWidth: "400px" }}>
            <div className="progress" style={{ width: "80%" }} />
          </div>
          <h2 className="PostUsuario__title">Confirme seu endereço</h2>
          <p className="PostUsuario__text">{enderecoFormatado}</p>
          <div className="PostUsuario__form-group">
            <input
              type="text"
              placeholder="Complemento (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              className="PostUsuario__input"
            />
          </div>
          <div className="PostUsuario__form-buttons">
            <button
              type="button"
              onClick={corrigirEndereco}
              className="PostUsuario__button PostUsuario__button--secondary"
              disabled={loading}
            >
              Corrigir Endereço
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="PostUsuario__button"
              disabled={loading || !enderecoFormatado}
            >
              {loading ? <div className="loading-spinner-PostUsuario" /> : "Enviar Token"}
            </button>
            <button onClick={prevStep} disabled={loading} className="PostUsuario__button">
              Voltar
            </button>
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <div className="progress-bar-post" style={{ maxWidth: "400px" }}>
            <div className="progress" style={{ width: "100%" }} />
          </div>
          <h1 className="PostUsuario__title">Confirme o Token</h1>
          <p>Digite o token recebido no seu E-mail</p>
          <form className="PostUsuario__form" onSubmit={handleSubmit}>
            <div className="PostUsuario__form-group">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="PostUsuario__input"
              />
            </div>

          </form>
          <div className="PostUsuario__form-buttons">
            <button onClick={prevStep} disabled={loading} className="PostUsuario__button">
              Voltar
            </button>
            <button
              onClick={nextStep}
              disabled={loading || !token}
              className="PostUsuario__button"
            >
              {loading ? <div className="loading-spinner-PostUsuario" /> : "Validar"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostUsuario;
