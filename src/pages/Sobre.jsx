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
          <h1 className="Sobre__container__item__h1__left fade-in-up">
            Nos transformamos valores culturais
          </h1>
        </div>

        <div className="Sobre__container__item">
          <h1 className="Sobre__container__item__right fade-in-up">
            ● em valor empresarial
          </h1>
          <h3 className="Sobre__container__item__right_h3 fade-in-up">
            A AURUM/LUMINE® é uma agência global que prospera na intersecção
            entre design, dados e tecnologia. Juntos, estamos focados em
            transformar marcas e culturas — em todo o mundo.
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

      <div className="Sobre__hero">
        <div className="Sobre__hero__item__left">
          <h1>Instantâneo da agência</h1>
        </div>
        <div className="Sobre__hero__item__right">
          <div className="Sobre__hero__item__right__top">
            <div className="Sobre__hero__item__right__top__left">
              <h1 className="Sobre__hero__item__right__top__left">Pessoas</h1>
              <span className="Sobre__hero__item__right__top__left">120+</span>
              <p className="Sobre__hero__item__right__top__left">
                Somos uma equipe de alto nível, composta por pessoas diversas
                que estão aqui para fazer um ótimo trabalho e ser uma ótima
                companhia para trabalhar.
              </p>
            </div>
            <div className="Sobre__hero__item__right__top__right">
              <h1 className="Sobre__hero__item__right__top__right">
                Alcance global
              </h1>
              <span className="Sobre__hero__item__right__top__right">28</span>
              <p className="Sobre__hero__item__right__top__right">
                Como parte do Dept, temos 28 escritórios e mais de 1.500 pessoas
                em todo o mundo dedicadas a fornecer os melhores serviços de
                design, estratégia e tecnologia aos nossos clientes parceiros.
              </p>
            </div>
          </div>

          <div className="Sobre__hero__item__right__mid">
            <div className="Sobre__hero__item__right__mid__left">
              <h1>Anos</h1>
              <span>10</span>
              <p>
                Embora tenhamos orgulho da nossa história e das nossas
                realizações, somos leais ao nosso futuro e não ao nosso passado.
              </p>
            </div>
            <div className="Sobre__hero__item__right__mid__right">
              <h1>Crescimento</h1>
              <span>168%</span>
              <p>
                Como a 18ª agência de crescimento mais rápido da Adweek,
                fortalecemos nossa empresa com novas lideranças, talentos e
                clientes nos últimos dois anos. Aliás, estamos contratando.
              </p>
            </div>
          </div>

          <div className="Sobre__hero__item__right__bottom">
            <div className="Sobre__hero__item__right__bottom__left">
              <h1>Serviços</h1>
              <span>05</span>
              <p>
                Estratégia. Experiência de Marca. Experiência Digital. Conteúdo.
                Tecnologia. Somos exclusivamente criados para construir marcas
                que importam na cultura.
              </p>
            </div>
            <div className="Sobre__hero__item__right__bottom__right">
              <h1>Classificação</h1>
              <span>01</span>
              <p>
                Nas categorias relacionadas a dispositivos móveis e sites,
                nenhuma outra agência foi reconhecida pelo Webby Awards mais do
                que nós nos últimos quatro anos. Explore nosso trabalho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
