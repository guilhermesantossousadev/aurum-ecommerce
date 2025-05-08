import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import "../styles/Home.css";
import video from "../images/videoplayback.mp4";
import adage from "../images/adage.png";
import campaing from "../images/campaing.png";
import webby from "../images/webby.png";

import anel from "../images/AnelHome.jpg";
import corrente from "../images/CorrenteHome.jpg";
import pulseira from "../images/PulseiraHome.jpg";
import relogio from "../images/RelogioHome.jpg";
import brinco from "../images/BrincoHome.jpg";
import pingente from "../images/PingenteHome.jpg";

function Home() {
  const [hideTitle, setHideTitle] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  useEffect(() => {
    setTimeout(() => setHideTitle(true), 500); // Esconde o título após 1.5s
    setTimeout(() => setHideOverlay(true), 2000); // Remove a cortina após 3s
  }, []);

  return (
    <>
      <section className="Home">
        {!hideOverlay && (
          <motion.div
            className="overlay"
            initial={{ y: 0 }}
            animate={{ y: hideTitle ? "-100%" : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {!hideTitle && (
              <motion.h1
                className="title"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="a__Aurun">Aurum</p>
                <p className="a__Aurun lumine">/Lumine</p>
              </motion.h1>
            )}
          </motion.div>
        )}
        <div className="Banner">
          <video autoPlay muted loop className="video-bg">
            <source src={video} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
        <section className="Home__bg">
          <div className="Home__Hero">
            <div className="Home__Hero__container">
              <div className="Home__Hero__item">
                <div className="Home__Hero__item__img">
                  <img src={adage} alt="imagem" />
                </div>
                <div className="Home__Hero__item__text">
                  <p>Design and Branding Agency of the Year</p>
                </div>
              </div>
              <div className="Home__Hero__item">
                <div className="Home__Hero__item__img">
                  <img src={webby} alt="imagem" />
                </div>
                <div className="Home__Hero__item__text">
                  <p>Agency of the Year</p>
                </div>
              </div>
              <div className="Home__Hero__item">
                <div className="Home__Hero__item__img">
                  <img src={campaing} alt="imagem" />
                </div>
                <div className="Home__Hero__item__text">
                  <p> Digital Innovation Agency of the Year Finalist</p>
                </div>
              </div>
            </div>
          </div>

          <div className="part"><div className="part__inside"></div></div>

          <div className="Home__delta">
            <div className="Home__delta__container">
              <div className="Home__delta__left">
                <h2>
                  Aurum Lumine® é uma joalheria digital que une arte,
                  luxo e tecnologia para criar experiências de e-commerce exclusivas.
                  Especializada em joias cravejadas,
                  transformamos elegância e valor cultural em peças que refletem sofisticação e autenticidade.
                </h2>
                <button>Veja nossos Servicos</button>
              </div>
              <div className="Home__delta__right">
                <h1> A/L®</h1>
              </div>
            </div>
          </div>

          <div className="part"><div className="part__inside"></div></div>

          <div className="Home__Echo">
            <div className="Home__Echo__container">
              <div className="Home__Echo__container__row">
                <Link to="/catalogoRelogio" className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={relogio} alt="relogio" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    relógios
                  </div>
                </Link>

                <Link to="/catalogoColar" className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={corrente} alt="corrente" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    correntes
                  </div>
                </Link>
                <Link to="/catalogoPulseira" className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={pulseira} alt="pulseira" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    pulseiras
                  </div>
                </Link>
              </div>

              <div className="Home__Echo__container__row">
                <Link to="/catalogoAnel" className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={anel} alt="anel" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    Aneis
                  </div>
                </Link>
                <Link to="/catalogoPingente" className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={pingente} alt="pingente" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    Pingente
                  </div>
                </Link>
                <Link to="/catalogoBrinco" className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={brinco} alt="brinco" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    brincos
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </section>
      </section>
    </>
  );
}

export default Home;
