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
    "/token-authentication",
  ].includes(location.pathname);

  const isWhiteTextPage = [
    "/",
    "/contact",
    "/careers",
    "/adminPage",
    "/profile",
  ].includes(location.pathname);

  const isPinkTextPage = ["/profile", "/sobre", "/adminPage"].includes(
    location.pathname
  );

  const isCatalogoPage = ["/catalogo"].includes(location.pathname);

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

      if (location.pathname === "/") {
        const banner = document.querySelector(".Banner");
        if (banner) {
          const bannerHeight = banner.offsetHeight;
          setIsScrolled(scrollTop > bannerHeight - 80);
        }
      } else if (location.pathname === "/profile") {
        const profileHeader = document.querySelector(".profile__header");
        if (profileHeader) {
          const profileHeight = profileHeader.offsetHeight;
          setIsScrolled(scrollTop > profileHeight - 80);
        } else {
          // Tenta novamente depois de um pequeno atraso
          setTimeout(() => {
            const retryHeader = document.querySelector(".profile__header");
            if (retryHeader) {
              const profileHeight = retryHeader.offsetHeight;
              setIsScrolled(scrollTop > profileHeight - 80);
            }
          }, 100);
        }
      } else if (["/login", "/register"].includes(location.pathname)) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Aguarda render completo antes da 1ª verificação
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
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
                <Link to="/profile">{user.nome}</Link>
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
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
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
                    {user.nome}
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
