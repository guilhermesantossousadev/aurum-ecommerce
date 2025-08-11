import {
  FaPencilAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import formatCurrency from "../components/utils/formatCurrency";

import perfil from "../images/Common/perfil.png";
import xpgn from "../images/Common/x.png";

import "../styles/components/Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const [step, setStep] = useState(1);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [token, setToken] = useState("");
  const [isLoadingToken, setIsLoadingToken] = useState(false);

  const isEmailChanged = email.trim().toLowerCase() !== user.email.trim().toLowerCase();
  const [email, setEmail] = useState(user?.email || "");
  const [cpf, setCpf] = useState(user?.cpf || "");
  const [idade, setIdade] = useState(user?.idade || "");
  const [nome, setNome] = useState(user?.nome || "");

  const [password, setPassword] = useState("");
  const [cep, setCep] = useState(user?.cep || "");
  const [numero, setNumero] = useState(user?.numero || "");
  const [complemento, setComplemento] = useState(user?.complemento || "");

  const [profileImage, setProfileImage] = useState(user?.fotoPerfilURL || perfil);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [anuncios, setAnuncios] = useState([]);
  const [compras, setCompras] = useState([]);

  const inputFileRef = useRef(null);

  const [expandedCards, setExpandedCards] = useState([]);
  const toggleExpand = (id) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setStep(1);
    setToken("");
  };

  const handleSaveButtonClick = async () => {
    if (isEmailChanged) {
      // inicia o fluxo de token
      await solicitarToken();
    } else {
      // salva direto sem token
      try {
        setIsSaving(true);
        await updateUserData({
          nome,
          cpf,
          idade,
          email,
          cep,
          numero,
          complemento,
          password: password.trim() ? password : undefined,
        });
        toast.success("Perfil atualizado com sucesso!");
        closePopup();
      } catch (error) {
        toast.error("Erro ao atualizar perfil: " + error.message);
      } finally {
        setIsSaving(false);
      }
    }
  };


  const solicitarToken = async () => {
    setIsLoading(true);

    const data = {
      nome,
      cpf: cpf.replace(/[^\d]/g, ""),
      idade: parseInt(idade) || 0,
      email,
      password,
      cep: cep.replace(/[^\d]/g, ""),
      numero: parseInt(numero, 10),
      complemento,
      endereco: cepFormatado,
    };

    console.log("[solicitarToken ] Dados do usuário:", data);

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

  const checkToken = async (codigoToken) => {
    try {
      console.log(codigoToken);
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/AuthenticateToken?codigoToken=${codigoToken}`
      );

      const result = await response.text();

      if (!response.ok) {
        toast.error("Erro ao validar o token.");
        return false;
      }

      if (result === "true") {
        toast.success("Token validado com sucesso!");
        return true;
      } else {
        toast.error("Token inválido ou expirado.");
        return false;
      }
    } catch (error) {
      toast.error("Erro na requisição.");
      return false;
    }
  };


  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Buscar anúncios do usuário
  const GetAnuncios = async () => {
    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByUsuarioIdAnuncio?usuarioId=${user.id}`
      );
      if (!response.ok) throw new Error("Erro ao buscar anúncios.");
      const data = await response.json();
      setAnuncios(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Buscar compras do usuário
  const GetCompras = async () => {
    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Venda/GetByEmailVenda?email=${user.email}`
      );
      if (!response.ok) throw new Error("Erro ao buscar compras.");
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      GetAnuncios();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.email) {
      GetCompras();
    }
  }, [user?.email]);

  // Atualizar dados do usuário
  const updateUserData = async (updatedData) => {
    const data = { ...user, ...updatedData };
    try {
      const response = await fetch(
        "https://marketplacejoias-api-latest.onrender.com/api/Usuario/PutUsuario",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Erro ao atualizar o perfil.");
    } catch (error) {
      toast.error("Erro na atualização: " + error.message);
      throw error;
    }
  };

  // Upload da imagem de perfil
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);

      await handleUploadImage(file);
    }
  };

  const handleUploadImage = async (file) => {
    if (!file) return toast.error("Selecione uma imagem.");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("usuarioId", user.id);
    try {
      const res = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Usuario/UploadImageUsuario?usuarioId=${user.id}`,
        { method: "POST", body: formData }
      );
      if (!res.ok) throw new Error();
      toast.success("Imagem atualizada!");
      setSelectedFile(null);
    } catch {
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  };

  // Buscar endereço via CEP
  const searchCEP = async () => {
    try {
      if (!cep) return;

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP.");

      const cepData = await response.json();
      setcepFormatado(`${cepData.logradouro}, ${cepData.uf}`);
    } catch (e) {
      console.log(e);
      toast.error("Erro ao buscar CEP.");
    }
  };

  // Estado para mostrar endereço formatado via CEP
  const [cepFormatado, setcepFormatado] = useState("");

  // Salvar todos dados atualizados
  const handleSaveAll = async () => {
    const validators = {
      nome: nome.trim().length > 0,
      cpf: cpf.trim().length > 0,
      idade: /^\d+$/.test(idade) && parseInt(idade) > 0,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      cep: cep.trim().length > 0,
      numero: numero.toString().trim().length > 0,
    };

    if (!validators.nome) return toast.error("Nome inválido.");
    if (!validators.cpf) return toast.error("CPF inválido.");
    if (!validators.idade) return toast.error("Idade inválida.");
    if (!validators.email) return toast.error("E-mail inválido.");
    if (!validators.cep) return toast.error("CEP inválido.");
    if (!validators.numero) return toast.error("Número inválido.");

    const updatedData = {
      nome,
      cpf,
      idade,
      email,
      cep,
      numero,
      complemento,
    };

    if (password.trim()) {
      updatedData.password = password;
    }

    try {
      setIsSaving(true);
      await updateUserData(updatedData);
      toast.success("Perfil atualizado com sucesso!");
      closePopup();
    } catch (error) {
      toast.error("Erro ao atualizar perfil: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Formatar CPF para exibição
  function formatCPF(cpf) {
    if (!cpf) return "";
    const cleaned = cpf.replace(/\D/g, ""); // remove tudo que não é número
    if (cleaned.length !== 11) return cpf;
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // Verificar se e-mail já existe na base
  const checkEmailExists = async () => {
    if (!email) return true;

    if (email.trim().toLowerCase() === user.email.trim().toLowerCase()) {
      return true;
    }

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/ExistenceAuthenticationEmail?email=${encodeURIComponent(
          email
        )}`
      );

      if (response.status === 409) {
        toast.error("E-mail já está em uso.");
        return false;
      }
      if (response.status === 200) {
        return true;
      }
      toast.error("Erro ao verificar e-mail.");
      return false;
    } catch {
      toast.error("Erro ao verificar e-mail.");
      return false;
    }
  };

  // Função para parsear JSON seguro para info adicional da compra
  const parseInformacaoAdicional = (info) => {
    if (!info) return null;
    try {
      return JSON.parse(info);
    } catch {
      return null;
    }
  };

  // Traduzir status de compra
  function traduzirStatus(status) {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "pending":
        return "Pendente";
      case "in_process":
        return "Em processo";
      case "rejected":
        return "Rejeitado";
      case "cancelled":
        return "Cancelado";
      case "refunded":
        return "Reembolsado";
      case "charged_back":
        return "Contestação";
      case "not_carried_out":
        return "Não realizado";
      case null:
      case undefined:
        return "Sem status";
      default:
        return "Desconhecido";
    }
  }

  // Traduzir método pagamento
  function traduzirMetodo(metodoPagamento) {
    switch (metodoPagamento) {
      case "credit_card":
        return "Cartão de Crédito";
      case "debit_card":
        return "Cartão de Débito";
      case "account_money":
        return "Saldo (Mercado Pago)";
      case "bank_transfer":
        return "Transferência Bancária";
      case "ticket":
        return "Boleto";
      case null:
      case undefined:
        return "Sem status";
      default:
        return "Desconhecido";
    }
  }

  // Atualizar estados quando user muda
  useEffect(() => {
    setEmail(user?.email || "");
    setCpf(user?.cpf || "");
    setIdade(user?.idade || "");
    setNome(user?.nome || "");
    setCep(user?.cep || "");
    setNumero(user?.numero || "");
    setComplemento(user?.complemento || "");
    setProfileImage(user?.fotoPerfilURL || perfil);
  }, [user]);

  // Submit da confirmação do token (step 2)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token.trim()) {
      toast.error("Por favor, digite o token.");
      return;
    }

    setIsLoadingToken(true);

    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Suport/AuthenticateToken?codigoToken=${encodeURIComponent(
          token
        )}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Token inválido ou expirado.");
      }

      await handleSaveAll();

      toast.success("Token validado e perfil atualizado!");
      closePopup();
      setStep(1);
      setToken("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingToken(false);
    }
  };

  const handleSubmitToken = async (e) => {
    e.preventDefault();

    if (!token.trim()) {
      toast.error("Por favor, digite o token.");
      return;
    }

    setIsLoading(true);

    const valido = await checkToken(token);

    if (valido) {
      try {
        setIsSaving(true);
        await updateUserData(usuario);  // salva os dados guardados
        toast.success("Perfil atualizado com sucesso!");
        setIsPopupOpen(false);
        setStep(1);
        setToken("");
      } catch (error) {
        toast.error("Erro ao atualizar perfil: " + error.message);
      } finally {
        setIsSaving(false);
      }
    }

    setIsLoading(false);
  };

  function formatCep(value) {
    // Remove tudo que não for número
    const onlyNumbers = value.replace(/\D/g, "");

    // Aplica a máscara 00000-000
    if (onlyNumbers.length <= 5) return onlyNumbers;
    return onlyNumbers.slice(0, 5) + "-" + onlyNumbers.slice(5, 8);
  }


  return (
    <div className="Profile">
      <div className="Profile__Top"></div>
      <div className="Profile__Bottom">
        <div className="Profile__Box">
          <div
            className="Profile__Box__img"
            onClick={() => inputFileRef.current.click()}
            style={{ cursor: "pointer" }}
          >
            <img src={profileImage} alt="Foto" />
            <div className="Profile__Box__img__overlay">
              <FaPencilAlt size={30} color="#fff" />
            </div>
          </div>
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className="Profile__box__info">
            <div className="Profile__box__info__value">{user.nome}</div>

            <div className="Profile__box__info__value cep">{cepFormatado}</div>

            <div className="Profile__box__info__inside">
              <span>
                <strong> • E-mail:</strong> {user.email}
              </span>
              <span>
                <strong> • CPF:</strong> {formatCPF(user.cpf)}
              </span>
              <span>
                <strong> • Idade:</strong> {user.idade} Anos
              </span>
            </div>
          </div>

          <div className="Profile__buttons">
            <div className="Profile__buttons__item">
              <h1>A/L®</h1>
            </div>
            <div className="Profile__buttons__item end">
              <button onClick={openPopup}>
                Editar
              </button>
              <button onClick={handleLogout}>
                Sair
              </button>
            </div>
          </div>

          <div className="Profile__content-grid">
            <div className="Profile__section-box">
              <h2 className="Profile__section-title">Meus Anúncios</h2>
              {anuncios.length === 0 ? (
                <p className="Profile__no-data">
                  Você não possui anúncios cadastrados.
                </p>
              ) : (
                <div className="Profile__cards-container">
                  {anuncios.map((anuncio) => (
                    <div key={anuncio.id} className="Profile__card__anuncio">
                      <div className="Profile__card__anuncio__image">
                        {anuncio.urLs?.[0] ? (
                          <img
                            src={anuncio.urLs[0]}
                            alt="Imagem do anúncio"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/detalhes/${anuncio.id}`)}
                          />
                        ) : (
                          <p>Sem imagem</p>
                        )}
                      </div>
                      <div className="Profile__card__anuncio__info">
                        <Link
                          to={`/detalhes/${anuncio.id}`}
                          className="item-titulo-link"
                        >
                          <h4>Titulo: {anuncio.titulo}</h4>
                        </Link>
                        <p>
                          <span>• Tipo:</span> {anuncio.tipoPeca}
                        </p>
                        <p>
                          <span> • Status: </span>
                          {anuncio.isAvaliable ? "Disponível" : "Indisponível"}
                        </p>
                        <p>
                          <span> • Valor: </span>
                          {formatCurrency(anuncio.valor)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="Profile__section-box">
              <h2 className="Profile__section-title">Meus Pedidos</h2>
              {compras.length === 0 ? (
                <p className="Profile__no-data">Você ainda não realizou compras.</p>
              ) : (
                <div className="Profile__cards-container">
                  {compras.map((compra) => {
                    const infoAdicionalObj = parseInformacaoAdicional(
                      compra.informacaoAdicional
                    );
                    const isExpanded = expandedCards.includes(compra.id);

                    return (
                      <div
                        key={compra.id}
                        className="Profile__card__compra"
                        style={{
                          width: "100%",
                          height: isExpanded ? "235px" : "65px",
                          transition: "height 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className="Profile__card__compra__info">
                          <div className="Profile__card__compra__info__top">
                            <h4>Pedido: #{compra.id}</h4>
                            <p>{new Date(compra.dataCriacao).toLocaleDateString()}</p>
                            <button onClick={() => toggleExpand(compra.id)}>
                              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                          </div>

                          {isExpanded && (
                            <>
                              <div className="Profile__card__compra__info__container">
                                <div className="Profile__card__compra__info__item__left">
                                  <span>• Status: {traduzirStatus(compra.status)}</span>
                                  <span>
                                    • Metodo de pagamento:{" "}
                                    {compra.metodoPagamento == null
                                      ? "Não finalizado"
                                      : traduzirMetodo(compra.metodoPagamento)}
                                  </span>
                                  {compra.parcelas > 0 && <p> • Parcelas: {compra.parcelas}</p>}
                                  <h3>
                                    •<strong> Total: </strong>
                                    {formatCurrency(compra.valorTransacao)}
                                  </h3>
                                </div>
                                <div className="Profile__card__compra__info__item__rigth">
                                  {infoAdicionalObj && (
                                    <div className="Profile__informacao-adicional">
                                      <p>Produtos :</p>
                                      {Array.isArray(infoAdicionalObj.anuncios) && (
                                        <ul
                                          style={{
                                            height: "100%",
                                            width: "100%",
                                          }}
                                        >
                                          {infoAdicionalObj.anuncios.map((item, index) => (
                                            <li key={index}>
                                              <p>Título: {item.Titulo}</p>
                                              <p>Valor: {formatCurrency(item.Valor)}</p>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay-profile" onClick={closePopup}>
          <div
            className="popup-content-profile"
            onClick={(e) => e.stopPropagation()}
          >
            {step === 1 && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>Edite seus dados</h3>

                <div className="Profile__info__item">
                  <label>Nome</label>
                  <input
                    className="Profile__info__input"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="Profile__info__item">
                  <label>E-mail</label>
                  <input
                    className="Profile__info__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={checkEmailExists}
                  />
                </div>

                <div className="Profile__info__item">
                  <label>Senha</label>
                  <input
                    type="password"
                    className="Profile__info__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite uma nova senha"
                  />
                </div>

                <div className="Profile__info__item">
                  <label>CEP</label>
                  <input
                    className="Profile__info__input"
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    onBlur={searchCEP()}
                  />
                </div>

                <div className="Profile__info__item">
                  <label>Número</label>
                  <input
                    className="Profile__info__input"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </div>

                <div className="Profile__info__item">
                  <label>Complemento</label>
                  <input
                    placeholder="(opcional)"
                    className="Profile__info__input"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>

                <button
                  className="Profile__info__saveButton"
                  onClick={handleSaveButtonClick}
                  disabled={isLoading || isSaving}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : isEmailChanged ? (
                    "Avançar"
                  ) : (
                    "Salvar"
                  )}
                </button>


              </div>
            )}

            {step === 2 && (
              <div className="Register__container">
                <h1 className="Register__title">Confirme o Token</h1>
                <p>Digite o token recebido no seu E-mail</p>
                <form className="Register__form" onSubmit={handleSubmit}>
                  <div className="Register__form-group">
                    <input
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                      className="Register__input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoadingToken}
                    className="Register__button"
                  >
                    {isLoadingToken ? (
                      <div className="loading-spinner-register" />
                    ) : (
                      "Validar"
                    )}
                  </button>
                </form>
              </div>
            )}

            <button
              onClick={closePopup}
              className="Profile__closePopup"
              style={{ marginTop: "1rem" }}
            >
              <img src={xpgn} alt="Fechar popup" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
