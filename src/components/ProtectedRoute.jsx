import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const usuario = useSelector((state) => state.user);
  const isAuthenticated = usuario?.email || localStorage.getItem("user");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
