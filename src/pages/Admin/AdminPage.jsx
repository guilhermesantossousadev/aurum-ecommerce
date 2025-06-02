import { useState } from "react";
import "../../styles/Admin/AdminPage.css";

function AdminPage() {
  return (
    <div className="Admin">
      <div className="Admin__menu">
        <ul>
          <li>
            <button>Anuncios</button>
          </li>
          <li>
            <button>Joias</button>
          </li>
          <li>
            <button>Usuarios</button>
          </li>
          <li>
            <button>Newsletter</button>
          </li>
        </ul>
      </div>

      <div className="Admin__all"></div>
    </div>
  );
}

export default AdminPage;
