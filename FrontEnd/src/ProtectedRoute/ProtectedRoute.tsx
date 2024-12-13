import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { usuario } = useUser();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
