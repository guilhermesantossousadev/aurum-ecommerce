import "../styles/Sobre.css";
import img1 from "../images/Photo1About.jpg";
import img2 from "../images/Photo2About.jpg";
import img3 from "../images/Photo3About.png";
import img4 from "../images/Photo4About.jpg";

const Sobre = () => {
  return (
    <div className="Sobre">
      <div className="Sobre__container">
        <div className="Sobre__container__item">
          <h1 className="Sobre__container__item__h1__left">
            We turn cultural values
          </h1>
        </div>

        <div className="Sobre__container__item">
          <h1 className="Sobre__container__item__right">
            ● into company value
          </h1>
          <h3 className="Sobre__container__item__right_h3">
            AURUM/LUMINE® is a global agency that thrives at the intersection of
            design, data, and technology. Together, we're focused on
            transforming brands and culture — across the world.
          </h3>
        </div>
      </div>

      <div className="Sobre__part">
        <div className="Sobre__part__top">A/L®</div>
        <div className="Sobre__part__inside"></div>
        <div className="Sobre__part__bottom">
          <div className="Sobre__part__bottom__item">2010 -</div>
          <div className="Sobre__part__bottom__item">Present</div>
          <div className="Sobre__part__bottom__item">●</div>
        </div>
      </div>

      <div className="images-stack-container">
        <div className="images-stack-wrapper">
          <div className="image-stack">
            <img src={img1} alt="Imagem 1" />
          </div>
          <div className="image-stack">
            <img src={img2} alt="Imagem 2" />
          </div>
          <div className="image-stack">
            <img src={img3} alt="Imagem 3" />
          </div>
          <div className="image-stack">
            <img src={img4} alt="Imagem 4" />
          </div>
        </div>

        <div className="image-stack-text">
          Fácil de Entender. Impossivel de ignorar.™ AURUM/LUMINE®, Inc 10 - 25©
        </div>
      </div>

      <div className="Sobre__bottom__part">
        <div className="Sobre__bottom__part__inside"></div>
      </div>

      <div className="Aurum">
        <h1>AURUM/LUMINE®</h1>
      </div>
      <div className="Sobre__bottom__part bottom">
        <div className="Sobre__bottom__part__inside"></div>
      </div>
    </div>
  );
};

export default Sobre;
