import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Catalogo.css";
import lupabranca from "../images/lupa-branca.png";

function Catalogo() {
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const anunciosPerPage = 7;
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // Resetar para a primeira página ao mudar o filtro
  };

  const getAnuncios = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://localhost:7081/api/Anuncio/GetAnuncio",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Falha na busca de anúncios. Verifique suas credenciais."
        );
      }

      const data = await response.json();
      setAnuncios(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
      setError(
        "Não foi possível carregar os anúncios. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  // Carregar anúncios quando o componente for montado
  useEffect(() => {
    getAnuncios();
  }, []);

  // Filtrar anúncios com base na seleção e termo de pesquisa
  const anunciosFiltrados = anuncios
    .filter((anuncio) => {
      if (selectedFilter === "todos") return true;
      return anuncio.tipoPeca.toLowerCase() === selectedFilter;
    })
    .filter((anuncio) => {
      if (!searchTerm) return true;
      return (
        anuncio.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anuncio.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  // Calcular índices para paginação
  const indexOfLastAnuncio = currentPage * anunciosPerPage;
  const indexOfFirstAnuncio = indexOfLastAnuncio - anunciosPerPage;
  const currentAnuncios = anunciosFiltrados.slice(
    indexOfFirstAnuncio,
    indexOfLastAnuncio
  );
  const totalPages = Math.ceil(anunciosFiltrados.length / anunciosPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Rolar para o topo da página
  };

  const handleAnuncioClick = (anuncioId) => {
    const fetchTipoJoia = async () => {
      try {
        const response = await fetch(
          `https://localhost:7081/api/Anuncio/GetByIdAnuncio?id=${anuncioId}`
        );

        if (!response.ok) {
          throw new Error("Não foi possível carregar os detalhes do anúncio");
        }

        const data = await response.json();
        const tipoJoia = data.tipoPeca.toLowerCase();

        if (tipoJoia === "anel") {
          navigate(`/detalhesAnel/${anuncioId}`);
        } else if (tipoJoia === "relogio") {
          navigate(`/detalhesRelogio/${anuncioId}`);
        } else if (tipoJoia === "colar") {
          navigate(`/detalhesColar/${anuncioId}`);
        } else if (tipoJoia === "brinco") {
          navigate(`/detalhesBrinco/${anuncioId}`);
        } else if (tipoJoia === "pulseira") {
          navigate(`/detalhesPulseira/${anuncioId}`);
        } else if (tipoJoia === "pingente") {
          navigate(`/detalhesPingente/${anuncioId}`);
        } else if (tipoJoia === "piercing") {
          navigate(`/detalhesPiercing/${anuncioId}`);
        } else {
          // Redirecionamento genérico (opcional)
          navigate(`/DetalhesAnuncio/${anuncioId}`);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchTipoJoia();
  };

  return (
    <>
      <div className="Catalogo">
        <div className="Catalogo__Header__container">
          <div className="Header__container__item__left">
            <h1>Catalogo</h1>
          </div>
          <div className="Header__container__item__right">
            <div
              className={`search-container ${
                isSearchExpanded ? "expanded" : ""
              }`}
            >
              <input
                type="text"
                className="search-input"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="search-button"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              >
                <img
                  src={lupabranca}
                  alt="Lupa"
                  style={{ width: "30px", height: "30px" }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="Filter__elements_container">
          <div className="Filter__elements__item"></div>
          <div className="Filter__elements__item">
            <div className="Filter__elements">
              <ul className="Ul__elements">
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-todos"
                    name="filter"
                    value="todos"
                    checked={selectedFilter === "todos"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-todos">Todos</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-anel"
                    name="filter"
                    value="anel"
                    checked={selectedFilter === "anel"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-anel">Anel</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-brinco"
                    name="filter"
                    value="brinco"
                    checked={selectedFilter === "brinco"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-brinco">Brinco</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-colar"
                    name="filter"
                    value="colar"
                    checked={selectedFilter === "colar"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-colar">Colar</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-piercing"
                    name="filter"
                    value="piercing"
                    checked={selectedFilter === "piercing"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-piercing">Piercing</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-pingente"
                    name="filter"
                    value="pingente"
                    checked={selectedFilter === "pingente"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-pingente">Pingente</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-pulseira"
                    name="filter"
                    value="pulseira"
                    checked={selectedFilter === "pulseira"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-pulseira">Pulseira</label>
                </li>
                <li className="Li__element">
                  <input
                    type="radio"
                    id="filter-relogio"
                    name="filter"
                    value="relogio"
                    checked={selectedFilter === "relogio"}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="filter-relogio">Relogio</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Catalogo__part">
          <div className="Catalogo__part__inside"></div>
        </div>

        {/* Exibição dos anúncios */}
        <div className="anuncios__container">
          {loading && <p>Carregando anúncios...</p>}
          {error && <p className="error__message">{error}</p>}

          {!loading && !error && anunciosFiltrados.length === 0 && (
            <p>Nenhum anúncio encontrado.</p>
          )}

          <div className="anuncios__grid">
            {/*Anuncio Card*/}
            {currentAnuncios.map((anuncio) => (
              <div
                key={anuncio.id}
                className="anuncio__card"
                onClick={() => handleAnuncioClick(anuncio.id)}
              >
                <div className="anuncio__card__content">
                  {anuncio.urLs && anuncio.urLs.length > 0 && (
                    <img
                      src={anuncio.urLs[0]}
                      alt="Imagem do anúncio"
                      className="anuncio__image"
                    />
                  )}
                  <h3>{anuncio.titulo}</h3>
                  <p>{anuncio.descricao}</p>
                </div>
                <div className="Catalogo__part">
                  <div className="Catalogo__part__inside"></div>
                </div>{" "}
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination__button"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <div className="pagination__numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      className={`pagination__number ${
                        currentPage === number ? "active" : ""
                      }`}
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  )
                )}
              </div>

              <button
                className="pagination__button"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Catalogo;
