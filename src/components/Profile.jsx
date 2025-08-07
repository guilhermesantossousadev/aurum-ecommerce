import {
  FaPencilAlt,
  FaSignOutAlt,
  FaSave,
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaIdCard,
  FaTag,
  FaCogs,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [email, setEmail] = useState(user.email || "");
  const [cpf, setCpf] = useState(user.cpf || "");
  const [idade, setIdade] = useState(user.idade || "");
  const [nome, setNome] = useState(user.nome || "");

  const [profileImage, setProfileImage] = useState(
    user.fotoPerfilURL || perfil
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [anuncios, setAnuncios] = useState([]);
  const [compras, setCompras] = useState([]);

  const inputFileRef = useRef(null);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setEditField(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
      setEditField(null);
    } catch (error) {
      toast.error("Erro na atualização: " + error.message);
    }
  };

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

  const [cepformatado, setcepFormatado] = useState("");

  const searchCEP = async () => {
    try {
      if (!user?.cep) return;

      const response = await fetch(
        `https://viacep.com.br/ws/${user.cep}/json/`
      );
      if (!response.ok) throw new Error("Erro ao buscar CEP.");

      const cepData = await response.json();

      setcepFormatado(`${cepData.logradouro}, ${cepData.uf}`);
    } catch (e) {
      console.log(e);
      toast.error("Erro ao buscar CEP.");
    }
  };

  const handleSaveAll = async () => {
    const validators = {
      nome: nome.trim().length > 0,
      cpf: cpf.trim().length > 0,
      idade: /^\d+$/.test(idade) && parseInt(idade) > 0,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    };

    if (!validators.nome) {
      toast.error("Nome inválido.");
      return;
    }
    if (!validators.cpf) {
      toast.error("CPF inválido.");
      return;
    }
    if (!validators.idade) {
      toast.error("Idade inválida.");
      return;
    }
    if (!validators.email) {
      toast.error("E-mail inválido.");
      return;
    }

    const updatedData = { nome, cpf, idade, email };

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

  // Função para parsear JSON seguro
  const parseInformacaoAdicional = (info) => {
    if (!info) return null;
    try {
      return JSON.parse(info);
    } catch {
      return null;
    }
  };

  useEffect(() => {
    searchCEP();
  }, []);

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
            <div className="Profile__box__info__value">
              <FaUser className="Profile__info__icon nome" />
              {user.nome}
            </div>

            <div className="Profile__box__info__value cep">
              <FaMapMarkerAlt className="Profile__info__icon" />
              {cepformatado}
            </div>

            <div className="Profile__box__info__inside">
              <div className="Profile__box__info__inside__item">
                <div className="Profile__box__info__inside__icon">
                  <FaEnvelope className="Profile__info__icon" />
                  E-mail:
                </div>
                <div className="Profile__box__info__inside__value">
                  {user.email}
                </div>
              </div>

              <div className="Profile__box__info__inside__item">
                <div className="Profile__box__info__inside__icon">
                  <FaIdCard className="Profile__info__icon" />
                  Cpf:
                </div>
                <div className="Profile__box__info__inside__value">
                  {user.cpf}
                </div>
              </div>

              <div className="Profile__box__info__inside__item">
                <div className="Profile__box__info__inside__icon">
                  <FaIdCard className="Profile__info__icon" />
                  Idade:
                </div>
                <div className="Profile__box__info__inside__value">
                  {user.idade} Anos
                </div>
              </div>
            </div>
          </div>

          <div className="Profile__buttons">
            <div className="Profile__buttons__item">
              <h1>A/L®</h1>
            </div>
            <div className="Profile__buttons__item end">
              <button onClick={openPopup}>
                <FaPencilAlt size={20} className="Profile__icon" /> Editar
              </button>
              <button onClick={handleLogout}>
                <FaSignOutAlt size={20} className="Profile__icon" /> Sair
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
                      <div className="Profile__card-image">
                        {anuncio.urLs?.[0] ? (
                          <img src={anuncio.urLs[0]} alt="Imagem do anúncio" />
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
              <h2 className="Profile__section-title">Minhas Compras</h2>
              {compras.length === 0 ? (
                <p className="Profile__no-data">
                  Você ainda não realizou compras.
                </p>
              ) : (
                <div className="Profile__cards-container">
                  {compras.map((compra) => {
                    const infoAdicionalObj = parseInformacaoAdicional(
                      compra.informacaoAdicional
                    );
                    return (
                      <div key={compra.id} className="Profile__card">
                        <div className="Profile__card-info full">
                          <h4>
                            <FaTag size={16} /> Compra #{compra.id}
                          </h4>
                          <p>
                            <FaCogs size={14} />{" "}
                            {new Date(compra.dataCriacao).toLocaleDateString()}
                          </p>
                          <p>
                            <FaDollarSign size={14} /> Valor: R${" "}
                            {compra.valorTransacao.toFixed(2)}
                          </p>
                          <p>
                            <FaCheckCircle size={14} color="green" /> Status:{" "}
                            {compra.status}
                          </p>
                          <p>
                            <FaTag size={14} /> Método:{" "}
                            {compra.metodoPagamento || "Não informado"}
                          </p>
                          {compra.parcelas > 0 && (
                            <p>Parcelas: {compra.parcelas}</p>
                          )}
                          {infoAdicionalObj && (
                            <div className="Profile__informacao-adicional">
                              <p>
                                <strong>Detalhes adicionais:</strong>
                              </p>
                              {Array.isArray(infoAdicionalObj.anuncios) && (
                                <ul>
                                  {infoAdicionalObj.anuncios.map(
                                    (item, index) => (
                                      <li key={index}>
                                        Título: {item.Titulo} - Valor: R${" "}
                                        {item.Valor.toFixed(2)}
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </div>
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
            <h3>Edite o seu perfil</h3>

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
              />
            </div>

            <div className="Profile__info__item">
              <label>Cpf</label>
              <input
                className="Profile__info__input"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>

            <div className="Profile__info__item">
              <label>Idade</label>
              <input
                className="Profile__info__input"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              />
            </div>

            <button
              className="Profile__info__saveButton"
              onClick={handleSaveAll}
              disabled={isSaving}
            >
              {isSaving ? <div className="loading-spinner"></div> : "Salvar"}
            </button>

            <button
              onClick={closePopup}
              className="Profile__closePopup"
              style={{ marginTop: "1rem" }}
            >
              <img src={xpgn} alt="xpgn" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
