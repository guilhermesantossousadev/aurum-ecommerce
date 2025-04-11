import { useState, useEffect } from "react";
import "../styles/Home.css";
import video from "../images/videoplayback.mp4"

function Home() {
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientY <= 120) {
        setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      } else {
        setPosition({ x: event.clientX, y: event.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <section className="Home">
        <div className="Banner">
          <video autoPlay muted loop className="video-bg">
            <source src={video} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
        {/* <div
          className="cursor-follow"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0 ease-out, top 0 ease-out",
          }}
        >
          <span className="cursor-text">
            <p>Watch</p>
            <p>Reel</p>
          </span>
        </div> */}
      </section>
    </>
  );
}

export default Home;
