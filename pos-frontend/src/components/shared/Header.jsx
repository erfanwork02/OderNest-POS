import React, { useEffect, useState } from "react";

import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaUtensils,
  FaSignOutAlt,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import api from "../../https";

const Header = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // ==============================
  // GET LOGGED-IN USER
  // ==============================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/user");

        const user =
          response.data?.data?.user ||
          response.data?.user ||
          response.data?.data ||
          response.data;

        if (user && typeof user === "object") {
          setUserData(user);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error getting user:", error);
        setUserData(null);
      }
    };

    fetchUser();
  }, []);

  // ==============================
  // CHECK ADMIN
  // ==============================
  const isAdmin =
    String(userData?.role || "").toLowerCase() === "admin";

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await api.post("/api/user/logout");

      setUserData(null);

      navigate("/auth", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Could not log out.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center py-4 px-8 bg-[#1a1a1a] border-b border-[#2f2f2f]">

      {/* LOGO */}
      <div
        onClick={() => navigate("/home")}
        className="flex items-center gap-3 justify-self-start cursor-pointer"
      >
        <FaUtensils className="text-[#f5f5f5] text-2xl" />

        <h1 className="text-xl font-bold text-[#f5f5f5]">
          OrderNest
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] border border-[#2f2f2f] rounded-[15px] px-5 py-2.5 w-[500px] justify-self-center">
        <FaSearch className="text-[#ababab]" />

        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-[#f5f5f5] placeholder-[#ababab] w-full"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 justify-self-end">

        {/* ADMIN DASHBOARD */}
        {isAdmin && (
          <button
            onClick={() => navigate("/dashboard")}
            className="
              bg-[#1f1f1f]
              border
              border-[#2f2f2f]
              rounded-[15px]
              p-3
              cursor-pointer
              hover:bg-[#2a2a2a]
              hover:border-[#fb6100]/50
              transition
            "
            title="Admin Dashboard"
          >
            <MdDashboard className="text-[#f5f5f5] text-xl" />
          </button>
        )}

        {/* NOTIFICATIONS */}
        <button
          className="
            bg-[#1f1f1f]
            border
            border-[#2f2f2f]
            rounded-[15px]
            p-3
            cursor-pointer
            hover:bg-[#2a2a2a]
            transition
          "
          title="Notifications"
        >
          <FaBell className="text-[#f5f5f5] text-xl" />
        </button>

        {/* USER DETAILS */}
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />

          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">
              {userData?.name || "User"}
            </h1>

            <p className="text-xs text-[#ababab] font-medium capitalize">
              {userData?.role || "Employee"}
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="
            flex
            items-center
            gap-2
            bg-[#252525]
            border
            border-[#343434]
            text-[#ababab]
            px-3
            py-2.5
            rounded-xl
            text-sm
            font-semibold
            hover:text-white
            hover:border-red-500/60
            hover:bg-red-500/10
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
          title="Logout"
        >
          <FaSignOutAlt />

          {loggingOut ? "Logging out..." : "Logout"}
        </button>

      </div>
    </header>
  );
};

export default Header;