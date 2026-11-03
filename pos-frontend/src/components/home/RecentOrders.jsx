import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";

import useOrders from "../../hooks/useOrders";
import { matchesOrder } from "../../utils/orderDisplay";
import { useNavigate } from "react-router-dom";

const RecentOrders = () => {
  const navigate = useNavigate();
  const { data: orders = [], isPending, isError, refetch } = useOrders();
  const [search, setSearch] = useState("");

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-white text-xl font-bold">
            Recent Orders
          </h1>

          
        </div>

        <button onClick={() => navigate("/orders")} className="text-[#fb6100] text-sm font-semibold hover:text-[#ff7b2c] transition">
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
          {isPending ? <p className="text-white">Loading orders...</p> : isError ? <p role="alert" className="text-white">Unable to load orders. <button onClick={() => refetch()}>Retry</button></p> : orders.filter((order) => matchesOrder(order, search)).length ? orders.filter((order) => matchesOrder(order, search)).map((order) => <OrderList key={order._id} order={order} />) : <p className="text-gray-400">No orders available</p>}
        </div>
      </div>

    </div>
  );
};

export default RecentOrders;