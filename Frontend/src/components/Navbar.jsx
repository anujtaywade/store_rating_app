import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  if (location.pathname === "/") {
    return null; 
  }

  return (
    <nav>

    </nav>
  );
}

export default Navbar;
