import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";

import { MdTableRestaurant } from "react-icons/md";

import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";

import { getTables } from "../https";
import { useQuery } from "@tanstack/react-query";

function Tables() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const {
    data: resData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const tables = resData?.data?.data || [];

  const bookedCount = tables.filter(
    (table) => table.status === "Booked"
  ).length;

  const availableCount = tables.filter(
    (table) => table.status === "Available"
  ).length;

  const visibleTables = tables.filter((table) => {
    const matchesFilter =
      filter === "All" ||
      table.status?.toLowerCase() === filter.toLowerCase();

    const customerName =
      table.currentOrder?.customerDetails?.name || "";

    const searchValue = search.toLowerCase();

    const matchesSearch =
      `Table ${table.tableNo}`
        .toLowerCase()
        .includes(searchValue) ||
      customerName
        .toLowerCase()
        .includes(searchValue);

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

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#161616] text-white flex items-center justify-center">
        <p className="text-[#ababab]">
          Loading tables...
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen bg-[#161616] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 font-semibold">
            Failed to load tables
          </p>

          <p className="text-[#777] text-sm mt-2">
            {error?.response?.data?.message ||
              error?.message}
          </p>
        </div>
      </section>
    );
  }

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
              placeholder="Search table or customer..."
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
                onClick={() =>
                  setFilter(option.name)
                }
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
          {visibleTables.map((table) => (
            <TableCard
              key={table._id}
              table={table}
            />
          ))}
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