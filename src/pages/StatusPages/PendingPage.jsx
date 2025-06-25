import { Link } from "react-router-dom";
import "../../styles/pages/StatusPages/StatusPage.css";

import { FaSpinner } from "react-icons/fa";

const PendingPage = () => {
  return (
    <div className="status-page pending">
      <h1>Compra em processamento...</h1>
      <FaSpinner className="icon spin" />
      <p>Estamos aguardando a confirmação do pagamento.</p>
      <Link to="/">Voltar para o site</Link>
    </div>
  );
};

export default PendingPage;
