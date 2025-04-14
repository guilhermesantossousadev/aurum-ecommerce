import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";
import video from "../images/videoplayback.mp4";
import adage from "../images/Adage.png";
import campaing from "../images/campaing.png";
import webby from "../images/webby.png";

import corrente from "../images/corrente.png";
import pulseira from "../images/pulseira.png";
import relogio from "../images/relogio.png";

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
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {!hideTitle && (
              <motion.h1
                className="title"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="a__Aurun">Bem-Vindo</p>
                <p className="a__Aurun">ao</p>
                <p className="a__Aurun">Aurum</p>
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

          <hr></hr>

          <div className="Home__delta">
            <div className="Home__delta__container">
              <div className="Home__delta__left">
                <h2>
                  Aurum® is a global branding and digital design agency building
                  products, services, and eCommerce experiences that turn
                  cultural values into company value.
                </h2>
                <button>See The Work</button>
              </div>
              <div className="Home__delta__right">
                <h1> A/L®</h1>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="Home__Echo">
            <div className="Home__Echo__container">
              
              <div className="Home__Echo__container__box">
                <div className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={relogio} alt="relogio" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    an Ecommerce experience of relogios
                  </div>
                </div>
                <div className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={corrente} alt="corrente" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    an Ecommerce experience of correntes
                  </div>
                </div>
                <div className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">
                    <img src={pulseira} alt="pulseira" />
                  </div>
                  <div className="Home__Echo__container__item__text">
                    an Ecommerce experience of pulseiras
                  </div>
                </div>
              </div>

              <div className="Home__Echo__container__box">
                <div className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">teste</div>
                  <div className="Home__Echo__container__item__text">teste</div>
                </div>
                <div className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">teste</div>
                  <div className="Home__Echo__container__item__text">teste</div>
                </div>
                <div className="Home__Echo__container__item">
                  <div className="Home__Echo__container__item__img">teste</div>
                  <div className="Home__Echo__container__item__text">teste</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Home;
