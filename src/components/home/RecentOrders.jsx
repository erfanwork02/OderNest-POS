import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";

const RecentOrders = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-white text-xl font-bold">
            Recent Orders
          </h1>

          <p className="text-[#777] text-sm mt-1">
            Track and manage the latest orders
          </p>
        </div>

        <button className="text-[#fb6100] text-sm font-semibold hover:text-[#ff7b2c] transition">
          View All
        </button>
      </div>

      {/* SEARCH BAR */}
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
          mb-4
          focus-within:border-[#fb6100]
          transition
        "
      >
        <FaSearch className="text-[#777]" />

        <input
          type="text"
          placeholder="Search recent orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            bg-transparent
            outline-none
            text-white
            placeholder-[#777]
            w-full
            text-sm
          "
        />
      </div>

      {/* ORDER LIST */}
      <div
        className="
          bg-[#1f1f1f]
          border
          border-[#303030]
          rounded-2xl
          p-4
          max-h-[698px]
          overflow-y-auto
          scrollbar-hide
          
        "
      >
        <div className="flex flex-col gap-3 ">
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
      </div>

    </div>
  );
};

export default RecentOrders;