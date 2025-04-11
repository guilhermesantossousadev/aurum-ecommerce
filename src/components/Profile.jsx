import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
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
      <h1 className="profile__name">
        {user ? user.nome : "Usuário Desconhecido"}
      </h1>
      {/* <button className="profile__edit">
        <FaEdit /> Editar Perfil
      </button> */}

      {/* Botão de Logout */}
      <button className="profile__logout" onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </button>
    </section>
  );
};

export default Profile;
