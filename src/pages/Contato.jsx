import "../styles/Contato.css";
import contatoimg from "../images/contatoimg.jpeg";

import anel from "../images/AnelHome.jpg";
import { Link } from "react-router-dom";

import sandiego from "../images/offices/sandiego.webp";
import newyork from "../images/offices/newyork.webp";
import bayarea from "../images/offices/bayarea.webp";
import stlouis from "../images/offices/stlouis.webp";
import amsterdam from "../images/offices/amsterdam.webp";
import london from "../images/offices/london.webp";
import berlin from "../images/offices/berlin.webp";
import argentina from "../images/offices/argentina.webp";

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

        <div className="Contato__offices">
          <div className="Contato__offices__Horizontal__part">
            <div className="Contato__offices__Horizontal__part__inside"></div>
          </div>
          {/*Box Container 1*/}
          <div className="Contato__Box__container">
            <div className="Contato__Box__item first">
              <h1>OFFICES</h1>
            </div>
            <div className="Contato__Box__item">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={sandiego} alt="sandiego" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>San Diego</h1>
                <p>350 Tenth Ave Suite 700 San Diego, CA 92101</p>
              </div>
            </div>
            <div className="Contato__Box__item">
              {" "}
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={newyork} alt="newyork" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>New York</h1>
                <p>36 E 20th St #6 New York, NY 10003</p>
              </div>
            </div>
          </div>

          <div className="Contato__Horizontal__part">
            <div className="Contato__Horizontal__part__inside"></div>
          </div>

          {/*Box Container 2*/}
          <div className="Contato__Box__container">
            <div className="Contato__Box__item first"></div>
            <div className="Contato__Box__item">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={bayarea} alt="bayarea" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>Bay Area</h1>
                <p>*The location of this office is undisclosed.</p>
              </div>
            </div>
            <div className="Contato__Box__item">
              {" "}
              <div className="Box__item__top">
                <div className="Box__item__top__img">
                  <img src={stlouis} alt="stlouis" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>St. Louis</h1>
                <p>4814 Washington Blvd Studio 240 St. Louis, Missouri 63108</p>
              </div>
            </div>
          </div>

          <div className="Contato__Horizontal__part">
            <div className="Contato__Horizontal__part__inside"></div>
          </div>

          {/*Box Container 3*/}
          <div className="Contato__Box__container">
            <div className="Contato__Box__item first"></div>
            <div className="Contato__Box__item">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={amsterdam} alt="amsterdam" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>Amsterdam</h1>
                <p>Generaal Vetterstraat 66 1059 BW Amsterdam</p>
              </div>
            </div>
            <div className="Contato__Box__item">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={london} alt="london" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>London</h1>
                <p>
                  Floor 9 & 10, Featherstone Building 66 City Rd, London EC1Y
                  2AL, United Kingdom
                </p>
              </div>
            </div>
          </div>

          <div className="Contato__Horizontal__part">
            <div className="Contato__Horizontal__part__inside"></div>
          </div>

          {/*Box Container 4*/}
          <div className="Contato__Box__container">
            <div className="Contato__Box__item first"></div>
            <div className="Contato__Box__item">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={berlin} alt="berlin" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>Berlin</h1>
                <p>Hagelberger Str. 53-54 10965 Berlin</p>
              </div>
            </div>
            <div className="Contato__Box__item">
              {" "}
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={argentina} alt="argentina" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>Argentina</h1>
                <p>
                  Garay 1802, B7600 Mar del Plata Provincia de Buenos Aires,
                  Argentina
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contato;
