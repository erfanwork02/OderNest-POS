import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/shared/orders/OrderCard";
import BackButton from "../components/shared/shared/BackButton";

const Orders = () => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filters = [
    { id: "all", label: "All Orders", count: 12 },
    { id: "progress", label: "In Progress", count: 5 },
    { id: "ready", label: "Ready", count: 3 },
    { id: "completed", label: "Completed", count: 4 },
  ];

  return (
    <section className="bg-[#161616] h-[calc(100vh-5rem)] overflow-hidden text-white">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-4 border-b border-[#2f2f2f] bg-[#1c1c1c]">

        <div className="flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            <BackButton />

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Orders
              </h1>

              <p className="text-[#8f8f8f] text-sm mt-1">
                View and manage restaurant orders
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            <div className="bg-[#252525] border border-[#343434] rounded-xl px-4 py-2">
              <p className="text-xs text-[#8f8f8f]">
                Active Orders
              </p>

              <p className="text-xl font-bold text-[#fb6100]">
                8
              </p>
            </div>

            <button className="bg-[#fb6100] hover:bg-[#e55700] transition px-5 py-3 rounded-xl font-semibold shadow-lg">
              + New Order
            </button>

          </div>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex items-center justify-between mt-6 gap-6">

          {/* SEARCH */}
          <div className="relative w-[320px]">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-[#252525]
                border border-[#343434]
                rounded-xl
                py-3
                pl-11
                pr-4
                text-sm
                text-white
                placeholder-[#777]
                outline-none
                focus:border-[#fb6100]
                transition
              "
            />

          </div>

          {/* STATUS FILTER */}
          <div className="flex bg-[#252525] p-1.5 rounded-xl border border-[#343434]">

            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setStatus(filter.id)}
                className={`
                  flex items-center gap-2
                  px-5 py-2.5
                  rounded-lg
                  text-sm
                  font-semibold
                  transition-all duration-200
                  ${
                    status === filter.id
                      ? "bg-[#fb6100] text-white shadow-md"
                      : "text-[#9f9f9f] hover:text-white hover:bg-[#303030]"
                  }
                `}
              >
                {filter.label}

                <span
                  className={`
                    text-xs
                    px-2 py-0.5
                    rounded-full
                    ${
                      status === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-[#383838] text-[#aaa]"
                    }
                  `}
                >
                  {filter.count}
                </span>
              </button>
            ))}

          </div>
        </div>
      </div>

      {/* ORDER CONTENT */}
      <div className="px-8 py-5 h-[calc(100vh-17rem)] flex flex-col overflow-hidden">

        {/* SECTION TITLE */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-lg font-semibold">
              {status === "all" && "All Orders"}
              {status === "progress" && "Orders In Progress"}
              {status === "ready" && "Ready Orders"}
              {status === "completed" && "Completed Orders"}
            </h2>

            <p className="text-[#777] text-sm mt-1">
              Showing {filters.find((item) => item.id === status)?.count} orders
            </p>
          </div>

          <select
            className="
              bg-[#252525]
              border border-[#343434]
              text-[#aaa]
              rounded-lg
              px-4 py-2
              text-sm
              outline-none
              cursor-pointer
            "
          >
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Order Number</option>
          </select>

        </div>

        {/* ORDER CARDS */}
        <div
  className="
    flex flex-wrap
    content-start
    gap-6
    px-10
    pt-4
    pb-32
    overflow-y-auto
    scrollbar-hide
    flex-1
    min-h-0
  "
>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>

      </div>

      <BottomNav />

    </section>
  );
};

export default Orders;