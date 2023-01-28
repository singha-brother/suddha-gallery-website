import { useAdminContext } from "../../context/AdminContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { isAdmin, email } = useAdminContext()

  return isAdmin && email ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
