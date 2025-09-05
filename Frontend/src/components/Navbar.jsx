import React from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  if (location.pathname === "/") {
    return null; 
  }

  return (
    <nav className="bg-[#012A4A] text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Store Rating App</h1>
      <div className="space-x-4">
  <a href="/stores" className="hover:underline">Stores</a>
  {user?.role === "owner" && (
    <a href="/owner/add-store" className="hover:underline">Add Store</a>
  )}
  {user?.role === "owner" && (
    <a href="/owner" className="hover:underline">Owner</a>
  )}
  {user?.role === "admin" && (
    <a href="/admin" className="hover:underline">Admin</a>
  )}
  <a href="/login" className="hover:underline">Logout</a>
</div>

    </nav>
  );
}

export default Navbar;
