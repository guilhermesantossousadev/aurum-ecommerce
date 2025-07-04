import { FaPencilAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import perfil from "../images/Common/perfil.png";

import { FaSignOutAlt, FaSave } from "react-icons/fa";

import "../styles/components/Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editField, setEditField] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [cpf, setCpf] = useState(user.cpf);
  const [idade, setIdade] = useState(user.idade);
  const [nome, setNome] = useState(user.nome);

  const [profileImage, setProfileImage] = useState(user.fotoPerfilURL);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [anuncios, setAnuncios] = useState([]);

  const inputFileRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const GetAnuncios = async () => {
    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByUsuarioIdAnuncio?usuarioId=${user.id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) throw new Error("Erro ao buscar anúncios.");
      const data = await response.json();
      setAnuncios(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      GetAnuncios();
    }
  }, [user?.id]);

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
      toast.success("Dados atualizados com sucesso!");
      setEditField(null);
    } catch (error) {
      toast.error("Erro na atualização: " + error.message);
    }
  };

  const handleSave = async (field) => {
    const validators = {
      nome: nome.trim().length > 0,
      cpf: cpf.trim().length > 0,
      idade: /^\d+$/.test(idade) && parseInt(idade) > 0,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    };

    if (!validators[field]) {
      toast("Campo inválido");
      return;
    }

    const values = { nome, cpf, idade, email };
    await updateUserData({ [field]: values[field] });
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
    if (!file) return toast("Selecione uma imagem.");
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
            
            {user.profileImage === null ? (
              <img src={profileImage} alt="Foto" />
            ) : (
              <img src={perfil} alt="Foto" />
            )}

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
            {/* Campos Nome, Email, CPF, Idade - mantidos sem alteração */}
            {["nome", "email", "cpf", "idade"].map((field) => (
              <div key={field} className="Profile__info__item">
                <div className="Profile__info__item__content">
                  {editField === field ? (
                    <div className="Profile__edit">
                      <input
                        className="Profile__info__input"
                        value={
                          field === "nome"
                            ? nome
                            : field === "email"
                            ? email
                            : field === "cpf"
                            ? cpf
                            : idade
                        }
                        onChange={(e) =>
                          field === "nome"
                            ? setNome(e.target.value)
                            : field === "email"
                            ? setEmail(e.target.value)
                            : field === "cpf"
                            ? setCpf(e.target.value)
                            : setIdade(e.target.value)
                        }
                      />
                      <button
                        className="Profile__info__saveButton"
                        onClick={() => handleSave(field)}
                      >
                        <FaSave size={30} color="#000" />
                      </button>
                    </div>
                  ) : (
                    <div className="Profile__edit">
                      <span className="Profile__info__text">
                        {field === "nome"
                          ? nome
                          : field === "email"
                          ? email
                          : field === "cpf"
                          ? cpf
                          : idade}
                      </span>
                      <FaPencilAlt
                        size={30}
                        color="#000"
                        onClick={() => setEditField(field)}
                        className="pencil"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="Profile__loggout">
            <FaSignOutAlt size={30} color="#000" onClick={handleLogout} /> Sair
          </div>

          <div className="Profile__anuncios">
            <h3>Anúncios Cadastrados</h3>
            <p>Estes são os anúncios que você cadastrou no nosso site.</p>
            {anuncios.length === 0 ? (
              <p>Você não possui anúncios cadastrados.</p>
            ) : (
              <div className="Anuncios">
                {anuncios.map((anuncio) => (
                  <div key={anuncio.id} className="Anuncio__card">
                    <div className="Anuncio__card__image">
                      {anuncio.urLs?.[0] ? (
                        <img
                          src={anuncio.urLs[0]}
                          alt="Imagem do anúncio"
                          className="anuncio__image"
                        />
                      ) : (
                        <div className="Anuncio__card__image">
                          <p>Este anúncio não possui imagem.</p>
                        </div>
                      )}
                    </div>
                    <div className="Anuncio__card__info">
                      <h4>{anuncio.titulo}</h4>
                      <p>Tipo: {anuncio.tipoPeca}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
