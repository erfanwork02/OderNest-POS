import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { updateTable } from "../../redux/slices/customerSlice";
import { getRandomBg } from "../../utils";


// ==============================
// GET CUSTOMER INITIALS
// ==============================
const getInitials = (name) => {
  if (!name) return "N/A";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0]
      .substring(0, 2)
      .toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
};


const TableCard = ({ table }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isBooked =
    table.status === "Booked";

  // GET CUSTOMER FROM CURRENT ORDER
  const customerName =
    table.currentOrder?.customerDetails?.name || "";

  const initials =
    getInitials(customerName);


  // ==============================
  // CUSTOMER TABLE COLOR
  // ==============================
  const tableColor = useMemo(() => {
    // NO CUSTOMER = BLACK
    if (!customerName) {
      return "#000000";
    }

    // CUSTOMER EXISTS = RANDOM COLOR
    return getRandomBg();
  }, [customerName]);


  // ==============================
  // SELECT AVAILABLE TABLE
  // ==============================
  const handleSelectTable = () => {
    if (isBooked) {
      navigate("/orders");
      return;
    }

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
      className="
        group
        relative
        overflow-hidden
        bg-[#1c1c1c]
        border
        border-[#303030]
        rounded-2xl
        p-5
        shadow-lg
        hover:border-[#fb6100]/70
        hover:bg-[#202020]
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      {/* ==============================
          TOP STATUS LINE
      ============================== */}
      <div
        className={`
          absolute
          top-0
          left-0
          right-0
          h-[3px]

          ${
            isBooked
              ? "bg-[#fb6100]"
              : "bg-green-500"
          }
        `}
      />


      {/* ==============================
          TABLE NUMBER + STATUS
      ============================== */}
      <div className="flex items-start justify-between">

        <div>

          <p
            className="
              text-[#777]
              text-xs
              uppercase
              tracking-widest
            "
          >
            Table
          </p>

          <h2
            className="
              text-white
              text-xl
              font-bold
              mt-1
            "
          >
            Table {table.tableNo}
          </h2>

        </div>


        {/* STATUS */}
        <span
          className={`
            flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-lg
            text-xs
            font-semibold

            ${
              isBooked
                ? "bg-[#fb6100]/10 text-[#fb6100]"
                : "bg-green-500/10 text-green-400"
            }
          `}
        >

          {isBooked ? (
            <FaClock size={11} />
          ) : (
            <FaCheckCircle size={11} />
          )}

          {table.status}

        </span>

      </div>


      {/* ==============================
          TABLE + CHAIRS
      ============================== */}
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          py-8
        "
      >

        <div className="relative">

          {/* TOP CHAIR */}
          <div
            className="
              absolute
              -top-4
              left-1/2
              -translate-x-1/2
              w-7
              h-3
              rounded-md
              bg-[#343434]
            "
          />


          {/* BOTTOM CHAIR */}
          <div
            className="
              absolute
              -bottom-4
              left-1/2
              -translate-x-1/2
              w-7
              h-3
              rounded-md
              bg-[#343434]
            "
          />


          {/* LEFT CHAIR */}
          <div
            className="
              absolute
              top-1/2
              -left-5
              -translate-y-1/2
              w-3
              h-7
              rounded-md
              bg-[#343434]
            "
          />


          {/* RIGHT CHAIR */}
          <div
            className="
              absolute
              top-1/2
              -right-5
              -translate-y-1/2
              w-3
              h-7
              rounded-md
              bg-[#343434]
            "
          />


          {/* TABLE */}
          <div
            className="
              w-20
              h-20
              rounded-2xl
              flex
              items-center
              justify-center
              shadow-xl
              group-hover:scale-105
              transition-transform
              duration-300
            "
            style={{
              backgroundColor: tableColor,
            }}
          >

            <span
              className="
                text-white
                text-xl
                font-bold
              "
            >
              {initials}
            </span>

          </div>

        </div>


        {/* CUSTOMER NAME */}
        <p
          className="
            text-[#ababab]
            text-sm
            mt-7
          "
        >
          {customerName || "No Customer"}
        </p>

      </div>


      {/* ==============================
          DIVIDER
      ============================== */}
      <div
        className="
          h-[1px]
          bg-[#303030]
          mb-4
        "
      />


      {/* ==============================
          SEATS + BUTTON
      ============================== */}
      <div className="flex items-center justify-between">

        {/* SEATS */}
        <div
          className="
            flex
            items-center
            gap-2
            text-[#8f8f8f]
          "
        >

          <FaUsers size={14} />

          <span className="text-sm">
            Up to {table.seats} guests
          </span>

        </div>


        {/* BUTTON */}
        <button
          onClick={handleSelectTable}
          className={`
            text-xs
            font-semibold
            px-3
            py-2
            rounded-lg
            transition

            ${
              isBooked
                ? "bg-[#343434] text-[#ababab] hover:text-white hover:bg-[#3d3d3d]"
                : "bg-[#fb6100] text-white hover:bg-[#e55700]"
            }
          `}
        >

          {isBooked
            ? "View Order"
            : "Select Table"}

        </button>

      </div>

    </div>
  );
};

export default TableCard;