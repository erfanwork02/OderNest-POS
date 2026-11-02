import React from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaUtensils,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Temporary logged-in user data
  // Later this will come from Redux / backend authentication
  const userData = {
    name: "Shariar",
    role: "admin",
  };

  const isAdmin = userData?.role?.toLowerCase() === "admin";

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center py-4 px-8 bg-[#1a1a1a] border-b border-[#2f2f2f]">

      {/* LOGO */}
      <div onClick={() => navigate("/")} className="flex items-center gap-3 justify-self-start cursor-pointer">
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

        {/* ADMIN DASHBOARD BUTTON */}
        {isAdmin && (
          <button
            onClick={() => navigate("/dashboard")}
            className="
              bg-[#1f1f1f]
              border border-[#2f2f2f]
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


        {/* NOTIFICATION BELL */}
        <button
          className="
            bg-[#1f1f1f]
            border border-[#2f2f2f]
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
        <div className="flex items-center gap-3 cursor-pointer">

          <FaUserCircle className="text-[#f5f5f5] text-4xl" />

          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">
              {userData.name}
            </h1>

            <p className="text-xs text-[#ababab] font-medium capitalize">
              {userData.role}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;