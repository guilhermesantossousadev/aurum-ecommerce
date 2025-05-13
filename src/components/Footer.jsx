import "../styles/Footer.css";
import setadireitabranca from "../images/seta-direita-branca.png";
import setadireitapreta from "../images/seta-direita.png";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  const getFooterColorClass = () => {
    const path = location.pathname;
    if (["/", "/contato"].includes(path)) return "white-text";
    //if (path === "/sobre") return "pink-text";
    if (["/servicos", "/carreiras", "/carrinho", "/profile", "/contato", "/sobre"].includes(path)) return "black-text";
    return "pink-text";
  };

  const footerColorClass = getFooterColorClass();

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de envio de email
  };

  return (
    <footer className={`footer ${footerColorClass}`}>
      <div className="footer__top">
        <div className="footer__item">
          <div className={`footer__item__top ${footerColorClass}`}>
            <h1>A/L®</h1>
          </div>

          <div className="footer__item__bottom">
            <form onSubmit={handleSubmit}>
              <h1 className={`footer__item__bottom__title ${footerColorClass}`}>
                ● ESTEJA POR DENTRO.
              </h1>
              <input type="email" placeholder="Email" className={`input__footer ${footerColorClass}`} />
              <button type="submit">
                <img
                  src={footerColorClass === "black-text" ? setadireitapreta : setadireitabranca}
                  alt="seta direita"
                />
              </button>
            </form>
          </div>
        </div>

        <div className="footer__item">
          <div className={`footer__item__top ${footerColorClass}`}>
            NOS COLABORAMOS COM MARCAS E PESSOAS AMBICIOSAS. VAMOS COLABORAR. AURUMLUMINE@GMAIL.COM
          </div>

          <div className="footer__item__bottom">
            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● SOCIAL</h1>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Linkedin</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>

            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● INICIATIVAS</h1>
              <li><a href="#">Applied</a></li>
              <li><a href="#">BrandBeats</a></li>
              <li><a href="#">Moves</a></li>
              <li><a href="#">B/Good</a></li>
            </ul>

            <ul className={`footer__item__bottom__ul ${footerColorClass}`}>
              <h1>● ESCRITÓRIOS</h1>
              <li><a href="#">San Diego - CA</a></li>
              <li><a href="#">New York - NY</a></li>
              <li><a href="#">Bay Area - CA</a></li>
              <li><a href="#">ST.Louis - MO</a></li>
              <li><a href="#">Amsterdan - NL</a></li>
              <li><a href="#">London - EN</a></li>
              <li><a href="#">Berlin - GE</a></li>
              <li><a href="#">Argentina - AR</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom__item">AURUM/LUMINE®, Inc 10 - 25©</div>
        <div className="footer__bottom__item">Fácil de entender, impossível de ignorar.™</div>
        <div className="footer__bottom__item">Termos, Política de Privacidade</div>
      </div>
    </footer>
  );
}

export default Footer;
