import { Link } from "react-router-dom";
import "../../styles/pages/StatusPages/StatusPage.css";

import { FaTimesCircle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="status-page error">
      <h1>Ocorreu um erro na sua compra.</h1>
      <FaTimesCircle className="icon" />
      <p>Tente novamente mais tarde.</p>
      <Link to="/">Voltar para o site</Link>
    </div>
  );
};

export default ErrorPage;
