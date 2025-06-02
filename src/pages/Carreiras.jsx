import "../styles/Carreiras.css";

import Carreirasimg from "../images/Carreiras.jpeg";

function Carreiras() {
  return (
    <>
      <div className="Carreiras">
        <div className="Carreiras__container">
          <div className="Carreiras__container__item left">
            <h1 className="fade-in-up">Faça Coisas incríveis. ● Seja pago.</h1>
            <h4>
              Faça um ótimo trabalho. Trabalhe com pessoas excelentes.
              BASIC/DEPT®, Inc 10 - 25©
            </h4>
          </div>
          <div className="Carreiras__container__item right">
            <div className="Carreiras__container__item__top">
              <div className="Carreiras__container__item__top__img fade-in-up">
                <img src={Carreirasimg} alt="Carreirasimg" />
              </div>
            </div>

            <div className="Carreiras__container__item__bottom">
              <div className="Carreiras__container__item__bottom__left">
                <h2>
                  Como parte do Aurum, operamos escritórios em todo o mundo.
                  Estamos sempre buscando nos conectar com pessoas que desejam
                  realizar o melhor trabalho de suas vidas com as maiores marcas
                  do mundo. Se você tem interesse em trabalhar conosco ou saber
                  mais, envie-nos uma mensagem, link do seu portfólio ou
                  currículo. Aceitamos qualquer proposta que você tenha.
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
