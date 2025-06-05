import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";

import fotodeperfilpadrao from "../images/fotodeperfil.png";
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

    console.log("Enviando dados:", JSON.stringify(data));

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

      alert("Dados atualizados com sucesso!");
      setEditField(null);
    } catch (error) {
      console.error(error);
      alert("Erro na atualização: " + error.message);
    }
  };

  const handleSave = async (field) => {
    switch (field) {
      case "nome":
        if (!nome.trim()) {
          alert("Por favor, insira um nome válido.");
          return;
        }
        await updateUserData({ nome });
        break;
      case "cpf":
        if (!cpf.trim()) {
          alert("Por favor, insira um CPF válido.");
          return;
        }
        await updateUserData({ cpf });
        break;
      case "idade":
        if (!idade || isNaN(idade) || parseInt(idade) <= 0) {
          alert("Por favor, insira uma idade válida.");
          return;
        }
        await updateUserData({ idade });
        break;
      case "email":
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          alert("Por favor, insira um e-mail válido.");
          return;
        }
        await updateUserData({ email });
        break;
      default:
        break;
    }
  };

  // Quando o usuário escolhe um arquivo no input file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Atualiza a imagem localmente para pré-visualizar
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Envia a imagem para a API
  const handleUploadImage = async () => {
    if (!selectedFile) {
      alert("Por favor, selecione uma imagem antes de enviar.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    // Usuário tem o id no user.id
    formData.append("usuarioId", user.id);

    try {
      const response = await fetch(
        `https://localhost:7081/api/Usuario/UploadImageUsuario?usuarioId=${user.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Falha no upload da imagem.");
      }

      alert("Imagem atualizada com sucesso!");
      // Aqui, idealmente você atualizaria o Redux com a nova URL da foto,
      // ou então recarregaria os dados do usuário para atualizar o estado global.
      // Como não temos isso, vamos manter a imagem local atualizada.
      setSelectedFile(null);
    } catch (error) {
      alert("Erro ao enviar imagem: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="Profile">
      <div className="Profile__top"></div>
      <div className="Profile__bottom">
        <div className="Profile__box">
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
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button onClick={() => document.getElementById("fileInput").click()}>
                Selecionar Foto
              </button>
              <button
                onClick={handleUploadImage}
                disabled={uploading || !selectedFile}
                style={{ marginLeft: "10px" }}
              >
                {uploading ? "Enviando..." : "Enviar Foto"}
              </button>
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
                    <div className="Profile__item__bottom__input">{idade}</div>
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
                    <div className="Profile__item__bottom__input">{email}</div>
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

            <button className="profile__edit">
              <FaEdit /> Editar Perfil
            </button>

            <button className="profile__logout" onClick={handleLogout}>
              <FaSignOutAlt /> Sair
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
