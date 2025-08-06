import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/components/NavBar.css";

const NavBar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const isBlackTextPage = [
    "/servicos",
    "/carrinho",
    "/contato",
    "/successPage",
    "/errorPage",
    "/pendingPage",
    "/cadastroJoia",
  ].includes(location.pathname);

  const isWhiteTextPage = [
    "/",
    "/contact",
    "/careers",
    "/adminPage",
    "/profile",
    "/cadastroAnuncio",
    "/token-authentication",
  ].includes(location.pathname);

  const isPinkTextPage = ["/profile", "/sobre", "/adminPage"].includes(
    location.pathname
  );

  const isCatalogoPage = [
    "/catalogo",
    "/catalogo/todos",
    "/catalogo/relogio",
    "/catalogo/colar",
    "/catalogo/pulseira",
    "/catalogo/anel",
    "/catalogo/pingente",
    "/catalogo/brinco",
  ].includes(location.pathname);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const getTextClass = () => {
    if (isAuthPage) return "black-text";
    if (isWhiteTextPage) return "white-text";
    if (isBlackTextPage) return "black-text";
    if (isPinkTextPage) return "pink-text";
    if (isCatalogoPage) return "black-text";
    return "pink-text"; // fallback
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (location.pathname === "/profile") {
        const threshold = window.innerHeight * 0.3; // 30vh
        setIsScrolled(scrollTop > threshold);
      } else if (location.pathname === "/") {
        const banner = document.querySelector(".Banner");
        if (banner) {
          const bannerHeight = banner.offsetHeight;
          setIsScrolled(scrollTop > bannerHeight - 80);
        } else {
          setIsScrolled(scrollTop > window.innerHeight * 0.3);
        }
      } else if (["/login", "/register"].includes(location.pathname)) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Checar imediatamente após montar
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Determina a classe específica da página
  const getPageClass = () => {
    if (isCatalogoPage) return "catalogo-nav";
    if (isAuthPage) return "auth-nav";
    return "";
  };

  return (
    <nav
      className={`navbar ${
        isScrolled ? "scrolled" : ""
      } ${getTextClass()} ${getPageClass()}`}
    >
      <div className="Nav__item">
        <Link to="/" className="navbar__brand">
          Aurum
        </Link>
      </div>

      {/* Menu para telas grandes */}
      <ul className={`navbar__list ${user ? "" : "logged"}`}>
        <li>
          <Link to="/servicos">Serviços</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/catalogo/todos">Catálogo</Link>
        </li>
        <li>
          <Link to="/carreiras">Carreiras</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>
        <li>
          <Link to="/carrinho">Carrinho</Link>
        </li>

        {user ? (
          <>
            {user.isAdmin ? (
              <li>
                <Link to="/adminPage">Dashboard</Link>
              </li>
            ) : (
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
            )}
          </>
        ) : (
          <li className={`login ${user ? "" : "logged"}`}>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      {/* Botão de abrir menu mobile */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="navbar__toggle"
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {/* Menu mobile */}
      <div className={`navbar__mobile ${isMenuOpen ? "open" : ""}`}>
        <div className="navbar__mobile__container">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="navbar__close"
            aria-label="Fechar menu"
          >
            ✖
          </button>
          <li>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="titulo"
            >
              Aurum
            </Link>
          </li>
        </div>
        <ul className="navbar__mobile__ul">
          <li>
            <Link to="/servicos" onClick={() => setIsMenuOpen(false)}>
              Serviços
            </Link>
          </li>
          <li>
            <Link to="/sobre" onClick={() => setIsMenuOpen(false)}>
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/catalogo/todos" onClick={() => setIsMenuOpen(false)}>
              Catálogo
            </Link>
          </li>
          <li>
            <Link to="/carrinho" onClick={() => setIsMenuOpen(false)}>
              Carrinho
            </Link>
          </li>
          <li>
            <Link to="/carreiras" onClick={() => setIsMenuOpen(false)}>
              Carreiras
            </Link>
          </li>
          <li>
            <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
              Contato
            </Link>
          </li>
          {user ? (
            <>
              {user.isAdmin ? (
                <li>
                  <Link to="/adminPage" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    Perfil
                  </Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
