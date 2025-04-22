import "../styles/News.css";

function News() {
  return (
    <>
      <div className="News">
        <div className="News__Header__container">
          <div className="Header__container__item">
            <h1>Notícias</h1>
          </div>
          <div className="Header__container__item pesquisa">pesquisa</div>
        </div>
        <div className="Filter__elements_container">
          <div className="Filter__elements__item"></div>
          <div className="Filter__elements__item">
            <div className="Filter__elements">
              <ul className="Ul__elements">
                <li className="Li__element">
                  <input type="checkbox" /> Anel
                </li>
                <li className="Li__element">
                  <input type="radio" /> Brinco
                </li>
                <li className="Li__element">
                  <input type="radio" /> Colar
                </li>
                <li className="Li__element">
                  <input type="radio" /> Piercing
                </li>
                <li className="Li__element">
                  <input type="radio" /> Pingente
                </li>
                <li className="Li__element">
                  <input type="radio" /> Pulseira
                </li>
                <li className="Li__element">
                  <input type="radio" /> Relogio
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="part">
          <div className="part__inside"></div>
        </div>
      </div>
    </>
  );
}

export default News;
