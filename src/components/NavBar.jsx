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

  // Determina se estamos na página principal
  const isHomePage = location.pathname === "/";

  // Determina se estamos em uma página que deve ter texto preto
  const isBlackTextPage = [
    "/Servicos",
    "/contact",
    "/careers",
    "/adminPage",
  ].includes(location.pathname);

  // Determina se estamos na página de catálogo
  const isCatalogoPage = location.pathname === "/catalogo";

  // Determina se estamos na página Profile
  const isProfilePage = location.pathname === "/profile";

  // Determina se estamos na página Sobre
  const isSobrePage = location.pathname === "/sobre";

  // Determina se estamos na página Contato
  const isContatoPage = location.pathname === "/contato";

  // Determina se estamos na página Carrinho
  const isCarrinhoPage = location.pathname === "/carrinho";

  // Determina se estamos na página Carrinho
  const isCatalogosPage = [
    "/catalogoAnel",
    "/catalogoBrinco",
    "/catalogoPiercing",
    "/catalogoPingente",
    "/catalogoPulseira",
    "/catalogoRelogio",
  ].includes(location.pathname);

  // Determina se estamos na página token authentication
  const isTokenAuthenticationPage =
    location.pathname === "/token-authentication";

  // Determina se estamos em uma página de autenticação
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > window.innerHeight * 0.9); // se passou de 90vh
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determina a classe de texto com base na página atual
  const getTextClass = () => {
    if (isHomePage) return "white-text";
    if (isBlackTextPage) return "black-text";
    if (isCarrinhoPage) return "black-text";
    if (isCatalogosPage) return "black-text";
    if (isContatoPage) return "black-text";
    if (isProfilePage) return "pink-text";
    if (isTokenAuthenticationPage) return "black-text";
    if (isSobrePage) return "pink-text";
    return "pink-text";
  };

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
      <ul className="navbar__list">
        <li>
          <Link to="/Servicos">Servicos</Link>
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
            <Link to="/Servicos" onClick={() => setIsMenuOpen(false)}>
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
