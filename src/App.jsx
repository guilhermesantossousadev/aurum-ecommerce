import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Servicos from "./pages/Servicos";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import TokenAuthentication from "./pages/TokenAuthentication";
import Contato from "./pages/Contato";

import DetalhesAnel from "./pages/detalhes/DetalhesAnel";
import DetalhesRelogio from "./pages/detalhes/DetalhesRelogio";
import DetalhesColar from "./pages/detalhes/DetalhesColar";
import DetalhesBrinco from "./pages/detalhes/DetalhesBrinco";
import DetalhesPiercing from "./pages/detalhes/DetalhesPiercing";
import DetalhesPulseira from "./pages/detalhes/DetalhesPulseira";
import DetalhesPingente from "./pages/detalhes/DetalhesPingente";
import AdminPage from "./pages/Admin/AdminPage";
import Carrinho from "./pages/Carrinho";

import CatalogoAnel from "./pages/tipo/CatalogoAnel";
import CatalogoBrinco from "./pages/tipo/CatalogoBrinco";
import CatalogoColar from "./pages/tipo/CatalogoColar";
import CatalogoPiercing from "./pages/tipo/CatalogoPiercing";
import CatalogoPingente from "./pages/tipo/CatalogoPingente";
import CatalogoPulseira from "./pages/tipo/CatalogoPulseira";
import CatalogoRelogio from "./pages/tipo/CatalogoRelogio";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Carreiras from "./pages/Carreiras";

function App() {
  const usuario = useSelector((state) => state.user);

  return (
    <Router>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />

        <Route path="/detalhesAnel/:id" element={<DetalhesAnel />} />
        <Route path="/detalhesBrinco/:id" element={<DetalhesBrinco />} />
        <Route path="/detalhesRelogio/:id" element={<DetalhesRelogio />} />
        <Route path="/detalhesColar/:id" element={<DetalhesColar />} />
        <Route path="/detalhesPiercing/:id" element={<DetalhesPiercing />} />
        <Route path="/detalhesPulseira/:id" element={<DetalhesPulseira />} />
        <Route path="/detalhesPingente/:id" element={<DetalhesPingente />} />

        <Route path="/catalogoAnel" element={<CatalogoAnel />} />
        <Route path="/catalogoBrinco" element={<CatalogoBrinco />} />
        <Route path="/catalogoColar" element={<CatalogoColar />} />
        <Route path="/catalogoPiercing" element={<CatalogoPiercing />} />
        <Route path="/catalogoPingente" element={<CatalogoPingente />} />
        <Route path="/catalogoPulseira" element={<CatalogoPulseira />} />
        <Route path="/catalogoRelogio" element={<CatalogoRelogio />} />

        <Route path="/sobre" element={<Sobre />} />
        <Route path="/carreiras" element={<Carreiras />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/adminPage" element={<AdminPage />} />

        <Route path="/token-authentication" element={<TokenAuthentication />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      <Footer />
    </Router>
  );
}

export default App;
