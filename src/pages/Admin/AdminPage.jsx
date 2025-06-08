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


import { logout } from "../../store/userSlice"
function AdminPage() {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="Admin">
      <div className="Admin__menu">
        <ul>
          <li>
            <button
              className={step === 1 ? "active" : ""}
              onClick={() => setStep(1)}
            >
              Anuncios
            </button>
          </li>
          <li>
            <button
              className={step === 2 ? "active" : ""}
              onClick={() => setStep(2)}
            >
              Joias
            </button>
          </li>
          <li>
            <button
              className={step === 3 ? "active" : ""}
              onClick={() => setStep(3)}
            >
              Usuarios
            </button>
          </li>
          <li>
            <button
              className={step === 4 ? "active" : ""}
              onClick={() => setStep(4)}
            >
              Newsletter
            </button>
          </li>
          <li>
            <button
              className={step === 5 ? "active" : ""}
              onClick={() => setStep(5)}
            >
              Vendas
            </button>
          </li>
          <li>
            <button className="profile__logout" onClick={handleLogout}>
              <FaSignOutAlt /> Sair
            </button>
          </li>
        </ul>
      </div>

      <div className="Admin__all">
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
