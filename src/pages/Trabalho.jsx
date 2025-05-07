import "../styles/Trabalho.css";
import anel from "../images/AnelHome.jpg";

function Trabalho() {
  return (
    <>
      <div className="Trabalho">
        <div className="Trabalho__container">
          <div className="Trabalho__container__item">
            <h1 className="Trabalho__container__item__h1__left">
              Easy to understand. ●Impossible to ignore.
            </h1>
          </div>

          <div className="Trabalho__container__item right">
            <h3 className="Trabalho__container__item__right h3">
              The work we create lives at the intersection of clarity and
              surprise and positions brands in culture through shared values and
              ideals.
            </h3>
          </div>
        </div>

        <div className="Horizontal__part">
          <div className="Horizontal__part__inside"></div>
        </div>

        {/*Box Container 1*/}
        <div className="Box__container">
          <div className="Box__item first">
            <h1>Branded eCommerce </h1>
            <h4>
              We go beyond best practices and build best-in-class D2C channels
              that drive commerce, shape culture, and define categories.
            </h4>
            <button>Learn More</button>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
          <div className="Box__item">
            {" "}
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
        </div>

        <div className="Horizontal__part">
          <div className="Horizontal__part__inside"></div>
        </div>

        {/*Box Container 2*/}
        <div className="Box__container">
          <div className="Box__item first">
            <h1>Websites + Platforms </h1>
            <h4>
              We conceive and create experiences that immerse consumers in the
              brand through a combination of utility and creativity.
            </h4>
            <button>Learn More</button>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
          <div className="Box__item">
            {" "}
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
        </div>

        <div className="Horizontal__part">
          <div className="Horizontal__part__inside"></div>
        </div>

        {/*Box Container 3*/}
        <div className="Box__container">
          <div className="Box__item first">
            <h1>Branding + Advertising </h1>
            <h4>
              We create identities, platforms, and activations that
              differentiate brands and position them to matter in culture.
            </h4>
            <button>Learn More</button>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
        </div>

        <div className="Horizontal__part">
          <div className="Horizontal__part__inside"></div>
        </div>

        {/*Box Container 4*/}
        <div className="Box__container">
          <div className="Box__item first">
            <h1>Digital Products + Services </h1>
            <h4>
              We identify and create digital products and services that create
              revenue channels and help brands thrive in the new economy.
            </h4>
            <button>Learn More</button>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
          <div className="Box__item">
            {" "}
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={anel} alt="anel" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>WHOOP</h1>
              <p>
                WHOOP.com — Building a sophisticated digital experience for a
                one-of-a-kind product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trabalho;
