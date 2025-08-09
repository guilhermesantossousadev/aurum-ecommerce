import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../styles/Admin/AdminPage.css";
import CrudAnuncios from "../../components/Cruds/CrudAnuncios";
import CrudUsuarios from "../../components/Cruds/CrudUsuarios";
import CrudVendas from "../../components/Cruds/CrudVendas";
import CrudNewsletter from "../../components/Cruds/CrudNewsletter";

import { logout } from "../../store/userSlice";
import Graficos from "../Admin/Graficos";

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
      <div className="Admin__left">
        <nav className="Admin__menu" aria-label="Admin navigation menu">

          <div className="Dashboard__menu__section">
            <div className="Dashboard__menu__title">COMERCIAL</div>
            <ul className="Dashboard__menu">
              <li
                className={step === 1 ? "active" : ""}
                onClick={() => setStep(1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? setStep(1) : null)}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                Anúncios & Joias
              </li>
              <li
                className={step === 2 ? "active" : ""}
                onClick={() => setStep(2)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? setStep(2) : null)}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                Vendas
              </li>
            </ul>
          </div>

          <div className="Dashboard__menu__section">
            <div className="Dashboard__menu__title">SOCIAL </div>
            <ul className="Dashboard__menu">
              <li
                className={step === 3 ? "active" : ""}
                onClick={() => setStep(3)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? setStep(3) : null)}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                Usuários
              </li>
              <li
                className={step === 4 ? "active" : ""}
                onClick={() => setStep(4)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? setStep(4) : null)}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                Newsletter
              </li>
            </ul>
          </div>

          <div className="Dashboard__menu__section">
            <div className="Dashboard__menu__title">INFORMAÇÔES</div>
            <ul className="Dashboard__menu">
              <li
                onClick={() => navigate("/profile")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" ? navigate("/profile") : null
                }
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                Perfil
              </li>
              <li
                className="profile__logout"
                onClick={handleLogout}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" ? handleLogout() : null)}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                Sair
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="Admin__right">
        <main className="Admin__all" role="main">
          {step === 1 && <CrudAnuncios />}
          {step === 2 && <CrudVendas />}
          {step === 3 && <CrudUsuarios />}
          {step === 4 && <CrudNewsletter />}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
