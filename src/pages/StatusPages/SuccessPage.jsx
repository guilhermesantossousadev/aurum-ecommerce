import { Link } from "react-router-dom";
import "../../styles/pages/StatusPages/StatusPage.css";

import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  return (
    <div className="status-page success">
      <h1>Compra realizada com sucesso!</h1>
      <FaCheckCircle className="icon success" />
      <p>Obrigado por comprar conosco.</p>
      <Link to="/">Voltar para o site</Link>
    </div>
  );
};

export default SuccessPage;
