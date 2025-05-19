import "../styles/Carreiras.css";
import carreirasimg from "../images/carreirasimg.jpeg";

function Carreiras() {
  return (
    <>
      <div className="Carreiras">
        <div className="Carreiras__container">
          <div className="Carreiras__container__item left">
            <h1>Make DopeSh*t. ● Get Paid.</h1>
            <h4>
              Make great work. Work with great people. BASIC/DEPT®, Inc 10 - 25©
            </h4>
          </div>
          <div className="Carreiras__container__item right">
            <div className="Carreiras__container__item__top">
              <div className="Carreiras__container__item__top__img">
                <img src={carreirasimg} alt="carreirasimg" />
              </div>
            </div>

            <div className="Carreiras__container__item__bottom">
              <div className="Carreiras__container__item__bottom__left">
                <h2>
                  As part of Dept, we operate offices across the world. We’re
                  always looking to connect with individuals who want to make
                  the best work of their lives with the world’s greatest brands.
                  If you’re interested in working with us or learning more, drop
                  us a note, portfolio link, or résumé. We’ll take anything
                  you’ve got.
                </h2>
              </div>
              <div className="Carreiras__container__item__bottom__right">
                <p>●</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carreiras;
