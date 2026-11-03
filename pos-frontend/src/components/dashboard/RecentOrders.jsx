import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";

import { useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../https/index";
import useOrders from "../../hooks/useOrders";

const RecentOrders = () => {
  const queryClient = useQueryClient();
  const { data: loadedOrders = [], isPending: loading, refetch, error: loadError } = useOrders();
  const [draftStatuses, setDraftStatuses] = useState({});
  const orders = loadedOrders.map((order) => ({ ...order, orderStatus: draftStatuses[order._id] ?? order.orderStatus }));
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");


  const fetchOrders = () => refetch();

  // ============================================
  // CHANGE STATUS LOCALLY
  // ============================================
  const handleStatusChange = (orderId, newStatus) => {
    setDraftStatuses((previous) => ({ ...previous, [orderId]: newStatus }));
  };


  // ============================================
  // UPDATE STATUS IN MONGODB
  // ============================================
  const handleUpdateStatus = async (orderId) => {
    try {
      setUpdatingId(orderId);
      setError("");

      const order = orders.find(
        (currentOrder) => currentOrder._id === orderId
      );

      if (!order) return;

      await updateOrderStatus({ orderId, orderStatus: order.orderStatus });
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

    } catch (error) {
      console.error("Error updating order:", error);
      setError(error.message);

      // Reload correct database values if update failed
      await fetchOrders();
    } finally {
      setDraftStatuses((previous) => {
        const next = { ...previous };
        delete next[orderId];
        return next;
      });
      setUpdatingId(null);
    }
  };


  // ============================================
  // FORMAT DATE
  // ============================================
  const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
  };


  // ============================================
  // GET ORDER TOTAL
  // ============================================
  const getOrderTotal = (order) => {
    return (
      order?.bills?.totalWithTax ??
      order?.bills?.total ??
      order?.bills?.totals ??
      0
    );
  };


  // ============================================
  // GET TABLE NUMBER
  // ============================================
  const getTableNumber = (order) => {
    if (!order.table) {
      return "N/A";
    }

    // Works after table population is added
    // to the backend
    if (typeof order.table === "object") {
      return (
        order.table.tableNo ||
        order.table.tableNumber ||
        order.table.name ||
        "N/A"
      );
    }

    return "N/A";
  };


  // ============================================
  // FILTER ORDERS
  // ============================================
  const filteredOrders = orders
    .filter((order) => {
      const searchValue = search.toLowerCase();

      const customerName =
        order.customerDetails?.name?.toLowerCase() || "";

      const orderId =
        order._id?.toLowerCase() || "";

      const status =
        order.orderStatus?.toLowerCase() || "";

      return (
        customerName.includes(searchValue) ||
        orderId.includes(searchValue) ||
        status.includes(searchValue)
      );
    })
    .slice(0, 10);


  // ============================================
  // STATUS COLOR
  // ============================================
  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "text-green-400 border-green-500/30";

      case "Completed":
        return "text-blue-400 border-blue-500/30";

      default:
        return "text-yellow-400 border-yellow-500/30";
    }
  };


  return (
    <div className="w-full">

      {/* ============================================
          HEADER
      ============================================ */}
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-5
        "
      >

        <div>
          <h2 className="text-white text-xl font-bold">
            Recent Orders
          </h2>

          <p className="text-[#777] text-sm mt-1">
            View and update recent restaurant orders
          </p>
        </div>


        {/* REFRESH */}
        <button
          onClick={fetchOrders}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-[#1f1f1f]
            border
            border-[#303030]
            hover:border-[#fb6100]/50
            text-[#ababab]
            hover:text-white
            px-4
            py-2.5
            rounded-xl
            text-sm
            transition
            cursor-pointer
          "
        >
          <GrUpdate />

          Refresh
        </button>

      </div>


      {/* ============================================
          SEARCH
      ============================================ */}
      <div
        className="
          flex
          items-center
          gap-3
          bg-[#1f1f1f]
          border
          border-[#303030]
          rounded-xl
          px-4
          py-3
          mb-5
          focus-within:border-[#fb6100]
          transition
        "
      >
        <FaSearch className="text-[#777]" />

        <input
          type="text"
          placeholder="Search by customer, order ID or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-transparent
            outline-none
            text-white
            placeholder-[#666]
            text-sm
          "
        />
      </div>


      {/* ============================================
          ERROR
      ============================================ */}
      {(error || loadError) && (
        <div
          className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            px-4
            py-3
            rounded-xl
            mb-5
            text-sm
          "
        >
          {error || loadError?.message}
        </div>
      )}


      {/* ============================================
          TABLE
      ============================================ */}
      <div
        className="
          bg-[#1f1f1f]
          border
          border-[#303030]
          rounded-2xl
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            {/* TABLE HEADER */}
            <thead className="bg-[#252525]">

              <tr className="text-[#8f8f8f] text-xs uppercase">

                <th className="px-5 py-4">
                  Order ID
                </th>

                <th className="px-5 py-4">
                  Customer
                </th>

                <th className="px-5 py-4">
                  Status
                </th>

                <th className="px-5 py-4">
                  Date & Time
                </th>

                <th className="px-5 py-4">
                  Items
                </th>

                <th className="px-5 py-4">
                  Table
                </th>

                <th className="px-5 py-4">
                  Total
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>


            {/* TABLE BODY */}
            <tbody>

              {/* LOADING */}
              {loading && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12 text-[#777]"
                  >
                    Loading orders...
                  </td>
                </tr>
              )}


              {/* NO ORDERS */}
              {!loading && filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12"
                  >
                    <p className="text-[#ababab] font-medium">
                      No orders found
                    </p>

                    <p className="text-[#666] text-sm mt-1">
                      New orders will appear here.
                    </p>
                  </td>
                </tr>
              )}


              {/* ORDERS */}
              {!loading &&
                filteredOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="
                      border-t
                      border-[#303030]
                      hover:bg-[#252525]
                      transition
                    "
                  >

                    {/* ORDER ID */}
                    <td className="px-5 py-4">

                      <span className="text-[#fb6100] font-semibold text-sm">
                        #
                        {order._id
                          ? order._id.slice(-6).toUpperCase()
                          : "N/A"}
                      </span>

                    </td>


                    {/* CUSTOMER */}
                    <td className="px-5 py-4">

                      <div>
                        <p className="text-white font-medium text-sm">
                          {order.customerDetails?.name ||
                            "Unknown Customer"}
                        </p>

                        <p className="text-[#777] text-xs mt-1">
                          {order.customerDetails?.phone ||
                            "No phone"}
                        </p>
                      </div>

                    </td>


                    {/* STATUS */}
                    <td className="px-5 py-4">

                      <select
                        value={
                          order.orderStatus || "In Progress"
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className={`
                          bg-[#252525]
                          border
                          px-3
                          py-2
                          rounded-lg
                          text-sm
                          outline-none
                          cursor-pointer
                          ${getStatusColor(order.orderStatus)}
                        `}
                      >

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Ready">
                          Ready
                        </option>

                        <option value="Completed">
                          Completed
                        </option>

                      </select>

                    </td>


                    {/* DATE */}
                    <td className="px-5 py-4 text-[#ababab] text-sm">

                      {formatDateTime(
                        order.orderDate ||
                          order.createdAt
                      )}

                    </td>


                    {/* ITEMS */}
                    <td className="px-5 py-4 text-white text-sm">

                      {Array.isArray(order.items)
                        ? order.items.length
                        : 0}{" "}
                      Items

                    </td>


                    {/* TABLE */}
                    <td className="px-5 py-4 text-[#ababab] text-sm">

                      {getTableNumber(order)}

                    </td>


                    {/* TOTAL */}
                    <td className="px-5 py-4">

                      <span className="text-white font-semibold">
                        $
                        {Number(
                          getOrderTotal(order)
                        ).toFixed(2)}
                      </span>

                    </td>


                    {/* UPDATE BUTTON */}
                    <td className="px-5 py-4 text-center">

                      <button
                        onClick={() =>
                          handleUpdateStatus(order._id)
                        }
                        disabled={
                          updatingId === order._id
                        }
                        title="Update order status"
                        className="
                          w-9
                          h-9
                          inline-flex
                          items-center
                          justify-center
                          bg-[#fb6100]/10
                          text-[#fb6100]
                          hover:bg-[#fb6100]
                          hover:text-white
                          rounded-lg
                          transition
                          disabled:opacity-50
                          disabled:cursor-not-allowed
                          cursor-pointer
                        "
                      >

                        <GrUpdate
                          size={16}
                          className={
                            updatingId === order._id
                              ? "animate-spin"
                              : ""
                          }
                        />

                      </button>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default RecentOrders;