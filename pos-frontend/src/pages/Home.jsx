import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";

import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { FaReceipt } from "react-icons/fa";

import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

import api from "../https";

const Home = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD DASHBOARD DATA
  // =========================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [orderResponse, tableResponse] = await Promise.all([
          api.get("/api/order"),
          api.get("/api/table"),
        ]);

        const orderData =
          orderResponse.data?.data?.orders ||
          orderResponse.data?.orders ||
          orderResponse.data?.data ||
          orderResponse.data ||
          [];

        const tableData =
          tableResponse.data?.data?.tables ||
          tableResponse.data?.tables ||
          tableResponse.data?.data ||
          tableResponse.data ||
          [];

        setOrders(Array.isArray(orderData) ? orderData : []);
        setTables(Array.isArray(tableData) ? tableData : []);
      } catch (error) {
        console.error("Dashboard loading error:", error);

        setOrders([]);
        setTables([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // =========================
  // DATE HELPERS
  // =========================

  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // =========================
  // PERCENTAGE CHANGE
  // =========================

  const getPercentageChange = (currentValue, previousValue) => {
    if (previousValue === 0) {
      if (currentValue === 0) {
        return 0;
      }

      return 100;
    }

    const percentage =
      ((currentValue - previousValue) / previousValue) * 100;

    return Number(percentage.toFixed(1));
  };

  // =========================
  // ORDER TOTAL
  // =========================

  const getOrderTotal = (order) => {
    const amount =
      order.bills?.totalWithTax ??
      order.bills?.total ??
      order.totalWithTax ??
      order.total ??
      0;

    return Number(amount);
  };

  // =========================
  // COMPLETED ORDERS
  // =========================

  const completedOrders = orders.filter((order) => {
    return order.orderStatus?.toLowerCase() === "completed";
  });

  // =========================
  // TOTAL EARNINGS
  // =========================

  const totalEarnings = completedOrders.reduce(
    (total, order) => total + getOrderTotal(order),
    0
  );

  // =========================
  // TODAY'S EARNINGS
  // =========================

  const todaysCompletedOrders = completedOrders.filter((order) => {
    if (!order.createdAt) return false;

    const orderDate = new Date(order.createdAt);

    return isSameDay(orderDate, today);
  });

  const todaysEarnings = todaysCompletedOrders.reduce(
    (total, order) => total + getOrderTotal(order),
    0
  );

  // =========================
  // YESTERDAY'S EARNINGS
  // =========================

  const yesterdaysCompletedOrders = completedOrders.filter((order) => {
    if (!order.createdAt) return false;

    const orderDate = new Date(order.createdAt);

    return isSameDay(orderDate, yesterday);
  });

  const yesterdaysEarnings = yesterdaysCompletedOrders.reduce(
    (total, order) => total + getOrderTotal(order),
    0
  );

  const earningsPercentage = getPercentageChange(
    todaysEarnings,
    yesterdaysEarnings
  );

  // =========================
  // IN PROGRESS ORDERS
  // =========================

  const isInProgress = (order) => {
    const status = order.orderStatus?.toLowerCase();

    return (
      status === "in progress" ||
      status === "in-progress" ||
      status === "inprogress"
    );
  };

  const inProgressOrders = orders.filter(isInProgress).length;

  // =========================
  // TABLE INFORMATION
  // =========================

  const availableTables = tables.filter(
    (table) => table.status === "Available"
  ).length;

  const bookedTables = tables.filter(
    (table) => table.status === "Booked"
  ).length;

  // =========================
  // TODAY'S ORDERS
  // =========================

  // =========================
// TODAY'S ORDERS
// =========================

const todaysOrders = orders.filter((order) => {
  const dateValue =
    order.createdAt ||
    order.orderDate;

  if (!dateValue) return false;

  const orderDate = new Date(dateValue);

  return isSameDay(orderDate, today);
});

  // =========================
  // TODAY'S ORDER STATUS COUNTS
  // =========================

  const todaysInProgressOrders = todaysOrders.filter((order) => {
    const status = order.orderStatus?.toLowerCase();

    return (
      status === "in progress" ||
      status === "in-progress" ||
      status === "inprogress"
    );
  }).length;

  const todaysReadyOrders = todaysOrders.filter((order) => {
    return order.orderStatus?.toLowerCase() === "ready";
  }).length;

  const todaysCompletedOrdersCount = todaysOrders.filter((order) => {
    return order.orderStatus?.toLowerCase() === "completed";
  }).length;

  return (
    <section className="bg-[#161616] min-h-[calc(100vh-5rem)] text-white pb-24">

      {/* TOP DASHBOARD AREA */}
      <div className="px-8 pt-6">

        {/* GREETING */}
        <div className="bg-[#1c1c1c] border border-[#2f2f2f] rounded-2xl p-6 shadow-lg">
          <Greetings />
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

          {/* TOTAL EARNINGS */}
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={
              loading
                ? 0
                : Number(totalEarnings.toFixed(2))
            }
            footerNum={
              loading
                ? 0
                : earningsPercentage
            }
          />

          {/* IN PROGRESS */}
          <MiniCard
            title="In Progress"
            icon={<GrInProgress />}
            number={
              loading
                ? 0
                : inProgressOrders
            }
          />

          {/* OPEN TABLES */}
          <div className="bg-[#1f1f1f] border border-[#303030] rounded-2xl p-5 shadow-md hover:border-[#fb6100] transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-[#8f8f8f] text-sm">
                  Open Tables
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {loading ? 0 : availableTables}
                </h2>
              </div>

              <div className="bg-[#fb6100]/15 text-[#fb6100] p-4 rounded-xl">
                <MdOutlineTableRestaurant size={28} />
              </div>

            </div>

            <p className="text-[#777] text-xs mt-4">
              {loading ? 0 : bookedTables} tables currently occupied
            </p>
          </div>

          {/* TODAY'S ORDERS */}
          <div className="bg-[#1f1f1f] border border-[#303030] rounded-2xl p-5 shadow-md hover:border-[#fb6100] transition">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-[#8f8f8f] text-sm">
                  Today&apos;s Orders
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {loading ? 0 : todaysOrders.length}
                </h2>
              </div>

              <div className="bg-[#fb6100]/15 text-[#fb6100] p-4 rounded-xl">
                <FaReceipt size={26} />
              </div>

            </div>

            <p className="text-[#777] text-xs mt-4">
              {loading
                ? "Loading..."
                : `${todaysInProgressOrders} In Progress • ${todaysReadyOrders} Ready • ${todaysCompletedOrdersCount} Completed`}
            </p>

          </div>

        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 px-8 mt-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">

          {/* RECENT ORDERS */}
          <div className="bg-[#1c1c1c] border border-[#2f2f2f] rounded-2xl p-5 shadow-lg">
            <RecentOrders />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">

          {/* QUICK ACTIONS */}
          <div className="bg-[#1c1c1c] border border-[#2f2f2f] rounded-2xl p-5 shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">

              {/* NEW ORDER */}
              <button
                onClick={() => navigate("/menu", { state: { quickOrder: true } })}
                className="bg-[#fb6100] hover:bg-[#e55700] rounded-xl py-4 font-semibold transition shadow-md"
              >
                + New Order
              </button>

              {/* VIEW TABLES */}
              <button
                onClick={() => navigate("/tables")}
                className="bg-[#252525] hover:bg-[#303030] border border-[#343434] rounded-xl py-4 font-semibold transition"
              >
                View Tables
              </button>

              {/* KITCHEN */}
              <button
                className="bg-[#252525] hover:bg-[#303030] border border-[#343434] rounded-xl py-4 font-semibold transition"
              >
                Kitchen
              </button>

              {/* REPORTS */}
              <button
                className="bg-[#252525] hover:bg-[#303030] border border-[#343434] rounded-xl py-4 font-semibold transition"
              >
                Reports
              </button>

            </div>

          </div>

          {/* POPULAR DISHES */}
          
          <div className="bg-[#1c1c1c] border border-[#2f2f2f] rounded-2xl p-5 shadow-lg">
          <PopularDishes orders={orders} />
          </div>

        </div>

      </div>

      <BottomNav />

    </section>
  );
};

export default Home;