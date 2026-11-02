import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaUsers, FaCheckCircle, FaClock } from "react-icons/fa";

import { updateTable } from "../../redux/slices/customerSlice";
import { getRandomBg } from "../../utils";

const getInitials = (name) => {
  if (!name) return "N/A";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
};

const TableCard = ({ table }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isBooked = table.status === "Booked";

  const customerName =
    table.currentOrder?.customerDetails?.name || "";

  const initials = getInitials(customerName);

  const customerBg = useMemo(() => {
    return customerName ? getRandomBg() : "#000000";
  }, [customerName]);

  const handleClick = () => {
    if (isBooked) return;

    dispatch(
      updateTable({
        tableNo: table.tableNo,
        tableId: table._id,
      })
    );

    navigate("/menu");
  };

  return (
    <div
      onClick={handleClick}
      className="w-full bg-[#1c1c1c] border border-[#303030] hover:border-[#fb6100]/70 hover:bg-[#202020] p-5 rounded-2xl transition-all duration-300"
    >
      {/* TOP */}

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#777] text-xs uppercase tracking-widest">
            Table
          </p>

          <h1 className="text-[#f5f5f5] text-xl font-bold mt-1">
            Table {table.tableNo}
          </h1>
        </div>

        <span
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
            isBooked
              ? "bg-[#fb6100]/10 text-[#fb6100]"
              : "bg-green-500/10 text-green-400"
          }`}
        >
          {isBooked ? (
            <FaClock size={11} />
          ) : (
            <FaCheckCircle size={11} />
          )}

          {table.status}
        </span>
      </div>

      {/* CUSTOMER INITIALS */}

      <div className="flex flex-col items-center justify-center py-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
          style={{
            backgroundColor: customerBg,
          }}
        >
          {initials}
        </div>

        <p className="text-[#ababab] text-sm mt-3">
          {customerName || "No Customer"}
        </p>
      </div>

      <div className="h-[1px] bg-[#303030] mb-4" />

      {/* BOTTOM */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#8f8f8f]">
          <FaUsers size={14} />

          <span className="text-sm">
            Up to {table.seats} guests
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          disabled={isBooked}
          className={`text-xs font-semibold px-3 py-2 rounded-lg transition ${
            isBooked
              ? "bg-[#343434] text-[#ababab] cursor-not-allowed"
              : "bg-[#fb6100] text-white hover:bg-[#e55700]"
          }`}
        >
          {isBooked ? "Booked" : "Select Table"}
        </button>
      </div>
    </div>
  );
};

export default TableCard;