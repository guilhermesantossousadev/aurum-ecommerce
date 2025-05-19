import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";
import { useDispatch, useSelector } from "react-redux";

import { FaShoppingCart } from "react-icons/fa";
import { li } from "framer-motion/client";

const NavBar = () => {
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const isBlackTextPage = [
    "/servicos",
    "/carrinho",
    "/contato",
    "/token-authentication",
  ].includes(location.pathname);

  const isWhiteTextPage = ["/", "/contact", "/careers"].includes(
    location.pathname
  );

  const isPinkTextPage = ["/profile", "/sobre", "/adminPage"].includes(
    location.pathname
  );

  const isCatalogoPage = [
    "/catalogoAnel",
    "/catalogoBrinco",
    "/catalogoPiercing",
    "/catalogoPingente",
    "/catalogoPulseira",
    "/catalogoRelogio",
    "/catalogo",
  ].includes(location.pathname);

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const getTextClass = () => {
    if (isWhiteTextPage) return "white-text";
    if (isBlackTextPage) return "black-text";
    if (isAuthPage) return "black-text";
    if (isPinkTextPage) return "pink-text";
    return "pink-text";
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > window.innerHeight * 0.9); // se passou de 90vh
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
          <Link to="/servicos">Servicos</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/catalogo">Catálogo</Link>
        </li>
        <li>
          <Link to="/carreiras">Carreiras</Link>
        </li>
        <li>
          <Link to="/contato">Contato</Link>
        </li>

        {user ? (
          <li>
            <Link to="/carrinho">Carrinho</Link>
          </li>
        ) : (
          <li></li>
        )}
        {user ? (
          <li>
            <Link to="/profile">Bem-Vindo, {user.nome}! </Link>
          </li>
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
              Aurun
            </Link>
          </li>
        </div>
        <ul className="navbar__mobile__ul">
          <li>
            <Link to="/servicos" onClick={() => setIsMenuOpen(false)}>
              Servicos
            </Link>
          </li>
          <li>
            <Link to="/sobre" onClick={() => setIsMenuOpen(false)}>
              Sobre
            </Link>
          </li>
          <li>
            <Link to="/catalogo" onClick={() => setIsMenuOpen(false)}>
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
            <li>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                Bem-Vindo, {user.nome}!{" "}
              </Link>
            </li>
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
