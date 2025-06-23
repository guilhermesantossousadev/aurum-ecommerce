import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import "../../styles/Admin/AdminPage.css";
import CrudAnuncios from "../../components/Cruds/CrudAnuncios";
import CrudUsuarios from "../../components/Cruds/CrudUsuarios";
import CrudVendas from "../../components/Cruds/CrudVendas";
import CrudNewsletter from "../../components/Cruds/CrudNewsletter";
import CrudJoias from "../../components/Cruds/CrudJoias";

import { logout } from "../../store/userSlice";

function AdminPage() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="Admin">
      <div className="Admin__menu">
        <ul className="Dashboard__menu">
          <div className="Dashboard__menu__tittle">
            <span>NAVIGATION</span>
          </div>
          <li className={step === 0 ? "active" : ""} onClick={() => setStep(0)}>
            DashBoard
          </li>
          <div className="Dashboard__menu__tittle">
            <span>SOCIAL</span>
          </div>
          <ul className="DashBoard__menu__ul">
            <li
              className={step === 1 ? "active" : ""}
              onClick={() => setStep(1)}
            >
              Anuncios
            </li>
            <li
              className={step === 2 ? "active" : ""}
              onClick={() => setStep(2)}
            >
              Joias
            </li>
            <li
              className={step === 3 ? "active" : ""}
              onClick={() => setStep(3)}
            >
              Usuarios
            </li>
            <li
              className={step === 4 ? "active" : ""}
              onClick={() => setStep(4)}
            >
              Newsletter
            </li>
            <li
              className={step === 5 ? "active" : ""}
              onClick={() => setStep(5)}
            >
              Vendas
            </li>
          </ul>

          <div className="Dashboard__menu__tittle">
            <span>PAGES</span>
          </div>
          <ul>
            <li onClick={() => navigate("/profile")}>Perfil</li>
            <li className="profile__logout" onClick={handleLogout}>
              <FaSignOutAlt /> Sair
            </li>
          </ul>
        </ul>
      </div>

      <div className="Admin__all">
        {step === 0 && <div>Dashboard</div>}
        {step === 1 && <CrudAnuncios />}
        {step === 2 && <CrudJoias />}
        {step === 3 && <CrudUsuarios />}
        {step === 4 && <CrudNewsletter />}
        {step === 5 && <CrudVendas />}
      </div>
    </div>
  );
}

export default AdminPage;
