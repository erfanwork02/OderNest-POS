import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Modal = ({ setIsTableModalOpen, onTableAdded }) => {
  const [tableData, setTableData] = useState({
    tableNo: "",
    seats: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTableData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Close modal
  const handleCloseModal = () => {
    setIsTableModalOpen(false);
  };

  // Add table
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!tableData.tableNo || !tableData.seats) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(tableData.tableNo) <= 0) {
      setError("Table number must be greater than 0.");
      return;
    }

    if (Number(tableData.seats) <= 0) {
      setError("Number of seats must be greater than 0.");
      return;
    }

    const newTable = {
      tableNo: Number(tableData.tableNo),
      seats: Number(tableData.seats),
    };

    console.log("Table Data:", newTable);

    try {
      setLoading(true);

      // =========================================
      // SEND TABLE DATA TO BACKEND
      // =========================================
      const response = await fetch(
        "http://localhost:8000/api/table",
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newTable),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to add table."
        );
      }

      console.log("Table Added Successfully:", result);

      // Let Dashboard know a table was added
      if (onTableAdded) {
        onTableAdded(result.data);
      }

      // Reset form
      setTableData({
        tableNo: "",
        seats: "",
      });

      // Close modal
      setIsTableModalOpen(false);
    } catch (error) {
      console.error("Add Table Error:", error);

      setError(
        error.message || "Unable to add table."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-[999]
      "
      onClick={handleCloseModal}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-[#262626]
          border
          border-[#383838]
          p-6
          rounded-xl
          shadow-2xl
          w-[420px]
          max-w-[90%]
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[#f5f5f5] text-xl font-semibold">
              Add Table
            </h2>

            <p className="text-[#888] text-sm mt-1">
              Create a new restaurant table
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            className="
              text-[#ababab]
              hover:text-red-500
              transition
              cursor-pointer
            "
          >
            <IoMdClose size={25} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* TABLE NUMBER */}
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
              Table Number
            </label>

            <div
              className="
                flex
                items-center
                rounded-lg
                px-4
                bg-[#1f1f1f]
                border
                border-[#333]
                focus-within:border-[#fb6100]
                transition
              "
            >
              <input
                type="number"
                name="tableNo"
                value={tableData.tableNo}
                onChange={handleInputChange}
                placeholder="Enter table number"
                min="1"
                className="
                  bg-transparent
                  w-full
                  py-4
                  text-white
                  placeholder-[#666]
                  focus:outline-none
                "
                required
              />
            </div>
          </div>

          {/* NUMBER OF SEATS */}
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
              Number of Seats
            </label>

            <div
              className="
                flex
                items-center
                rounded-lg
                px-4
                bg-[#1f1f1f]
                border
                border-[#333]
                focus-within:border-[#fb6100]
                transition
              "
            >
              <input
                type="number"
                name="seats"
                value={tableData.seats}
                onChange={handleInputChange}
                placeholder="Enter number of seats"
                min="1"
                className="
                  bg-transparent
                  w-full
                  py-4
                  text-white
                  placeholder-[#666]
                  focus:outline-none
                "
                required
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                text-sm
                p-3
                rounded-lg
              "
            >
              {error}
            </div>
          )}

          {/* ADD TABLE BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-3
              py-3.5
              rounded-lg
              bg-[#fb6100]
              hover:bg-[#e85a00]
              text-white
              font-bold
              text-base
              transition
              cursor-pointer
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Adding Table..." : "Add Table"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;