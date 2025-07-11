import "../styles/components/Footer.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

import setadireitabranca from "../images/Setas/setadireitabranca.png";
import setadireitapreta from "../images/Setas/SetaPretaDireita.png";
import SetaRosaDireita from "../images/Setas/SetaRosaDireita.png";

function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // adiciona loading

  const getFooterColorClass = () => {
    const path = location.pathname;
    if (
      [
        "/",
        "/contato",
        "/login",
        "/register",
        "/token-authentication",
        "/servicos",
        "/catalogo",
        "/catalogo/todos",
        "/catalogo/relogio",
        "/catalogo/colar",
        "/catalogo/pulseira",
        "/catalogo/anel",
        "/catalogo/pingente",
        "/catalogo/brinco",
      ].includes(path)
    )
      return "white-text";
    if (
      [
        "/carrinho",
        "/contato",
        "/adminPage",
        "/catalogo/todos",
        "/catalogo/relogio",
        "/catalogo/colar",
        "/catalogo/pulseira",
        "/catalogo/anel",
        "/catalogo/pingente",
        "/catalogo/brinco",
        "/successPage",
        "/errorPage",
        "/pendingPage",
      ].includes(path)
    )
      return "black-text";
    return "pink-text";
  };

  const footerColorClass = getFooterColorClass();

  const sendNewsLetter = async (e) => {
    e.preventDefault();
    setLoading(true); // inicia loading
    try {
      const response = await fetch(
        `https://marketplacejoias-api-latest.onrender.com/api/Newsletter/PostNewsletter?usuarioEmail=${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Erro ao enviar newsletter");
      toast.success("Email cadastrado com sucesso!");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao cadastrar o email.");
    } finally {
      setLoading(false); // finaliza loading
    }
  };

  const offices = [
    { name: "San Diego", id: "sandiego" },
    { name: "New York", id: "newyork" },
    { name: "Bay Area", id: "bayarea" },
    { name: "St. Louis", id: "stlouis" },
    { name: "Amsterdam", id: "amsterdam" },
    { name: "London", id: "london" },
    { name: "Berlin", id: "berlin" },
    { name: "Argentina", id: "argentina" },
  ];

  return (
    <footer className={`footer ${footerColorClass}`}>
      <div className="footer__top">
        <div className="footer__item">
          <div className={`footer__item__top ${footerColorClass} left`}>
            <h1>A/L®</h1>
          </div>
          <div className="footer__item__bottom">
            <form onSubmit={sendNewsLetter}>
              <h1 className={`footer__item__bottom__title ${footerColorClass}`}>
                ● ESTEJA POR DENTRO.
              </h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input__footer ${footerColorClass}`}
                disabled={loading} // opcional: impede digitação durante loading
              />
              <button type="submit" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <img
                    src={
                      footerColorClass === "black-text"
                        ? setadireitapreta
                        : footerColorClass === "pink-text"
                        ? SetaRosaDireita
                        : setadireitabranca
                    }
                    alt="seta direita"
                  />
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="footer__item">
          <div className={`footer__item__top ${footerColorClass} right`}>
            <h1>
              NOS COLABORAMOS COM MARCAS E PESSOAS AMBICIOSAS. VAMOS COLABORAR.
              AURUMLUMINE@GMAIL.COM
            </h1>
          </div>

          <div className="footer__item__bottom">
            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● SOCIAL</h1>
              <li>
                <a href="https://www.instagram.com/">Instagram</a>
              </li>
              <li>
                <a href="https://x.com/">Twitter</a>
              </li>
              <li>
                <a href="https://br.linkedin.com/">Linkedin</a>
              </li>
              <li>
                <a href="https://www.facebook.com/?locale=pt_BR">Facebook</a>
              </li>
            </ul>

            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● INICIATIVAS</h1>
              <li>
                <Link to="/sobre#panorama">Panorama</Link>
              </li>
              <li>
                <Link to="/sobre#capacidades">Capacidades</Link>
              </li>
              <li>
                <Link to="/sobre#premiacoes">Premiações</Link>
              </li>
            </ul>

            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● ESCRITÓRIOS</h1>
              {offices.map((office) => (
                <li key={office.id}>
                  <Link to={`/contato#${office.id}`}>{office.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom"></div>
    </footer>
  );
}

export default Footer;
