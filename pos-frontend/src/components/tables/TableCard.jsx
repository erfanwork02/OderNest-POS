import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { updateTable } from "../../redux/slices/customerSlice";
import { getRandomBg } from "../../utils";
import api from "../../https";


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

  // Local table data so the card updates immediately
  const [tableData, setTableData] = useState(table);
  const [updating, setUpdating] = useState(false);

  const isBooked =
    tableData.status === "Booked";

  // GET CUSTOMER FROM CURRENT ORDER
  const customerName =
    tableData.currentOrder?.customerDetails?.name || "";

  const initials =
    getInitials(customerName);


  // ==============================
  // CUSTOMER TABLE COLOR
  // ==============================
  const tableColor = useMemo(() => {
    if (!customerName) {
      return "#000000";
    }

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
        tableNo: tableData.tableNo,
        tableId: tableData._id,
      })
    );

    navigate("/menu");
  };


  // ==============================
  // MAKE BOOKED TABLE AVAILABLE
  // ==============================
  const handleMakeAvailable = async () => {
    try {
      setUpdating(true);

      await api.put(
        `/api/table/${tableData._id}`,
        {
          status: "Available",
          currentOrder: null,
        }
      );

      // Update UI immediately
      setTableData((previousTable) => ({
        ...previousTable,
        status: "Available",
        currentOrder: null,
      }));

    } catch (error) {
      console.error(
        "Error updating table:",
        error
      );

      alert("Could not update the table.");
    } finally {
      setUpdating(false);
    }
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
            Table {tableData.tableNo}
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

          {tableData.status}

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
          SEATS + BUTTONS
      ============================== */}
      <div className="flex items-center justify-between gap-3">

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
            Up to {tableData.seats} guests
          </span>

        </div>


        {/* BUTTONS */}
        <div className="flex items-center gap-2">

          {/* BOOKED TABLE BUTTONS */}
          {isBooked ? (
            <>
              <button
                onClick={handleSelectTable}
                className="
                  text-xs
                  font-semibold
                  px-3
                  py-2
                  rounded-lg
                  bg-[#343434]
                  text-[#ababab]
                  hover:text-white
                  hover:bg-[#3d3d3d]
                  transition
                "
              >
                View Order
              </button>

              <button
                onClick={handleMakeAvailable}
                disabled={updating}
                className="
                  text-xs
                  font-semibold
                  px-3
                  py-2
                  rounded-lg
                  bg-green-600
                  text-white
                  hover:bg-green-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                {updating
                  ? "Updating..."
                  : "Make Available"}
              </button>
            </>
          ) : (

            /* AVAILABLE TABLE */
            <button
              onClick={handleSelectTable}
              className="
                text-xs
                font-semibold
                px-3
                py-2
                rounded-lg
                bg-[#fb6100]
                text-white
                hover:bg-[#e55700]
                transition
              "
            >
              Select Table
            </button>

          )}

        </div>

      </div>

    </div>
  );
};

export default TableCard;