// Novo layout inspirado na imagem enviada, mantendo funcionalidades

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      nome: nome.trim(),
      cpf: cpf.trim(),
      idade: idade && !isNaN(idade) && parseInt(idade) > 0,
      email: /\S+@\S+\.\S+/.test(email),
    };
    if (!validators[field]) {
      toast("Campo inválido");
      return;
    }
    await updateUserData({ [field]: eval(field) });
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
      <div className="profile__header">
      </div>
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
                    {/* input file escondido */}
                    <input
                      id="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />

                    {/* label estilizado como botão */}
                    <label htmlFor="upload-photo" className="btn__upload-photo">
                      Selecionar imagem
                    </label>

                    {/* botão enviar */}
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
            <div className="info__row">
              <div className="info__row__top">
                <label>Nome</label>
              </div>

              <div className="info__row__bottom">
                {editField === "nome" ? (
                  <>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} />
                    <button onClick={() => handleSave("nome")}>
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{nome}</span>
                    <button onClick={() => setEditField("nome")}>Editar</button>
                  </>
                )}
              </div>
            </div>

            <div className="info__row">
              <div className="info__row__top">
                <label>Email</label>
              </div>

              <div className="info__row__bottom">

                {editField === "email" ? (
                  <>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={() => handleSave("email")}>
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{email}</span>
                    <button onClick={() => setEditField("email")}>Editar</button>
                  </>
                )}
              </div>
            </div>

            <div className="info__row">
              <div className="info__row__top">
                <label>CPF</label>
              </div>

              <div className="info__row__bottom">
                {editField === "cpf" ? (
                  <>
                    <input value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    <button onClick={() => handleSave("cpf")}>
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{cpf}</span>
                    <button onClick={() => setEditField("cpf")}>Editar</button>
                  </>
                )}
              </div>
            </div>

            <div className="info__row">
              <div className="info__row__top">
                <label>Idade</label>
              </div>

              <div className="info__row__bottom">
                {editField === "idade" ? (
                  <>
                    <input value={idade} onChange={(e) => setIdade(e.target.value)} />
                    <button onClick={() => handleSave("idade")}>
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{idade}</span>
                    <button onClick={() => setEditField("idade")}>Editar</button>
                  </>
                )}
              </div>
            </div>

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
                    {anuncio.urLs && anuncio.urLs.length > 0 && (
                      <img
                        src={anuncio.urLs[0]}
                        alt={anuncio.titulo}
                      />
                    )}
                  </div>
                  <div className="anuncio__item__rigth">
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
