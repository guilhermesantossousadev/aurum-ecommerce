import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import "../styles/pages/Catalogo.css";

import SetaPretaDireita from "../images/Setas/SetaPretaDireita.png";
import searchicon from "../images/Common/searchicon.png";
import xpng from "../images/Common/x.png";

import SetaPretaEsquerda from "../images/Setas/SetaPretaEsquerda.png";

function Catalogo() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const anunciosPerPage = 7;
  const tipoInicial = tipo ? tipo : "todos";
  const [selectedFilter, setSelectedFilter] = useState(tipoInicial);
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAvaliable, setAvaliable] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);

  const [tempFilter, setTempFilter] = useState({
    tipo: "todos",
    material: "",
    genero: "",
    precoMin: "",
    precoMax: "",
    disponibilidade: "todos",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ClearSearch = () => setSearchTerm("");

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const removerAcentos = (str) =>
    str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const getAnuncios = async () => {
    setLoading(true);
    setError(null);
    try {
      const tipoSemAcento = removerAcentos(selectedFilter);
      const tipoFormatado = capitalizeFirstLetter(tipoSemAcento);

      const url =
        selectedFilter !== "todos"
          ? `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetByTipoJoia?tipoPeca=${tipoFormatado}`
          : `https://marketplacejoias-api-latest.onrender.com/api/Anuncio/GetAnuncio`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar anúncios.");
      const data = await response.json();

      setAnuncios(data);
    } catch (error) {
      setError("Erro ao carregar os anúncios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnuncios();
  }, [selectedFilter]);

  useEffect(() => {
    setTempFilter((prev) => ({
      ...prev,
      tipo: selectedFilter,
    }));
  }, [selectedFilter]);

  const anunciosFiltrados = anuncios
    .filter((anuncio) => {
      if (selectedFilter === "todos") return true;
      return (
        removerAcentos(anuncio.tipoPeca || "") ===
        removerAcentos(selectedFilter || "")
      );
    })
    .filter((anuncio) => {
      if (!searchTerm) return true;
      const titulo = anuncio.titulo?.toLowerCase() || "";
      const descricao = anuncio.descricao?.toLowerCase() || "";
      return (
        titulo.includes(searchTerm.toLowerCase()) ||
        descricao.includes(searchTerm.toLowerCase())
      );
    })
    .filter((anuncio) => {
      if (isAvaliable === "todos") return true;
      if (isAvaliable === "disponivel") return anuncio.isAvaliable === true;
      if (isAvaliable === "indisponivel") return anuncio.isAvaliable === false;
      return true;
    });

  const totalPages = Math.ceil(anunciosFiltrados.length / anunciosPerPage);

  const currentAnuncios = anunciosFiltrados.slice(
    (currentPage - 1) * anunciosPerPage,
    currentPage * anunciosPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAnuncioClick = (anuncioId) => {
    navigate(`/detalhes/${anuncioId}`);
  };

  const renderFilters = () => (
    <div className="filtersContent">
      <div className="filtersContent__container">
        <div className="filtersContent__item">
          <h2>Tipos</h2>
          {[
            "anel",
            "brinco",
            "relógio",
            "colar",
            "piercing",
            "pingente",
            "pulseira",
          ].map((tipo) => (
            <label key={tipo}>
              <input
                type="radio"
                name="tipo"
                checked={
                  removerAcentos(tempFilter.tipo) === removerAcentos(tipo)
                }
                onClick={() =>
                  setTempFilter((prev) => ({
                    ...prev,
                    tipo:
                      removerAcentos(prev.tipo) === removerAcentos(tipo)
                        ? ""
                        : tipo,
                  }))
                }
              />

              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </label>
          ))}
        </div>
        <div className="filtersContent__item">
          <h2>Disponibilidade</h2>
          {["todos", "disponivel", "indisponivel"].map((status) => (
            <label key={status}>
              <input
                type="radio"
                name="disponibilidade"
                checked={tempFilter.disponibilidade === status}
                onClick={() =>
                  setTempFilter((prev) => ({
                    ...prev,
                    disponibilidade:
                      prev.disponibilidade === status ? "" : status,
                  }))
                }
              />

              {status === "todos"
                ? "Todos"
                : status === "disponivel"
                ? "Disponível"
                : "Indisponível"}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="Catalogo">
      <div className="Catalogo__Header__container">
        <div className="Search__header">
          <div className="Search__header__container">
            <img src={searchicon} alt="searchicon" className="search__lupe" />

            {searchTerm.trim() !== "" && (
              <img
                src={xpng}
                alt="xpng"
                className="search__x"
                onClick={ClearSearch}
              />
            )}

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

      <div className="Catalogo__filters__button">
        <div className="Catalogo__filters__button__item">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className={showFilters ? "active-filter-button" : ""}
          >
            Filtros
          </button>

          <button
            onClick={() => {
              setTempFilter({
                tipo: "todos",
                material: "",
                genero: "",
                precoMin: "",
                precoMax: "",
                disponibilidade: "todos",
              });
              setSelectedFilter("todos");
              setAvaliable("todos");
              setShowFilters(false);
              ClearSearch();
              setCurrentPage(1);
            }}
          >
            Limpar
          </button>

          {showFilters && (
            <button
              onClick={() => {
                setSelectedFilter(tempFilter.tipo);
                setAvaliable(tempFilter.disponibilidade);
                setShowFilters(false);
                setCurrentPage(1);
              }}
            >
              Aplicar
            </button>
          )}
        </div>

        <div className="Catalogo__filters__button__item right">
          <Link to="/cadastroAnuncio" className="anuncie-button">
            Anuncie agora
          </Link>
        </div>
      </div>

      {showFilters && <div className="dropdownFilters">{renderFilters()}</div>}

      <div className="anuncios__container">
        {loading && (
          <div className="loading-container">
            <h2 className="loading-text">Carregando Anúncios...</h2>
            <span className="loading-spinner"></span>
          </div>
        )}

        {error && <p className="error__message">{error}</p>}
        {!loading && !error && currentAnuncios.length === 0 && (
          <p>Nenhum anúncio encontrado.</p>
        )}
        <div className="anuncios__grid">
          {currentAnuncios.map((anuncio) => (
            <div
              key={anuncio.id}
              className={`anuncio__card ${
                anuncio.isAvaliable ? "" : "isAvaliable"
              }`}
              onClick={() => handleAnuncioClick(anuncio.id)}
            >
              <div className="Catalogo__part">
                <div className="Catalogo__part__inside"></div>
              </div>
              <div className="anuncio__card__container">
                <div className="anuncio__card__img">
                  {anuncio.urLs?.[0] ? (
                    <img
                      src={anuncio.urLs[0]}
                      alt="Imagem do anúncio"
                      className="anuncio__image"
                    />
                  ) : (
                    <div className="anuncio__sem-imagem">
                      <h4 style={{ fontSize: "25px" }}>Anúncio sem imagens</h4>
                    </div>
                  )}
                </div>
                <h3>{anuncio.titulo}</h3>
                <p>{anuncio.descricao}</p>
                <div className="anuncio__card__seta">
                  <img src={SetaPretaDireita} alt="Seta" width="10px" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => {
                paginate(currentPage - 1);
                setShowFilters(false);
              }}
              disabled={currentPage === 1}
              className="pagination__button"
            >
              <img src={SetaPretaEsquerda} alt="seta" />
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`pagination__number ${
                  currentPage === num ? "active" : ""
                }`}
                onClick={() => {
                  paginate(num);

                  setShowFilters(false);
                }}
              >
                <span> {num}</span>
              </button>
            ))}
            <button
              onClick={() => {
                paginate(currentPage + 1);
                setShowFilters(false);
              }}
              disabled={currentPage === totalPages}
              className="pagination__button"
            >
              Próximo
              <img src={SetaPretaDireita} alt="seta" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogo;
