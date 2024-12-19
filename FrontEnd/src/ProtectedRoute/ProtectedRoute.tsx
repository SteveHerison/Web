import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useUser();

  if (!token) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
