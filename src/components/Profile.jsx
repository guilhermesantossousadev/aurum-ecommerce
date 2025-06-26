// Novo layout inspirado na imagem enviada, mantendo funcionalidades

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import "../styles/components/Profile.css";
import ximg from "../images/Common/x.png";
import { FaSignOutAlt, FaSave } from "react-icons/fa";

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
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const [anuncios, setAnuncios] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const GetAnuncios = async () => {
    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByUsuarioIdAnuncio?usuarioId=${user.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar anúncios.");
      }

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return toast("Selecione uma imagem.");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("usuarioId", user.id);
    try {
      const res = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Usuario/UploadImageUsuario?usuarioId=${user.id}`,
        { method: "POST", body: formData }
      );
      if (!res.ok) throw new Error();
      toast.success("Imagem atualizada!");
      setSelectedFile(null);
      setIsEditingPhoto(false);
    } catch {
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile__container">
      <div className="profile__header" />
      <div className="profile__wrapper">
        <div className="profile__card">
          <div className="avatar__section">
            <div className="avatar__section__item">
              <img src={profileImage} alt="Foto" className="avatar__img" />
            </div>

            <div className="avatar__section__item right">
              {isEditingPhoto ? (
                <>
                  <div className="photo__edit">
                    <input
                      id="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="upload-photo" className="btn__upload-photo">
                      Selecionar imagem
                    </label>
                    <button onClick={handleUploadImage} disabled={uploading}>
                      {uploading ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                  <div className="xbtn">
                    <button onClick={() => setIsEditingPhoto(false)}>
                      <img src={ximg} alt="Cancelar" width="10px" />
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={() => setIsEditingPhoto(true)}>
                  Upload Photo
                </button>
              )}
            </div>
          </div>

          <div className="profile__info">
            {[
              { label: "Nome", value: nome, field: "nome", set: setNome },
              { label: "Email", value: email, field: "email", set: setEmail },
              { label: "CPF", value: cpf, field: "cpf", set: setCpf },
              { label: "Idade", value: idade, field: "idade", set: setIdade },
            ].map(({ label, value, field, set }) => (
              <div key={field} className="info__row">
                <div className="info__row__top">
                  <label>{label}</label>
                </div>
                <div className="info__row__bottom">
                  {editField === field ? (
                    <>
                      <input value={value} onChange={(e) => set(e.target.value)} />
                      <button onClick={() => handleSave(field)}>
                        <FaSave />
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{value}</span>
                      <button onClick={() => setEditField(field)}>Editar</button>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="logout__section">
              <Link to="/cadastroJoia">Cadastrar joia</Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </div>
          </div>
        </div>

        <div className="profile__details">
          <h3>Anúncios Cadastrados</h3>
          <p>Estes são os anúncios que você cadastrou no nosso site.</p>
          <div className="anuncios">
            {anuncios.length === 0 ? (
              <p>Você não possui anúncios cadastrados.</p>
            ) : (
              anuncios.map((anuncio) => (
                <div key={anuncio.id} className="anuncio__item">
                  <div className="anuncio__item__left">
                    {anuncio.urls && anuncio.urls.length > 0 && (
                      <img src={anuncio.urls[0]} alt={anuncio.titulo} />
                    )}
                  </div>
                  <div className="anuncio__item__right">
                    <h4>{anuncio.titulo}</h4>
                    <p>Tipo: {anuncio.tipoPeca}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
