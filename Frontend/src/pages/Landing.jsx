import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "#fff",
      textAlign: "center"
    }}>
      <h1>Welcome to Store Rating App</h1>
      <p>Discover, rate, and manage stores with ease</p>
      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          background: "#fff",
          color: "#333",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Get Started
      </button>
      <p style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
}
