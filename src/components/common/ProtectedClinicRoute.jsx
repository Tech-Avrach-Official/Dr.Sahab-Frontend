import { Navigate } from "react-router-dom";

const ProtectedClinicRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth")); // ✅ FIXED
  const token = auth?.token;
  const role = auth?.role;

  if (!token || role !== "clinic") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedClinicRoute;