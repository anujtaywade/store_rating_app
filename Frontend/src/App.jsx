import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddStore from "./pages/AddStore";
import { OwnerRoute } from "./components/OwnerRoute";
import { AdminRoute } from "./components/AdminRoute";
import UserDashboard from "./pages/UserDashboard";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/owner"
              element={
                <OwnerRoute>
                  <OwnerDashboard />
                </OwnerRoute>
              }
            />
            <Route
              path="/owner/add-store"
              element={
                <OwnerRoute>
                  <AddStore />
                </OwnerRoute>
              }
            />

            <Route path="/stores" element={<UserDashboard />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
