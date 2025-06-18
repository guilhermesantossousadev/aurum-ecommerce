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

import Detalhes from "./pages/detalhes/Detalhes";
import AdminPage from "./pages/Admin/AdminPage";
import Carrinho from "./pages/Carrinho";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Carreiras from "./pages/Carreiras";
import CadastroJoia from "./components/CadastroJoia";

function App() {
  const usuario = useSelector((state) => state.user);

  return (
    <Router>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cadastroJoia" element={<CadastroJoia />} />

        <Route path="/detalhes/:id" element={<Detalhes />} />

        <Route path="/catalogo/:tipo" element={<Catalogo />} />
        <Route path="/catalogo/:tipo" element={<Catalogo />} />

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
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </Router>
  );
}

export default App;
