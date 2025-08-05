import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

// Lazy imports das páginas
const Home = lazy(() => import("./pages/Home"));
const CadastroAnuncio = lazy(() => import("./components/CadastroAnuncio"));
const Detalhes = lazy(() => import("./pages/detalhes/Detalhes"));
const Catalogo = lazy(() => import("./pages/Catalogo"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Carreiras = lazy(() => import("./pages/Carreiras"));
const Contato = lazy(() => import("./pages/Contato"));
const Servicos = lazy(() => import("./pages/Servicos"));
const Carrinho = lazy(() => import("./pages/Carrinho"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./components/Profile"));
const AdminPage = lazy(() => import("./pages/Admin/AdminPage"));
const SuccessPage = lazy(() => import("./pages/StatusPages/SuccessPage"));
const ErrorPage = lazy(() => import("./pages/StatusPages/ErrorPage"));
const PendingPage = lazy(() => import("./pages/StatusPages/PendingPage"));
const TokenAuthentication = lazy(() => import("./pages/TokenAuthentication"));
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register", "/adminPage"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastroAnuncio" element={<CadastroAnuncio />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
        <Route path="/catalogo/:tipo" element={<Catalogo />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/carreiras" element={<Carreiras />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/adminPage"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/successPage" element={<SuccessPage />} />
        <Route path="/errorPage" element={<ErrorPage />} />
        <Route path="/pendingPage" element={<PendingPage />} />
        <Route path="/token-authentication" element={<TokenAuthentication />} />
      </Routes>
      <Toaster position="top-right" richColors />
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
