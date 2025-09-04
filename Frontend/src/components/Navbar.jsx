import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      {user ? (
        <>
          {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
          {user.role === "owner" && <Link to="/owner">Owner Dashboard</Link>}
          {user.role === "user" && <Link to="/stores">Stores</Link>}
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup" style={{ marginLeft: "10px" }}>Signup</Link>
        </>
      )}
    </nav>
  );
}
