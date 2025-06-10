import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import fotodeperfilpadrao from "../images/fotodeperfil.png";
import ximg from "../images/x.png";

import camerapng from "../images/camera.png";

import "../styles/Profile.css";

import {
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaMoneyBill,
  FaSignOutAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editField, setEditField] = useState(null);
  const [email, setEmail] = useState(user.email);
  const [cpf, setCpf] = useState(user.cpf);
  const [idade, setIdade] = useState(user.idade);
  const [nome, setNome] = useState(user.nome);

  // Estado para controlar a imagem local e o arquivo selecionado
  const [profileImage, setProfileImage] = useState(
    user.fotoPerfilURL !== null ? user.fotoPerfilURL : fotodeperfilpadrao
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Novo estado para controlar se o usuário quer editar a foto
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const updateUserData = async (updatedData) => {
    const data = {
      id: user.id || 0,
      nome: updatedData.nome ?? user.nome,
      cpf: updatedData.cpf ?? user.cpf,
      idade: updatedData.idade ?? user.idade,
      email: updatedData.email ?? user.email,
      password: user.password,
      cep: user.cep,
      numero: user.numero,
      complemento: user.complemento,
      endereco: user.endereco,
      fotoPerfilURL: user.fotoPerfilURL,
      isAdmin: user.isAdmin || false,
    };

    try {
      const response = await fetch(
        "https://localhost:7081/api/Usuario/PutUsuario",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o perfil. Tente novamente.");
      }

      toast.success("Dados atualizados com sucesso!");
      setEditField(null);
    } catch (error) {
      console.error(error);
      toast.error("Erro na atualização: " + error.message);
    }
  };

  const handleSave = async (field) => {
    switch (field) {
      case "nome":
        if (!nome.trim()) {
          toast("Por favor, insira um nome válido.");
          return;
        }
        await updateUserData({ nome });
        break;
      case "cpf":
        if (!cpf.trim()) {
          toast("Por favor, insira um CPF válido.");
          return;
        }
        await updateUserData({ cpf });
        break;
      case "idade":
        if (!idade || isNaN(idade) || parseInt(idade) <= 0) {
          toast("Por favor, insira uma idade válida.");
          return;
        }
        await updateUserData({ idade });
        break;
      case "email":
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          toast("Por favor, insira um e-mail válido.");
          return;
        }
        await updateUserData({ email });
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast("Por favor, selecione uma imagem antes de enviar.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("usuarioId", user.id);

    try {
      const response = await fetch(
        `$https://marketplacejoias-api-latest.onrender.com/api/Usuario/UploadImageUsuario?usuarioId={user.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Falha no upload da imagem.");
      }

      toast.success("Imagem atualizada com sucesso!");
      setSelectedFile(null);
      setIsEditingPhoto(false); // fecha a seção de edição de foto
    } catch (error) {
      console.log("Erro ao enviar imagem: " + error.message)
      toast.error("Erro ao enviar imagem");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="Profile">
      <div className="Profile__top"></div>
      <div class="Profile__bottom">
        <div class="Profile__boxes">
          <div class="Profile__box__first">
            <div className="Profile__box__img__container">
              <div className="Profile__box__img__container__left">
                <div className="Profile__img">
                  <img
                    src={profileImage}
                    alt="foto de perfil"
                    className="fotoperfil"
                  />
                </div>
              </div>
              <div className="Profile__box__img__container__right">
                {!isEditingPhoto ? (
                  <button
                    onClick={() => setIsEditingPhoto(true)}
                    className="camera__img"
                  >
                    Editar
                  </button>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <button
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      Selecionar Foto
                    </button>
                    <button
                      onClick={handleUploadImage}
                      disabled={uploading || !selectedFile}
                      style={{ marginLeft: "10px" }}
                    >
                      {uploading ? "Enviando..." : "Enviar Foto"}
                    </button>
                    <button
                      className="xbutton"
                      onClick={() => {
                        setIsEditingPhoto(false);
                        setSelectedFile(null);
                        setProfileImage(
                          user.fotoPerfilURL !== null
                            ? user.fotoPerfilURL
                            : fotodeperfilpadrao
                        );
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      <img src={ximg} alt="ximg" width="10px" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="Profile__itens">
              {/* Nome */}
              <div className="Profile__item">
                <strong>Nome:</strong>
                <div className="Profile__item__bottom">
                  {editField === "nome" ? (
                    <>
                      <div className="Profile__item__bottom__input">
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleSave("nome")}>
                          <FaSave /> Salvar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="Profile__item__bottom__input">{nome}</div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleEditClick("nome")}>
                          Editar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* CPF */}
              <div className="Profile__item">
                <strong>CPF:</strong>
                <div className="Profile__item__bottom">
                  {editField === "cpf" ? (
                    <>
                      <div className="Profile__item__bottom__input">
                        <input
                          type="text"
                          value={cpf}
                          onChange={(e) => setCpf(e.target.value)}
                        />
                      </div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleSave("cpf")}>
                          <FaSave /> Salvar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="Profile__item__bottom__input">{cpf}</div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleEditClick("cpf")}>
                          Editar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Idade */}
              <div className="Profile__item">
                <strong>Idade:</strong>
                <div className="Profile__item__bottom">
                  {editField === "idade" ? (
                    <>
                      <div className="Profile__item__bottom__input">
                        <input
                          type="number"
                          value={idade}
                          onChange={(e) => setIdade(e.target.value)}
                        />
                      </div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleSave("idade")}>
                          <FaSave /> Salvar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="Profile__item__bottom__input">
                        {idade}
                      </div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleEditClick("idade")}>
                          Editar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="Profile__item">
                <strong>Email:</strong>
                <div className="Profile__item__bottom">
                  {editField === "email" ? (
                    <>
                      <div className="Profile__item__bottom__input">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleSave("email")}>
                          <FaSave /> Salvar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="Profile__item__bottom__input">
                        {email}
                      </div>
                      <div className="Profile__item__bottom__button">
                        <button onClick={() => handleEditClick("email")}>
                          Editar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="Profile__btn__container">
              <Link to="/cadastroJoia">Cadastrar uma joia</Link>
              <button className="profile__logout" onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </div>
          </div>
          <div class="Profile__box__second">opa</div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
