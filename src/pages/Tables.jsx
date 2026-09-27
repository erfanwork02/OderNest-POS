import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { tables } from "../constants";

const colors = ["#c7474d", "#00c83c", "#0068ce", "#f6b100"];

function Tables() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const visibleTables =
    filter === "Booked"
      ? tables.filter((table) => table.status === "Booked")
      : tables;

  return (
    <section className="min-h-screen bg-[#1f1f1f] px-6 py-6 pb-28 text-[#f5f5f5]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Back to home"
            className="rounded-full bg-[#025cca] p-3"
          >
            <FaArrowLeft size={20} />
          </button>

          <h1 className="text-2xl font-bold">Tables</h1>
        </div>

        <div className="flex gap-2">
          {["All", "Booked"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={`rounded-lg px-5 py-3 font-semibold ${
                filter === option
                  ? "bg-[#383838] text-white"
                  : "text-[#ababab] hover:bg-[#303030]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {visibleTables.map((table) => (
          <div key={table.id} className="rounded-lg bg-[#262626] p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">{table.name}</h2>

              <span
                className={`rounded-lg px-2 py-1 text-sm font-medium ${
                  table.status === "Booked"
                    ? "bg-[#2e4a40] text-[#50c997]"
                    : "bg-[#735600] text-[#fff0b3]"
                }`}
              >
                {table.status}
              </span>
            </div>

            <div className="flex justify-center py-6">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl text-white"
                style={{
                  backgroundColor: colors[(table.id - 1) % colors.length],
                }}
              >
                {table.initial}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tables;