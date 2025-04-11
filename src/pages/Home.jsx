import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Home.css";
import video from "../images/videoplayback.mp4";

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
      </section>
    </>
  );
}

export default Home;
