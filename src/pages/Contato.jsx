import "../styles/Contato.css";
import contatoimg from "../images/contatoimg.jpeg";

function Contato() {
  return (
    <>
      <div className="Contato">
        <div className="Contato__init">
          <div className="Contato__init__item fade-in-up">
            <img src={contatoimg} alt="contatoimg" width="200px" />
          </div>
          <div className="Contato__init__item right">
            <div className="Contato__init__item__top">
              <h1 className="fade-in-up">A/L® CONTATO</h1>
              <p className="fade-in-up">
                Fácil de entender. Impossível de ignorar.™ BASIC/DEPT®, Inc 10 -
                25©
              </p>
            </div>

            <div className="Contato__init__item__bottom">
              <div className="Contato__init__item__bottom__left">
                <h1>●</h1>
              </div>
              <div className="Contato__init__item__bottom__right">
                <div className="Contato__init__item__bottom__right__top">
                  <div className="Contato__init__item__bottom__right__top__item">
                    <h1>Novos negócios</h1>
                    <span>biz@aurumlumine.com</span>
                  </div>
                  <div className="Contato__init__item__bottom__right__top__item">
                    <h1>Em geral</h1>
                    <span>hi@aurumlumine.com</span>
                  </div>
                </div>

                <div className="Contato__init__item__bottom__right__bottom">
                  <div className="Contato__init__item__bottom__right__bottom__item">
                    <h1>Imprensa</h1>
                    <span>press@aurumlumine.com</span>
                  </div>
                  <div className="Contato__init__item__bottom__right__bottom__item">
                    <h1>Junte-se a nós</h1>
                    <span>recruitment@aurumlumine.com</span>
                    <h3>(Várias Aberturas)</h3>
                  </div>
                </div>

                <div className="Contato__init__item__bottom__right__bottom">
                  <div className="Contato__init__item__bottom__right__bottom__item">
                    <h1>Follow</h1>
                  </div>
                  <div className="Contato__init__item__bottom__right__bottom__item">
                    <h1>Social</h1>
                    <ul>
                      <li>Instagram</li>
                      <li>Twitter</li>
                      <li>Linkedin</li>
                      <li>Facebook</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contato;
