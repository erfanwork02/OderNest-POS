import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import AddCategoryModal from "../components/dashboard/AddCategoryModal";
import AddDishModal from "../components/dashboard/AddDishModal";

import {
  MdTableBar,
  MdCategory,
  MdPayments,
  MdDelete,
} from "react-icons/md";

import { BiSolidDish } from "react-icons/bi";

import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import DeleteTableModal from "../components/dashboard/DeleteTableModal";

import { getAdminDashboardStats } from "../https/index";


// ==============================
// ADMIN ACTION BUTTONS
// ==============================
const buttons = [
  {
    label: "Add Table",
    icon: <MdTableBar />,
    action: "table",
  },
  {
    label: "Delete Table",
    icon: <MdDelete />,
    action: "deleteTable",
  },
  {
    label: "Add Category",
    icon: <MdCategory />,
    action: "category",
  },
  {
    label: "Add Dishes",
    icon: <BiSolidDish />,
    action: "dishes",
  },
];


// ==============================
// DASHBOARD TABS
// ==============================
const tabs = ["Metrics", "Orders", "Payment"];


const Dashboard = () => {
  const [activeTab, setActiveTab] =
    useState("Metrics");

  const [
    isTableModalOpen,
    setIsTableModalOpen,
  ] = useState(false);

  const [
    isDeleteTableModalOpen,
    setIsDeleteTableModalOpen,
  ] = useState(false);

  const [
    isAddCategoryModalOpen,
    setIsAddCategoryModalOpen,
  ] = useState(false);

  const [
    isAddDishModalOpen,
    setIsAddDishModalOpen,
  ] = useState(false);


  // ==============================
  // GET REAL DASHBOARD DATA
  // ==============================
  const {
    data: dashboardResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardStats,
    refetchOnWindowFocus: true,
  });

  const stats =
    dashboardResponse?.data?.data || {};

  const payments =
    stats?.payments || {};

  const cashPayments =
    Number(payments.cash) || 0;

  const cardPayments =
    Number(payments.card) || 0;

  const totalRevenue =
    Number(payments.total) ||
    Number(stats.revenue) ||
    0;


  // ==============================
  // ADMIN BUTTON ACTIONS
  // ==============================
  const handleAction = (action) => {
    if (action === "table") {
      setIsTableModalOpen(true);
      return;
    }

    if (action === "deleteTable") {
      setIsDeleteTableModalOpen(true);
      return;
    }

    if (action === "category") {
      setIsAddCategoryModalOpen(true);
      return;
    }

    if (action === "dishes") {
      setIsAddDishModalOpen(true);
      return;
    }
  };


  return (
    <section
      className="
        min-h-[calc(100vh-5rem)]
        bg-[#161616]
        text-white
        px-8
        py-7
        pb-28
      "
    >

      {/* ADMIN DASHBOARD HEADER */}
      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
          mb-8
        "
      >

        <div>
          <h1 className="text-2xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-[#8f8f8f] text-sm mt-1">
            Manage your restaurant and monitor performance
          </p>
        </div>


        <div
          className="
            flex
            items-center
            gap-2
            bg-green-500/10
            border
            border-green-500/20
            px-4
            py-2
            rounded-xl
          "
        >
          <span
            className="
              w-2
              h-2
              bg-green-400
              rounded-full
            "
          />

          <span
            className="
              text-green-400
              text-sm
              font-medium
            "
          >
            Admin Panel
          </span>
        </div>

      </div>


      {/* ACTION BUTTONS + TABS */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >

        <div className="flex items-center gap-3 flex-wrap">

          {buttons.map(
            ({ label, icon, action }) => (

              <button
                key={action}
                onClick={() =>
                  handleAction(action)
                }
                className="
                  bg-[#1f1f1f]
                  hover:bg-[#262626]
                  border
                  border-[#303030]
                  hover:border-[#fb6100]/60
                  px-5
                  py-3
                  rounded-xl
                  text-[#f5f5f5]
                  font-semibold
                  text-sm
                  flex
                  items-center
                  gap-2
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >
                <span
                  className="
                    text-[#fb6100]
                    text-lg
                  "
                >
                  {icon}
                </span>

                {label}
              </button>

            )
          )}

        </div>


        {/* DASHBOARD TABS */}
        <div
          className="
            flex
            items-center
            gap-2
            bg-[#1f1f1f]
            border
            border-[#303030]
            rounded-xl
            p-1.5
            w-fit
          "
        >

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`
                px-6
                py-2.5
                rounded-lg
                text-sm
                font-semibold
                transition-all
                duration-200
                cursor-pointer
                ${
                  activeTab === tab
                    ? "bg-[#fb6100] text-white"
                    : "text-[#ababab] hover:text-white hover:bg-[#292929]"
                }
              `}
            >
              {tab}
            </button>

          ))}

        </div>

      </div>


      {/* TAB CONTENT */}
      <div className="w-full">

        {/* METRICS */}
        {activeTab === "Metrics" && (
          <Metrics />
        )}


        {/* ORDERS */}
        {activeTab === "Orders" && (
          <RecentOrders />
        )}


        {/* PAYMENT */}
        {activeTab === "Payment" && (

          <div
            className="
              bg-[#1f1f1f]
              border
              border-[#303030]
              rounded-2xl
              p-6
            "
          >

            {/* PAYMENT HEADER */}
            <div className="flex items-center gap-4">

              <div
                className="
                  w-12
                  h-12
                  bg-[#fb6100]/10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <MdPayments
                  className="
                    text-[#fb6100]
                    text-2xl
                  "
                />
              </div>


              <div>
                <h2
                  className="
                    text-white
                    text-lg
                    font-bold
                  "
                >
                  Payment Overview
                </h2>

                <p
                  className="
                    text-[#8f8f8f]
                    text-sm
                    mt-1
                  "
                >
                  Live payment information from completed orders.
                </p>
              </div>

            </div>


            {/* ERROR */}
            {isError && (
              <div
                className="
                  mt-5
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  px-4
                  py-3
                  rounded-xl
                "
              >
                Unable to load payment information.
              </div>
            )}


            {/* PAYMENT CARDS */}
            <div
              className="
                mt-6
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
              "
            >

              {/* CASH PAYMENTS */}
              <div
                className="
                  bg-[#252525]
                  border
                  border-[#343434]
                  rounded-xl
                  p-5
                "
              >
                <p className="text-[#8f8f8f] text-sm">
                  Cash Payments
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {isLoading
                    ? "..."
                    : `$${cashPayments.toFixed(2)}`}
                </h3>
              </div>


              {/* CARD PAYMENTS */}
              <div
                className="
                  bg-[#252525]
                  border
                  border-[#343434]
                  rounded-xl
                  p-5
                "
              >
                <p className="text-[#8f8f8f] text-sm">
                  Card Payments
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {isLoading
                    ? "..."
                    : `$${cardPayments.toFixed(2)}`}
                </h3>
              </div>


              {/* TOTAL REVENUE */}
              <div
                className="
                  bg-[#252525]
                  border
                  border-[#343434]
                  rounded-xl
                  p-5
                "
              >
                <p className="text-[#8f8f8f] text-sm">
                  Total Revenue
                </p>

                <h3
                  className="
                    text-green-400
                    text-2xl
                    font-bold
                    mt-2
                  "
                >
                  {isLoading
                    ? "..."
                    : `$${totalRevenue.toFixed(2)}`}
                </h3>
              </div>

            </div>

          </div>

        )}

      </div>


      {/* ADD TABLE MODAL */}
      {isTableModalOpen && (
        <Modal
          setIsTableModalOpen={
            setIsTableModalOpen
          }
        />
      )}


      {/* DELETE TABLE MODAL */}
      {isDeleteTableModalOpen && (
        <DeleteTableModal
          setIsDeleteTableModalOpen={
            setIsDeleteTableModalOpen
          }
        />
      )}


      {/* ADD CATEGORY MODAL */}
      {isAddCategoryModalOpen && (
        <AddCategoryModal
          setIsAddCategoryModalOpen={
            setIsAddCategoryModalOpen
          }
        />
      )}


      {/* ADD DISH MODAL */}
      {isAddDishModalOpen && (
        <AddDishModal
          setIsAddDishModalOpen={
            setIsAddDishModalOpen
          }
        />
      )}

    </section>
  );
};

export default Dashboard;