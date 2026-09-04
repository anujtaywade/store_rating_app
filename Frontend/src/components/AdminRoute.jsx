import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
}
