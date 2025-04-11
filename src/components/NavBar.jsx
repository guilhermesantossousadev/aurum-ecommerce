import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="Nav__item">
        <Link to="/" className="navbar__brand">
          Aurum
        </Link>
      </div>

      {/* Menu para telas grandes */}
      <ul className="navbar__list">
        <li>
          <Link to="/work">Work</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/thinking">Thinking</Link>
        </li>
        <li>
          <Link to="/careers">Careers</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {user ? (
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
        ) : (
          <li>
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
            <Link to="/work" onClick={() => setIsMenuOpen(false)}>
              Work
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/news" onClick={() => setIsMenuOpen(false)}>
              News
            </Link>
          </li>
          <li>
            <Link to="/thinking" onClick={() => setIsMenuOpen(false)}>
              Thinking
            </Link>
          </li>
          <li>
            <Link to="/careers" onClick={() => setIsMenuOpen(false)}>
              Careers
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
