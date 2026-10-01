import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSearch,
  FaUsers,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { MdTableRestaurant } from "react-icons/md";

import { tables } from "../constants";
import BottomNav from "../components/shared/BottomNav";

const colors = ["#fb6100", "#00b86b", "#3478f6", "#f6b100"];

function Tables() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const bookedCount = tables.filter(
    (table) => table.status === "Booked"
  ).length;

  const availableCount = tables.filter(
    (table) => table.status !== "Booked"
  ).length;

  const visibleTables = tables.filter((table) => {
    const matchesFilter =
      filter === "All" ||
      table.status.toLowerCase() === filter.toLowerCase();

    const matchesSearch = table.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filters = [
    {
      name: "All",
      count: tables.length,
    },
    {
      name: "Available",
      count: availableCount,
    },
    {
      name: "Booked",
      count: bookedCount,
    },
  ];

  return (
    <section className="min-h-screen bg-[#161616] text-white pb-28">

      {/* PAGE HEADER */}
      <div className="bg-[#1c1c1c] border-b border-[#2f2f2f] px-8 py-6">

        {/* TOP ROW */}
        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="
                w-12
                h-12
                flex
                items-center
                justify-center
                rounded-xl
                bg-[#252525]
                border
                border-[#343434]
                text-[#ababab]
                hover:text-white
                hover:border-[#fb6100]
                transition
              "
            >
              <FaArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Tables
              </h1>

              <p className="text-[#777] text-sm mt-1">
                Manage restaurant seating and table availability
              </p>
            </div>

          </div>

          {/* RIGHT SUMMARY */}
          <div className="flex items-center gap-3">

            <div className="bg-[#252525] border border-[#343434] rounded-xl px-5 py-3">
              <p className="text-[#777] text-xs">
                Total Tables
              </p>

              <p className="text-xl font-bold mt-1">
                {tables.length}
              </p>
            </div>

            <div className="bg-[#252525] border border-[#343434] rounded-xl px-5 py-3">
              <p className="text-[#777] text-xs">
                Available
              </p>

              <p className="text-xl font-bold text-green-400 mt-1">
                {availableCount}
              </p>
            </div>

            <div className="bg-[#252525] border border-[#343434] rounded-xl px-5 py-3">
              <p className="text-[#777] text-xs">
                Booked
              </p>

              <p className="text-xl font-bold text-[#fb6100] mt-1">
                {bookedCount}
              </p>
            </div>

          </div>
        </div>


        {/* SEARCH + FILTER */}
        <div className="flex items-center justify-between mt-6 gap-6">

          {/* SEARCH */}
          <div
            className="
              flex
              items-center
              gap-3
              bg-[#252525]
              border
              border-[#343434]
              rounded-xl
              px-4
              py-3
              w-[340px]
              focus-within:border-[#fb6100]
              transition
            "
          >
            <FaSearch className="text-[#777]" />

            <input
              type="text"
              placeholder="Search table..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                bg-transparent
                text-white
                placeholder-[#666]
                outline-none
                w-full
                text-sm
              "
            />
          </div>


          {/* FILTERS */}
          <div className="flex items-center bg-[#252525] border border-[#343434] rounded-xl p-1.5">

            {filters.map((option) => (
              <button
                key={option.name}
                onClick={() => setFilter(option.name)}
                className={`
                  flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-lg
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    filter === option.name
                      ? "bg-[#fb6100] text-white shadow-lg"
                      : "text-[#999] hover:text-white hover:bg-[#303030]"
                  }
                `}
              >
                {option.name}

                <span
                  className={`
                    text-xs
                    px-2
                    py-0.5
                    rounded-full
                    ${
                      filter === option.name
                        ? "bg-white/20 text-white"
                        : "bg-[#383838] text-[#aaa]"
                    }
                  `}
                >
                  {option.count}
                </span>

              </button>
            ))}

          </div>
        </div>
      </div>


      {/* MAIN CONTENT */}
      <div className="px-8 py-6">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold">
              Restaurant Floor
            </h2>

            <p className="text-[#777] text-sm mt-1">
              {visibleTables.length} tables shown
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#777]">

            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />

            <span>Available</span>

            <div className="w-2.5 h-2.5 rounded-full bg-[#fb6100] ml-3" />

            <span>Booked</span>

          </div>
        </div>


        {/* TABLE GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
            gap-5
          "
        >
          {visibleTables.map((table, index) => {
            const isBooked = table.status === "Booked";

            return (
              <div
                key={table.id}
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
                  cursor-pointer
                "
              >

                {/* TOP ACCENT */}
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


                {/* TOP */}
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-[#777] text-xs uppercase tracking-widest">
                      Table
                    </p>

                    <h2 className="text-xl font-bold mt-1">
                      {table.name}
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


                {/* TABLE VISUAL */}
                <div className="flex justify-center items-center py-8">

                  <div className="relative">

                    {/* CHAIRS */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-3 rounded-md bg-[#343434]" />

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-7 h-3 rounded-md bg-[#343434]" />

                    <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-3 h-7 rounded-md bg-[#343434]" />

                    <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-3 h-7 rounded-md bg-[#343434]" />


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
                      "
                      style={{
                        backgroundColor:
                          colors[index % colors.length],
                      }}
                    >
                      <span className="text-white text-xl font-bold">
                        {table.initial}
                      </span>
                    </div>

                  </div>
                </div>


                {/* DIVIDER */}
                <div className="h-[1px] bg-[#303030] mb-4" />


                {/* BOTTOM INFO */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2 text-[#8f8f8f]">

                    <FaUsers size={14} />

                    <span className="text-sm">
                      Up to 4 guests
                    </span>

                  </div>


                  <button
                    className={`
                      text-xs
                      font-semibold
                      px-3
                      py-2
                      rounded-lg
                      transition
                      ${
                        isBooked
                          ? "bg-[#343434] text-[#ababab] hover:text-white"
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
          })}
        </div>


        {/* EMPTY STATE */}
        {visibleTables.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">

            <div className="bg-[#252525] p-5 rounded-2xl text-[#fb6100] mb-4">
              <MdTableRestaurant size={40} />
            </div>

            <h2 className="text-xl font-bold">
              No tables found
            </h2>

            <p className="text-[#777] text-sm mt-2">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

      <BottomNav />

    </section>
  );
}

export default Tables;