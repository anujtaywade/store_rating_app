
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function OwnerRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "owner") {
    return <Navigate to="/login" />; 
  }
  return children;
}
