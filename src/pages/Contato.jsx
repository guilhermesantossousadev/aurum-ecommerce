import "../styles/Contato.css";
import contatoimg from "../images/contatoimg.jpeg";
import sandiego from "../images/offices/sandiego.webp";
import newyork from "../images/offices/newyork.webp";
import bayarea from "../images/offices/bayarea.webp";
import stlouis from "../images/offices/stlouis.webp";
import amsterdam from "../images/offices/amsterdam.webp";
import london from "../images/offices/london.webp";
import berlin from "../images/offices/berlin.webp";
import argentina from "../images/offices/argentina.webp";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Contato() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <div className="Contato">
        {/* Seção inicial */}
        <div className="Contato__init">{/* ... Código existente ... */}</div>

        {/* Seção de escritórios */}
        <div className="Contato__offices">
          {/* Box Container 1 */}
          <div className="Contato__Box__container">
            <div className="Contato__Box__item first">
              <h1>OFFICES</h1>
            </div>
            <div className="Contato__Box__item" id="sandiego">
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
            <div className="Contato__Box__item" id="newyork">
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

          {/* Repetir para os demais */}
          <div className="Contato__Horizontal__part">
            <div className="Contato__Horizontal__part__inside"></div>
          </div>

          <div className="Contato__Box__container">
            <div className="Contato__Box__item first"></div>
            <div className="Contato__Box__item" id="bayarea">
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
            <div className="Contato__Box__item" id="stlouis">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
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

          <div className="Contato__Box__container">
            <div className="Contato__Box__item first"></div>
            <div className="Contato__Box__item" id="amsterdam">
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
            <div className="Contato__Box__item" id="london">
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

          <div className="Contato__Box__container">
            <div className="Contato__Box__item first"></div>
            <div className="Contato__Box__item" id="berlin">
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
            <div className="Contato__Box__item" id="argentina">
              <div className="Contato__Box__item__top">
                <div className="Contato__Box__item__top__img">
                  <img src={argentina} alt="argentina" />
                </div>
              </div>
              <div className="Contato__Box__item__bottom">
                <h1>Argentina</h1>
                <p>
                  Buenos Aires, Argentina (Endereço completo não disponível)
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
