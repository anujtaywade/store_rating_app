import { useNavigate } from "react-router-dom";
import React from "react";


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Store Rating App</h1>
      <p className="text-lg mb-6">Discover, rate, and manage stores with ease</p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold shadow hover:bg-gray-200"
      >
        Get Started
      </button>
      <p className="mt-4">
        Don’t have an account?{" "}
        <span
          className="underline cursor-pointer hover:text-gray-200"
          onClick={() => navigate("/signup")}
        >
          Sign Up here
        </span>
      </p>
    </div>
  );
}
