import React, { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";

import BottomNav from "./components/shared/BottomNav";
import Header from "./components/shared/Header";

import api from "./https";


// ==========================================
// ADMIN ROUTE PROTECTION
// ==========================================
const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get("/api/user");

        const userData =
          response.data?.data?.user ||
          response.data?.user ||
          response.data?.data ||
          response.data;

        setUser(userData);
      } catch (error) {
        console.error("Admin check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Wait while checking logged-in user
  if (loading) {
    return (
      <div className="min-h-screen bg-[#161616] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Logged in but NOT admin
  if (user?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/home" replace />;
  }

  // Admin can continue
  return children;
};


// ==========================================
// APP
// ==========================================
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            <Navigate
              to="/auth"
              replace
            />
          }
        />


        {/* LOGIN / REGISTER */}
        <Route
          path="/auth"
          element={<Auth />}
        />


        {/* HOME */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />


        {/* ORDERS */}
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />


        {/* TABLES */}
        <Route
          path="/tables"
          element={
            <>
              <Header />
              <Tables />
            </>
          }
        />


        {/* MENU */}
        <Route
          path="/menu"
          element={
            <>
              <Header />
              <Menu />
            </>
          }
        />


        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <>
                <Header />
                <BottomNav />
                <Dashboard />
              </>
            </AdminRoute>
          }
        />


        {/* UNKNOWN PAGE */}
        <Route
          path="*"
          element={
            <Navigate
              to="/auth"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;