/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function ProtectedRoute({ children, inRole }) {
  const { user, userLoading } = useAuth();
  const location = useLocation();

  if (inRole && user && user.role !== inRole) {
    return <NotFoundPage />;
  }

  if (userLoading) return <div>Loading...</div>;

  if (!user)
    return <Navigate to="/login" state={{ from: location.pathname }} />;

  return children;
}

export default ProtectedRoute;
