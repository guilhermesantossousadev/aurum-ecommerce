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

      <div className="Sobre__hero">
        <div className="Sobre__hero__item__left">
          <h1>Agency Snapshot</h1>
        </div>
        <div className="Sobre__hero__item__right">
          <div className="Sobre__hero__item__right__top">
            <div className="Sobre__hero__item__right__top__left">
              <h1>People</h1>
              <span>120+</span>
              <p>
                We're a world-class team of diverse individuals who are here to
                do great work as well as be great to work with.
              </p>
            </div>
            <div className="Sobre__hero__item__right__top__right">
              <h1>Global Reach</h1>
              <span>28</span>
              <p>
                As part of Dept, we have 28 offices and 1,500+ people across the
                world dedicated to delivering the best design, strategy, and
                technology services to our client partners.
              </p>
            </div>
          </div>

          <div className="Sobre__hero__item__right__mid">
            <div className="Sobre__hero__item__right__mid__left">
              <h1>Years</h1>
              <span>10</span>
              <p>
                While we’re proud of our history and our accomplishments, we’re
                loyal to our future and not our past.
              </p>
            </div>
            <div className="Sobre__hero__item__right__mid__right">
              <h1>Growth</h1>
              <span>168%</span>
              <p>
                As Adweek’s 18th fastest growing agency, we’ve strengthened our
                company with new leadership, talent, and clients the past two
                years. We’re hiring btw.
              </p>
            </div>
          </div>

          <div className="Sobre__hero__item__right__bottom">
            <div className="Sobre__hero__item__right__bottom__left">
              <h1>Services</h1>
              <span>05</span>
              <p>
                Strategy. Brand Experience. Digital Experience. Content.
                Technology. We’re uniquely built to build brands that matter in
                culture.
              </p>
            </div>
            <div className="Sobre__hero__item__right__bottom__right">
              <h1>Ranking</h1>
              <span>01</span>
              <p>
                Within the mobile and website related categories, no other
                agency has been recognized by the Webby Awards more than us the
                past four years. Explore our work.
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Sobre;
