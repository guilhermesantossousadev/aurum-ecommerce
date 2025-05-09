import "../styles/Footer.css";
import setadireita from "../images/seta-direita-branca.png";

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o email
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__item">
          <div className="footer__item__top">
            <h1>A/L®</h1>
          </div>

          <div className="footer__item__bottom">
            <form onSubmit={handleSubmit}>
              <h1 className="footer__item__bottom__title">
                ● ESTEJA POR DENTRO.
              </h1>
              <input type="email" placeholder="Email" />
              <button type="submit">
                <img src={setadireita} alt="seta direita" />
              </button>
            </form>
          </div>
        </div>

        <div className="footer__item">
          <div className="footer__item__top">
            NOS COLABORAMOS COM MARCAS E PESSOAS AMBICIOSAS.VAMOS COLABORAR. AURUMLUMINE@GMAIL.COM
          </div>

          <div className="footer__item__bottom">
            {/*Ul 1*/}
            <ul className="footer__item__bottom__ul">
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

            {/*Ul 2*/}
            <ul className="footer__item__bottom__ul">
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

            {/*Ul 3*/}
            <ul className="footer__item__bottom__ul">
              <h1>● ESCRITORIOS</h1>
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
        <div className="footer__bottom__item">AURUM/LUMINE®, Inc 10 - 25©</div>
        <div className="footer__bottom__item">
          Facil de enteder, impossivel de ignorar.™
        </div>
        <div className="footer__bottom__item">Termos, Politica de Privacidade</div>
      </div>
    </footer>
  );
}

export default Footer;
