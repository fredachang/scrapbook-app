import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const GuardedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
