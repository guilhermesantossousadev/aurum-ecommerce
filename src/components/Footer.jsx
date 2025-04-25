import "../styles/Footer.css";
import setadireita from "../images/seta-direita.png";

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
            NOS COLABORAMOS COM DIVERSAS EMPRESAS
          </div>

          <div className="footer__item__bottom">
            {/*Ul 1*/}
            <ul className="footer__item__bottom__ul">
              <h1>● SOCIAL</h1>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
            </ul>

            {/*Ul 2*/}
            <ul className="footer__item__bottom__ul">
              <h1>● INICIATIVAS</h1>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
            </ul>

            {/*Ul 3*/}
            <ul className="footer__item__bottom__ul">
              <h1>● ESCRITORIOS</h1>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom__item">AURUM/LUMINE®, Inc 10 - 25©</div>
        <div className="footer__bottom__item">
          Easy to understand, impossible to ignore.™
        </div>
        <div className="footer__bottom__item">Terms, Privacy Policy</div>
      </div>
    </footer>
  );
}

export default Footer;
