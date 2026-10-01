import React, { useState } from "react";

import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const createOrder = () => {
    closeModal();
    navigate("/tables");
  };

  return (
    <>
      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around z-40 border-t border-[#343434]">

        {/* HOME */}
        <button
          onClick={() => navigate("/")}
          className={`flex items-center justify-center w-[200px] rounded-[20px] transition ${
            pathname === "/"
              ? "bg-[#343434] text-white"
              : "text-[#ababab] hover:text-white"
          }`}
        >
          <FaHome className="mr-2" size={20} />
          <p>Home</p>
        </button>

        {/* ORDERS */}
        <button
          onClick={() => navigate("/orders")}
          className={`flex items-center justify-center w-[200px] rounded-[20px] transition ${
            pathname === "/orders"
              ? "bg-[#343434] text-white"
              : "text-[#ababab] hover:text-white"
          }`}
        >
          <MdOutlineReorder className="mr-2" size={20} />
          <p>Orders</p>
        </button>

        {/* TABLES */}
        <button
          onClick={() => navigate("/tables")}
          className={`flex items-center justify-center w-[200px] rounded-[20px] transition ${
            pathname === "/tables"
              ? "bg-[#343434] text-white"
              : "text-[#ababab] hover:text-white"
          }`}
        >
          <MdTableBar className="mr-2" size={20} />
          <p>Tables</p>
        </button>

        {/* MORE */}
        <button className="flex items-center justify-center text-[#ababab] hover:text-white w-[200px] transition">
          <CiCircleMore className="mr-2" size={20} />
          <p>More</p>
        </button>

        {/* DISH BUTTON */}
        <button
          onClick={openModal}
          className="
            absolute
            left-1/2
            -translate-x-1/2
            bottom-6
            bg-[#F6B100]
            hover:bg-[#d99c00]
            text-white
            rounded-full
            p-4
            flex
            items-center
            justify-center
            shadow-xl
            transition
            z-50
          "
        >
          <BiSolidDish size={30} />
        </button>
      </div>

      {/* CREATE ORDER MODAL */}
      {isModalOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-[100]
          "
        >
          <div
            className="
              bg-[#1c1c1c]
              border
              border-[#343434]
              w-[430px]
              rounded-2xl
              p-6
              shadow-2xl
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white text-2xl font-bold">
                  Create Order
                </h2>

                <p className="text-[#777] text-sm mt-1">
                  Enter customer information
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-[#ababab] hover:text-white transition"
              >
                <IoClose size={28} />
              </button>
            </div>

            {/* CUSTOMER NAME */}
            <div>
              <label className="block text-[#ababab] mb-2 text-sm font-medium">
                Customer Name
              </label>

              <div className="flex items-center rounded-xl px-4 py-3 bg-[#252525] border border-[#343434] focus-within:border-[#fb6100]">
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className="bg-transparent flex-1 text-white placeholder-[#666] focus:outline-none"
                />
              </div>
            </div>

            {/* CUSTOMER PHONE */}
            <div className="mt-4">
              <label className="block text-[#ababab] mb-2 text-sm font-medium">
                Customer Phone
              </label>

              <div className="flex items-center rounded-xl px-4 py-3 bg-[#252525] border border-[#343434] focus-within:border-[#fb6100]">
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="bg-transparent flex-1 text-white placeholder-[#666] focus:outline-none"
                />
              </div>
            </div>

            {/* GUESTS */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-[#ababab]">
                Guests
              </label>

              <div className="flex items-center justify-between bg-[#252525] border border-[#343434] px-4 py-3 rounded-xl">

                {/* MINUS */}
                <button
                  onClick={decrement}
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#343434]
                    text-[#fb6100]
                    text-2xl
                    flex
                    items-center
                    justify-center
                    hover:bg-[#3d3d3d]
                    transition
                  "
                >
                  −
                </button>

                {/* COUNT */}
                <div className="text-center">
                  <span className="text-white text-xl font-bold">
                    {guestCount}
                  </span>

                  <p className="text-[#777] text-xs mt-1">
                    {guestCount === 1 ? "person" : "people"}
                  </p>
                </div>

                {/* PLUS */}
                <button
                  onClick={increment}
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-[#fb6100]
                    text-white
                    text-2xl
                    flex
                    items-center
                    justify-center
                    hover:bg-[#e55700]
                    transition
                  "
                >
                  +
                </button>

              </div>
            </div>

            {/* CREATE ORDER */}
            <button
              onClick={createOrder}
              className="
                w-full
                bg-[#fb6100]
                hover:bg-[#e55700]
                text-white
                font-semibold
                rounded-xl
                py-3.5
                mt-6
                transition
                shadow-lg
              "
            >
              Create Order
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;