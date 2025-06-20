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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
    <div className="profile-container">
      <div className="profile-header">
      </div>
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="avatar-section">
            <img src={profileImage} alt="Foto" className="avatar-img" />
            {isEditingPhoto ? (
              <div className="photo-edit">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button onClick={handleUploadImage} disabled={uploading}>
                  {uploading ? "Enviando..." : "Enviar"}
                </button>
                <button onClick={() => setIsEditingPhoto(false)}>
                  <img src={ximg} alt="Cancelar" width="10px" />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditingPhoto(true)}>
                Upload Photo
              </button>
            )}
          </div>

          <div className="profile-info">
            {["nome", "email", "cpf", "idade"].map((field) => (
              <div key={field} className="info-row">
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {editField === field ? (
                  <>
                    <input
                      value={{ nome, email, cpf, idade }[field]}
                      onChange={(e) => {
                        const setters = {
                          nome: setNome,
                          email: setEmail,
                          cpf: setCpf,
                          idade: setIdade,
                        };
                        setters[field](e.target.value);
                      }}
                    />

                    <button onClick={() => handleSave(field)}>
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <span>{eval(field)}</span>
                    <button onClick={() => setEditField(field)}>Editar</button>
                  </>
                )}
              </div>
            ))}

            <div className="legal-status">
              <label>Status KYC:</label>
              <span className="verified">Verificado</span>
            </div>

            <div className="logout-section">
              <Link to="/cadastroJoia">Cadastrar joia</Link>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <h3>Professional Details</h3>
          <p>This are the professional details shown to users in the app.</p>
          <div className="expertise-tags">
            {['Career', 'Money', 'Stock', 'Mortgage'].map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <div className="experience-block">
            <strong>7 Years</strong> of total experience
          </div>
          <div className="rating-block">
            <span className="stars">★★★★☆</span> from 34 customers
          </div>
          <div className="reviews">
            <strong>Ankit Srivastava</strong>
            <p>
              Excellent conversation with him... very knowledgeable personality
              to talk to.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
