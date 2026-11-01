import React from "react";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";

import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { logout } from "../../https";
import { removeUser } from "../../redux/slices/userSlice";



import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaUtensils,
} from "react-icons/fa";

const Header = () => {
  const userData = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),

    onSuccess: () => {
      dispatch(removeUser());

      enqueueSnackbar("Logged out successfully!", {
        variant: "success",
      });

      navigate("/auth", { replace: true });
    },

    onError: (error) => {
      enqueueSnackbar(
        error.response?.data?.message || "Logout failed. Please try again.",
        { variant: "error" }
      );
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center py-4 px-8 bg-[#1a1a1a]">

      {/* LOGO */}
      <div className="flex items-center gap-3 justify-self-start">

        <FaUtensils className="text-[#f5f5f5] text-2xl" />

        <h1 className="text-xl font-bold text-[#f5f5f5]">
          OrderNest
        </h1>

      </div>


      {/* SEARCH BAR */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2.5 w-[500px] justify-self-center">

        <FaSearch className="text-[#ababab]" />

        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-[#f5f5f5] placeholder-[#ababab] w-full"
        />

      </div>


      {/* LOGGED USER DETAILS */}
      <div className="flex items-center gap-4 justify-self-end">

        {/* Notification Bell */}
        <button className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer hover:bg-[#2a2a2a] transition">
          <FaBell className="text-[#f5f5f5] text-xl" />
        </button>


        {/* User Details */}
        <div className="flex items-center gap-3 cursor-pointer">

          <FaUserCircle className="text-[#f5f5f5] text-4xl" />

          <div className="flex flex-col items-start">

            <h1 className="text-md text-[#f5f5f5] font-semibold">
              {userData.name || "Employee"}
            </h1>

            <p className="text-xs text-[#ababab] font-medium">
              {userData.role || "Role"}
            </p>

          </div>

        </div>
{/* Logout Button */}
<button
  type="button"
  onClick={handleLogout}
  disabled={logoutMutation.isPending}
  title="Logout"
  aria-label="Logout"
  className="text-[#f5f5f5] ml-2 cursor-pointer hover:text-red-400 disabled:opacity-50"
>
  <IoLogOut size={40} />
</button>

      </div>

    </header>
  );
};

export default Header;