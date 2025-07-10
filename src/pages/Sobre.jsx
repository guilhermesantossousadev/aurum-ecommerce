import React, { useState, useEffect } from "react";

import "../styles/pages/Sobre.css";
import img1 from "../images/Sobre/Photo1.jpg";
import img2 from "../images/Sobre/Photo2.jpg";
import img3 from "../images/Sobre/Photo3.png";
import img4 from "../images/Sobre/Photo4.jpg";

import imgA from "../images/Sobre/Photo4.jpg";
import imgB from "../images/Sobre/Photo1.jpg";
import imgC from "../images/Sobre/Photo2.jpg";

const palavras = [
  { texto: "Couture Design Awards", imagem: imgA },
  { texto: "JNA Awards", imagem: imgB },
  { texto: "HRD Antwerp Design Awards", imagem: imgC },
  { texto: "Jewellery World Awards", imagem: imgB },
  { texto: "Inhorgenta Award", imagem: imgC },
  { texto: "Goldsmiths’ Craft & Design Council Awards", imagem: imgC },
  { texto: "Red Dot Award: Product Design", imagem: imgC },
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
            A Aurum Lumine® é uma joalheria digital que prospera na intersecção
            entre design, dados e tecnologia. Juntos, estamos focados em
            transformar joias e culturas — em todo o mundo. Estratégia.
            Experiência de Marca. Experiência Digital. Detalhes. Tecnologia.
            Somos exclusivamente criados para construir joias que importam na
            cultura.
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

      <div id="panorama" className="Sobre__hero">
        <div className="Sobre__hero__item__left">
          <h1>Panorama da Empresa</h1>
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

      <div id="capacidades" className="Sobre__Capabilities">
        <div className="Sobre__Capabilities__container">
          <div className="Sobre__Capabilities__container__item">
            <h1>Capacidades</h1>
          </div>
          <div className="Sobre__Capabilities__container__internal">
            <div className="Sobre__Capabilities__container__item">
              <h2>Comércio e Design de Produto</h2>
              <ul>
                <li>Market Analysis & Business Case Development</li>
                <li>Catálogo Digital de Joias </li>
                <li>E-commerce com Carrinho de Compras</li>
                <li>Personalização de Joias </li>
                <li>Emissão de Nota Fiscal Eletrônica</li>
                <li>Suporte ao Cliente (E-mail)</li>
                <li>Certificação de Autenticidade</li>
                <li>Marketing Digital</li>
                <li>Segurança</li>
                <li>Proteção de Dados</li>
              </ul>
            </div>
            <div className="Sobre__Capabilities__container__item">
              <h2>Branding</h2>
              <ul>
                <li>Ecossistema</li>
                <li>Inteligência Empresarial</li>
                <li>Arquitetura de Marca</li>
                <li>Mensagem da Marca</li>
                <li>Identidade Visual</li>
                <li>Diretrizes</li>
                <li>Design Visual</li>
                <li>Design Gráfico</li>
                <li>Nomenclatura da marca</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="premiacoes" className="Sobre__awards">
        <div className="Sobre__awards__item">
          <h1>Premiações</h1>
        </div>
        <div className="Sobre__awards__item">
          <h2>
            Embora os resultados sejam o mais importante, acreditamos que os
            prêmios agregam valor e reconhecimento às joias e também aos
            indivíduos.
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
