import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { setCustomer } from "../../redux/slices/customerSlice";

import { FaHome } from "react-icons/fa";
import {
  MdOutlineReorder,
  MdTableBar,
} from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const BottomNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [guestCount, setGuestCount] =
    useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const increment = () => {
    if (guestCount >= 6) return;

    setGuestCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (guestCount <= 0) return;

    setGuestCount((prev) => prev - 1);
  };

  const createOrder = () => {
    if (!name.trim()) return;

    if (!phone.trim()) return;

    if (guestCount < 1) return;

    dispatch(
      setCustomer({
        name: name.trim(),
        phone: phone.trim(),
        guests: guestCount,
      })
    );

    setName("");
    setPhone("");
    setGuestCount(0);

    closeModal();

    navigate("/tables");
  };

  const newOrderDisabled =
    pathname === "/tables" ||
    pathname === "/menu";

  return (
    <>
      {/* BOTTOM NAV */}
      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          h-[78px]
          bg-[#1f1f1f]
          border-t
          border-[#343434]
          z-40
          px-10
        "
      >
        <div
          className="
            h-full
            max-w-[1200px]
            mx-auto
            flex
            items-center
            justify-between
            gap-50
          "
        >

          {/* HOME */}
          <button
            onClick={() =>
              navigate("/home")
            }
            className={`
              flex-1
              max-w-[220px]
              h-[54px]
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              font-medium
              transition-all

              ${
                pathname === "/home"
                  ? "bg-[#343434] text-white"
                  : "text-[#8f8f8f] hover:bg-[#2a2a2a] hover:text-white"
              }
            `}
          >
            <FaHome size={20} />

            <span>
              Home
            </span>
          </button>


          {/* NEW ORDER */}
          <button
            onClick={openModal}
            disabled={newOrderDisabled}
            className={`
              flex-1
              max-w-[220px]
              h-[54px]
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              font-semibold
              transition-all

              ${
                newOrderDisabled
                  ? "bg-[#343434] text-[#666] cursor-not-allowed"
                  : "bg-[#fb6100] text-white hover:bg-[#e55700]"
              }
            `}
          >
            <BiSolidDish size={22} />

            <span>
              New Order
            </span>
          </button>


          {/* ORDERS */}
          <button
            onClick={() =>
              navigate("/orders")
            }
            className={`
              flex-1
              max-w-[220px]
              h-[54px]
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              font-medium
              transition-all

              ${
                pathname === "/orders"
                  ? "bg-[#343434] text-white"
                  : "text-[#8f8f8f] hover:bg-[#2a2a2a] hover:text-white"
              }
            `}
          >
            <MdOutlineReorder size={21} />

            <span>
              Orders
            </span>
          </button>


          {/* TABLES */}
          <button
            onClick={() =>
              navigate("/tables")
            }
            className={`
              flex-1
              max-w-[220px]
              h-[54px]
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              font-medium
              transition-all

              ${
                pathname === "/tables"
                  ? "bg-[#343434] text-white"
                  : "text-[#8f8f8f] hover:bg-[#2a2a2a] hover:text-white"
              }
            `}
          >
            <MdTableBar size={21} />

            <span>
              Tables
            </span>
          </button>

        </div>
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
            <div
              className="
                flex
                items-center
                justify-between
                mb-6
              "
            >
              <div>
                <h2
                  className="
                    text-white
                    text-2xl
                    font-bold
                  "
                >
                  Create Order
                </h2>

                <p
                  className="
                    text-[#777]
                    text-sm
                    mt-1
                  "
                >
                  Enter customer information
                </p>
              </div>

              <button
                onClick={closeModal}
                className="
                  text-[#ababab]
                  hover:text-white
                  transition
                "
              >
                <IoClose size={28} />
              </button>
            </div>


            {/* CUSTOMER NAME */}
            <div>
              <label
                className="
                  block
                  text-[#ababab]
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Customer Name
              </label>

              <div
                className="
                  flex
                  items-center
                  rounded-xl
                  px-4
                  py-3
                  bg-[#252525]
                  border
                  border-[#343434]
                  focus-within:border-[#fb6100]
                  transition
                "
              >
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  type="text"
                  placeholder="Enter customer name"
                  className="
                    bg-transparent
                    flex-1
                    text-white
                    placeholder-[#666]
                    focus:outline-none
                  "
                />
              </div>
            </div>


            {/* CUSTOMER PHONE */}
            <div className="mt-4">
              <label
                className="
                  block
                  text-[#ababab]
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Customer Phone
              </label>

              <div
                className="
                  flex
                  items-center
                  rounded-xl
                  px-4
                  py-3
                  bg-[#252525]
                  border
                  border-[#343434]
                  focus-within:border-[#fb6100]
                  transition
                "
              >
                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="
                    bg-transparent
                    flex-1
                    text-white
                    placeholder-[#666]
                    focus:outline-none
                  "
                />
              </div>
            </div>


            {/* GUESTS */}
            <div className="mt-4">
              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-[#ababab]
                "
              >
                Guests
              </label>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  bg-[#252525]
                  border
                  border-[#343434]
                  px-4
                  py-3
                  rounded-xl
                "
              >

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
                  <span
                    className="
                      text-white
                      text-xl
                      font-bold
                    "
                  >
                    {guestCount}
                  </span>

                  <p
                    className="
                      text-[#777]
                      text-xs
                      mt-1
                    "
                  >
                    {guestCount === 1
                      ? "person"
                      : "people"}
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
              disabled={
                !name.trim() ||
                !phone.trim() ||
                guestCount < 1
              }
              className="
                w-full
                bg-[#fb6100]
                hover:bg-[#e55700]
                disabled:bg-[#3a3a3a]
                disabled:text-[#777]
                disabled:cursor-not-allowed
                text-white
                font-semibold
                rounded-xl
                py-3.5
                mt-6
                transition
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