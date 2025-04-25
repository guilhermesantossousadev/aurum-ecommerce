import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Catalogo from "./pages/Catalogo";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import "./App.css";
import DetalhesAnel from "./pages/detalhes/DetalhesAnel";
import DetalhesRelogio from "./pages/detalhes/DetalhesRelogio";
import DetalhesColar from "./pages/detalhes/DetalhesColar";
import DetalhesBrinco from "./pages/detalhes/DetalhesBrinco";
import DetalhesPiercing from "./pages/detalhes/DetalhesPiercing";
import DetalhesPulseira from "./pages/detalhes/DetalhesPulseira";
import DetalhesPingente from "./pages/detalhes/DetalhesPingente";
function App() {
  const usuario = useSelector((state) => state.user);

  return (
    <Router>
      <NavBar />
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
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
