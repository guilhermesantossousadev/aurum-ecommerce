import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user || !user.isAdmin) {
    // Se não for admin ou não estiver logado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
