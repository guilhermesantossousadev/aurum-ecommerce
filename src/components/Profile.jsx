import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";

import fotodeperfilpadrao from "../images/fotodeperfil.png";
import "../styles/Profile.css";

import {
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaMoneyBill,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className="Profile">
      <div className="Profile__top"></div>

      <div className="Profile__bottom">
        <div className="Profile__itens">
          <div className="Profile__img">
            <img
              src={
                user.fotoPerfilURL !== null
                  ? user.fotoPerfilURL
                  : fotodeperfilpadrao
              }
              alt="foto de perfil"
              className="fotoperfil"
            />
          </div>
          <div className="Profile__name">
            <h1>{user ? user.nome : "Usuário Desconhecido"}</h1>
          </div>
          <div className="Profile__location">
            <h3>{user.endereco}</h3>
          </div>

          <div className="Profile__details">
            <ul>
              <li>
                <FaIdCard /> CPF: {user.cpf}
              </li>
              <li>
                <FaCalendarAlt /> Idade: {user.idade}
              </li>
              <li>
                <FaEnvelope /> Email: {user.email}
              </li>
              <li>CEP: {user.cep}</li>
              <li>Número: {user.numero}</li>
            </ul>
          </div>
        </div>

        <div className="Profile__btn__container">
          <button className="profile__edit">
            <FaEdit /> Editar Perfil
          </button>

          <button className="profile__logout" onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
{
  /*
      <div className="Profile__box">


        <ul>
          <li>
          </li>

          <li>{user.cpf}</li>
          <li>{user.idade}</li>
          <li>{user.email}</li>
          <li>{user.cep}</li>
          <li>{user.numero}</li>
        </ul>

      </div >
  );
  
      */
}
