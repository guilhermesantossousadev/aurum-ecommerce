import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {Toaster, toast } from 'sonner';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

// Lazy imports das páginas
const Home = lazy(() => import("./pages/Home"));
const CadastroJoia = lazy(() => import("./components/CadastroJoia"));
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

// Inline spinner styles e keyframes
const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60vh",
};

const spinnerCircleStyle = {
  border: "6px solid #f3f3f3",
  borderTop: "6px solid #d9b346",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
};

const styleSheet = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

if (
  typeof window !== "undefined" &&
  !document.getElementById("spinner-keyframes")
) {
  const style = document.createElement("style");
  style.id = "spinner-keyframes";
  style.appendChild(document.createTextNode(styleSheet));
  document.head.appendChild(style);
}

function LoadingSpinner() {
  return (
    <div style={spinnerStyle}>
      <div style={spinnerCircleStyle}></div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register", "/adminPage"];
  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastroJoia" element={<CadastroJoia />} />
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
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/successPage" element={<SuccessPage />} />
          <Route path="/errorPage" element={<ErrorPage />} />
          <Route path="/pendingPage" element={<PendingPage />} />
          <Route
            path="/token-authentication"
            element={<TokenAuthentication />}
          />
        </Routes>
      </Suspense>
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
