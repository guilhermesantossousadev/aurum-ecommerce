import { useState } from "react";
import "../../styles/Admin/AdminPage.css";
import CrudAnuncios from "../../components/Cruds/CrudAnuncios";

function AdminPage() {
  const [step, setStep] = useState("");

  return (
    <div className="Admin">
      <div className="Admin__menu">
        <ul>
          <li onClick={() => setStep("1")}>
            <button>Anuncios</button>
          </li>
          <li onClick={() => setStep("2")}>
            <button>Joias</button>
          </li>
          <li onClick={() => setStep("3")}>
            <button>Usuarios</button>
          </li>
          <li onClick={() => setStep("4")}>
            <button>Newsletter</button>
          </li>
          <li onClick={() => setStep("5")}>
            <button>Vendas</button>
          </li>
        </ul>
      </div>

      <div className="Admin__all">
        {step === "1" && (
          <div>
            <CrudAnuncios />
          </div>
        )}
        {step === "2" && <div>Joias Component</div>}
        {step === "3" && <div>Usuarios Component</div>}
        {step === "4" && <div>Newsletter Component</div>}
        {step === "5" && <div>Vendas Component</div>}
      </div>
    </div>
  );
}

export default AdminPage;
