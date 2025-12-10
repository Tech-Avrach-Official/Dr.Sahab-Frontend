import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth")); // ✅ FIXED
  const token = auth?.token;
  const role = auth?.role;

  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;