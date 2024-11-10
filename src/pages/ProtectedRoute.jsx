/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { user, userLoading } = useAuth()
  const location = useLocation()

  if (userLoading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} />

  return children
}

export default ProtectedRoute
