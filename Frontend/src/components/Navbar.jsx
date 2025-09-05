import React, { useContext } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#012A4A] text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Store Rating App</h1>
      <div className="space-x-4">
        <NavLink to="/stores" className="hover:underline">Stores</NavLink>
        {user?.role === "owner" && (
          <>
            <NavLink to="/owner/add-store" className="hover:underline">Add Store</NavLink>
            <NavLink to="/owner" className="hover:underline">Owner</NavLink>
          </>
        )}
        {user?.role === "admin" && (
          <NavLink to="/admin" className="hover:underline">Admin</NavLink>
        )}
        {user ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <NavLink to="/login" className="hover:underline">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
