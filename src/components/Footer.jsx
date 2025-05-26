import "../styles/Footer.css";
import setadireitabranca from "../images/seta-direita-branca.png";
import setadireitapreta from "../images/seta-direita.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState("");

  const getFooterColorClass = () => {
    const path = location.pathname;
    if (
      [
        "/",
        "/contato",
        "/login",
        "/register",
        "/token-authentication",
      ].includes(path)
    )
      return "white-text";
    if (
      [
        "/servicos",
        "/carreiras",
        "/carrinho",
        "/profile",
        "/contato",
        "/sobre",
      ].includes(path)
    )
      return "black-text";
    return "pink-text";
  };

  const footerColorClass = getFooterColorClass();

  const sendNewsLetter = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://localhost:7081/api/Newsletter/PostNewsletter?usuarioEmail=${email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Erro ao enviar newsletter");

      alert("Email cadastrado com sucesso!");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o email.");
    }
  };

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
              />
              <button type="submit">
                <img
                  src={
                    footerColorClass === "black-text"
                      ? setadireitapreta
                      : setadireitabranca
                  }
                  alt="seta direita"
                />
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
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Linkedin</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
            </ul>

            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● INICIATIVAS</h1>
              <li>
                <a href="#">Applied</a>
              </li>
              <li>
                <a href="#">BrandBeats</a>
              </li>
              <li>
                <a href="#">Moves</a>
              </li>
              <li>
                <a href="#">B/Good</a>
              </li>
            </ul>

            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● ESCRITÓRIOS</h1>
              <li>
                <a href="#">San Diego - CA</a>
              </li>
              <li>
                <a href="#">New York - NY</a>
              </li>
              <li>
                <a href="#">Bay Area - CA</a>
              </li>
              <li>
                <a href="#">ST.Louis - MO</a>
              </li>
              <li>
                <a href="#">Amsterdan - NL</a>
              </li>
              <li>
                <a href="#">London - EN</a>
              </li>
              <li>
                <a href="#">Berlin - GE</a>
              </li>
              <li>
                <a href="#">Argentina - AR</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        {/*
        <div className="footer__bottom__item">AURUM/LUMINE®, Inc 10 - 25©</div>
        <div className="footer__bottom__item">
          Fácil de entender, impossível de ignorar.™
        </div>
        <div className="footer__bottom__item">
          Termos, Política de Privacidade
        </div>
        */} 
      </div>
    </footer>
  );
}

export default Footer;
