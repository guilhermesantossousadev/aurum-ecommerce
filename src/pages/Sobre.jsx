import React, { useState, useEffect } from "react";

import "../styles/Sobre.css";
import img1 from "../images/Photo1About.jpg";
import img2 from "../images/Photo2About.jpg";
import img3 from "../images/Photo3About.png";
import img4 from "../images/Photo4About.jpg";

import imgA from "../images/Photo4About.jpg";
import imgB from "../images/Photo1About.jpg";
import imgC from "../images/Photo2About.jpg";

const palavras = [
  { texto: "Webby Awards", imagem: imgA },
  { texto: "Adweek", imagem: imgB },
  { texto: "Awwwards", imagem: imgC },
  { texto: "D&AD", imagem: imgB },
  { texto: "One Show", imagem: imgC },
  { texto: "The FWA", imagem: imgC },
  { texto: "Comm Arts", imagem: imgC },
];

const Sobre = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Tamanho da imagem para calcular o centro
  const imgWidth = 450;
  const imgHeight = 550;

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
            ● <span> em valor empresarial</span>
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

      <div className="Sobre__Capabilities">
        <div className="Sobre__Capabilities__container">
          <div className="Sobre__Capabilities__container__item">
            <h1>Capabilities</h1>
          </div>
          <div className="Sobre__Capabilities__container__internal">
            <div className="Sobre__Capabilities__container__item">
              <h2>CX, Commerce, & Product Design</h2>
              <ul>
                <li>Market Analysis & Business Case Development</li>
                <li>Customer Research, Segmentation & Insights</li>
                <li>Journey Mapping & Testing</li>
                <li>Innovation Sprints & Prototyping</li>
                <li>Experience Strategy & Design</li>
                <li>Content Strategy & IA</li>
                <li>Design Systems & Guidelines</li>
                <li>Website & App Design</li>
                <li>UI Design</li>
                <li>Interaction Design</li>
                <li>Full-Stack Development & CMS Implementation</li>
                <li>Technical Consultation and Architecture</li>
              </ul>
            </div>
            <div className="Sobre__Capabilities__container__item">
              <h2>Digital-First Branding</h2>
              <ul>
                <li>Brand Ecosystem & Roadmap</li>
                <li>Business Intelligence</li>
                <li>Brand Positioning & Architecture</li>
                <li>Brand Messaging</li>
                <li>Visual Identity</li>
                <li>Brand Guidelines & Playbooks</li>
                <li>Visual Design</li>
                <li>Graphic Design</li>
                <li>Art Direction</li>
                <li>
                  Asset Production (Video, 3D, Photography, Motion Design)
                </li>
                <li>Brand Naming</li>
                <li>Go-To-Market Strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="Sobre__awards">
        <div className="Sobre__awards__item">
          <h1>Awards</h1>
        </div>
        <div className="Sobre__awards__item">
          <h2>
            While results are what matter most, we believe awards bring value
            and recognition to organizations as well as individuals.
          </h2>
        </div>
      </div>

      <div className="Sobre__Hoverimgs">
        <div className="Sobre__Hoverimgs__item">
          <h1 className="titulo">
            <ul>
              {palavras.map((p, i) => (
                <li
                  key={i}
                  className={`palavra ${hoverIndex === i ? "active" : ""}`}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <span>{p.texto}</span>
                </li>
              ))}
            </ul>
          </h1>

          {hoverIndex !== null && (
            <img
              src={palavras[hoverIndex].imagem}
              alt=""
              className="imagem-hover"
              style={{
                top: mousePos.y - imgHeight / 2,
                left: mousePos.x - imgWidth / 2,
                width: `${imgWidth}px`,
                height: `${imgHeight}px`,
              }}
            />
          )}
        </div>
        <div className="Sobre__Hoverimgs__item rigth"></div>
      </div>
    </div>
  );
};

export default Sobre;
