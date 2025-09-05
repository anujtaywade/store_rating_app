import { useLocation } from "react-router-dom";
import React from "react";
function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") {
    return null; 
  }

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Store Rating App</h1>
      <div className="space-x-4">
        <a href="/stores" className="hover:underline">Stores</a>
        <a href="/owner" className="hover:underline">Owner</a>
        <a href="/admin" className="hover:underline">Admin</a>
        <a href="/login" className="hover:underline">Logout</a>
      </div>
    </nav>
  );
}

export default Navbar;
