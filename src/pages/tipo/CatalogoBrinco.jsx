import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Catalogo.css";
import lupabranca from "../../images/lupa-branca.png";

import searchicon from "../../images/searchicon.png";
import xpng from "../../images/x.png";

function CatalogoBrinco() {
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const anunciosPerPage = 7;
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);
  const [tempFilter, setTempFilter] = useState({
    tipo: "todos",
    material: "",
    genero: "",
    precoMin: "",
    precoMax: "",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getAnuncios();
  }, []);

  const ClearSearch = () => {
    setSearchTerm("");
  };

  const renderFilters = () => (
    <div className="filtersContent">
      <h2>Filtros</h2>

      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "anel"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "anel" ? "todos" : "anel",
            })
          }
        />
        Anel
      </label>
      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "brinco"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "brinco" ? "todos" : "brinco",
            })
          }
        />
        Brinco
      </label>

      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "relogio"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "relogio" ? "todos" : "relogio",
            })
          }
        />
        Relogio
      </label>

      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "colar"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "colar" ? "todos" : "colar",
            })
          }
        />
        Colar
      </label>

      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "piercing"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "piercing" ? "todos" : "piercing",
            })
          }
        />
        Piercing
      </label>

      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "pingente"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "pingente" ? "todos" : "pingente",
            })
          }
        />
        Pingente
      </label>

      <label>
        <input
          type="checkbox"
          checked={tempFilter.tipo === "pulseira"}
          onChange={() =>
            setTempFilter({
              ...tempFilter,
              tipo: tempFilter.tipo === "pulseira" ? "todos" : "pulseira",
            })
          }
        />
        Pulseira
      </label>

      {/* Repita para os outros tipos */}

      <div className="filtersButtons">
        <button
          onClick={() => {
            setSelectedFilter(tempFilter.tipo);
            setShowFilters(false); // Fecha o modal ou dropdown
          }}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
  const getAnuncios = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://localhost:7081/api/Anuncio/GetByTipoJoia?tipoPeca=Brinco",
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
          `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByIdAnuncio?id=${anuncioId}`
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
          <div className="Search__header">
            <div className="Search__header__container">
              <img src={searchicon} alt="searchicon" className="search__lupe" />
              <img
                src={xpng}
                alt="xpng"
                className="search__x"
                onClick={ClearSearch}
              />
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="Search__header__container__input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Botão de Filtro */}
        <div className="Catalogo__filters__button">
          <button
            onClick={() => {
              const reset = {
                tipo: "todos",
                material: "",
                genero: "",
                precoMin: "",
                precoMax: "",
              };
              setTempFilter(reset);
              setSelectedFilter("todos");
              setShowFilters(false); // Fecha o modal/dropdown ao limpar
            }}
          >
            Limpar
          </button>

          <button onClick={() => setShowFilters(true)}>Filtros</button>
        </div>

        {/* Modal de Filtros */}
        {showFilters && (
          <div className="dropdownFilters">
            {/* Dropdown */}
            {renderFilters()}
          </div>
        )}

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
                <div className="anuncio__card__container">
                  <div className="anuncio__card__img">
                    {anuncio.urLs && anuncio.urLs.length > 0 && (
                      <img
                        src={anuncio.urLs[0]}
                        alt="Imagem do anúncio"
                        className="anuncio__image"
                      />
                    )}
                  </div>
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

export default CatalogoBrinco;
