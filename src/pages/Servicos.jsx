import "../styles/pages/Servicos.css";
import { Link } from "react-router-dom";

import Assinatura from "../images/AssinaturaEstetica.jpeg";
import Presenca from "../images/PresençaSensorial.jpg";
import Simbolos from "../images/SimbolosVivos.jpeg";
import Relogio from "../images/relogioVladmir.jpeg";
import Estilo from "../images/EstilocomSignificado.jpeg";
import Hope from "../images/Hope.jpg";
import Vinculo from "../images/VínculoSingular.png";
import Essencia from "../images/Essencia.jpeg";

function Servicos() {
  return (
    <>
      <div className="Servicos">
        <div className="Servicos__container">
          <div className="Servicos__container__item">
            <h1 className="Servicos__container__item__h1__left fade-in-up ">
              Fácil de entender. ●Impossível de ignorar.
            </h1>
          </div>

          <div className="Servicos__container__item right">
            <h3 className="Servicos__container__item__right h3 fade-in-up ">
              O trabalho que criamos vive na intersecção entre clareza e
              surpresa e posiciona joias na cultura por meio de valores e ideais
              compartilhados.
            </h3>
          </div>
        </div>

        <div className="Horizontal__part">
          <div className="Horizontal__part__inside"></div>
        </div>

        {/*Box Container 1*/}
        <div className="Box__container">
          <div className="Box__item first">
            <h1>Ourivesaria Cravação</h1>
            <h4>
              Nós vamos além das melhores práticas e criamos as melhores joias
              que impulsionam o comércio, moldam a cultura e definem categorias.
            </h4>
            <Link to="/sobre">
              <button>Saiba Mais</button>
            </Link>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Hope} alt="Hope" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>HOPE</h1>
              <p>
                Joia icônica com Diamante Azul de 45,52 quilates, raro e
                extremamente valioso.
              </p>
            </div>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Relogio} alt="Relogio" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>AUDEMARS PIGUET</h1>
              <p>
                Relógio Audemars Piguet cravejado, combina a tradição da marca
                com um design imponente e moderno, luxo absoluto com diamantes e
                design marcante.
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
            <h1>Personalidade Experiência </h1>
            <h4>
              Nós concebemos e criamos experiências que envolvem os consumidores
              por meio de uma combinação de personalidade e expressão.
            </h4>

            <Link to="/sobre">
              <button>Saiba Mais</button>
            </Link>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Assinatura} alt="Assinatura" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>ASSINATURA ESTÉTICA</h1>
              <p>
                Designs que refletem a personalidade por meio de formas, cores e
                detalhes únicos.
              </p>
            </div>
          </div>
          <div className="Box__item">
            {" "}
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Presenca} alt="Presença" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>PRESENÇA SENSORIAL</h1>
              <p>
                Joias que despertam emoções através do toque, brilho e interação
                com a luz.
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
            <h1>Identidade Cultura </h1>
            <h4>
              Criamos identidades, formas e personalidades que diferenciam joias
              e as posicionam para serem relevantes na cultura.
            </h4>
            <Link to="/sobre">
              <button>Saiba Mais</button>
            </Link>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Simbolos} alt="Simbolos" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>SÍMBOLOS VIVOS</h1>
              <p>
                Cada joia carrega mais que beleza — representa narrativas,
                crenças e estilos que conectam o passado ao presente. São
                artefatos contemporâneos com alma cultural.
              </p>
            </div>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Estilo} alt="Estilo" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>ESTILO COM SIGNIFICADO</h1>
              <p>
                Mais do que tendência, criamos peças que se alinham com
                identidades autênticas e refletem relevância dentro de contextos
                sociais e criativos.
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
            <h1>Conexão Autênticidade</h1>
            <h4>
              Identificamos e criamos joias que criam conexão provedor /
              consumidor e ajudam os clientes a encontrar sua personalidade,
              cultura e estilo.
            </h4>
            <Link to="/sobre">
              <button>Saiba Mais</button>
            </Link>
          </div>
          <div className="Box__item">
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Vinculo} alt="Vinculo" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>VÍNCULO SINGULAR</h1>
              <p>
                Joias que transcendem a estética, criando uma ligação verdadeira
                entre o criador e o usuário, conectando histórias e valores
                pessoais.
              </p>
            </div>
          </div>
          <div className="Box__item">
            {" "}
            <div className="Box__item__top">
              <div className="Box__item__top__img">
                <img src={Essencia} alt="Essencia" />
              </div>
            </div>
            <div className="Box__item__bottom">
              <h1>ESSÊNCIA</h1>
              <p>
                Designs que ajudam cada cliente a revelar sua identidade
                cultural e personalidade, tornando a joia uma extensão autêntica
                de quem é.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Servicos;
