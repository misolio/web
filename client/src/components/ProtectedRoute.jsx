import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AppLoader from "./AppLoader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
