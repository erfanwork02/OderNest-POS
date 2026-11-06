import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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


  // ==============================
  // ADMIN BUTTON ACTIONS
  // ==============================
  const handleAction = (action) => {

    // OPEN ADD TABLE MODAL
    if (action === "table") {
      setIsTableModalOpen(true);
      return;
    }

    // OPEN DELETE TABLE MODAL
    if (action === "deleteTable") {
      setIsDeleteTableModalOpen(true);
      return;
    }

    // GO TO MENU FOR CATEGORY
    if (action === "category") {
      navigate("/menu");
      return;
    }

    // GO TO MENU FOR DISHES
    if (action === "dishes") {
      navigate("/menu");
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

      {/* =====================================
          ADMIN DASHBOARD HEADER
      ====================================== */}
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

        {/* PAGE TITLE */}
        <div>

          <h1 className="text-2xl font-bold text-white">
            Admin Dashboard
          </h1>

          <p className="text-[#8f8f8f] text-sm mt-1">
            Manage your restaurant and monitor performance
          </p>

        </div>


        {/* ADMIN STATUS */}
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


      {/* =====================================
          ACTION BUTTONS + TABS
      ====================================== */}
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

        {/* ADMIN ACTION BUTTONS */}
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


      {/* =====================================
          TAB CONTENT
      ====================================== */}
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
                  Payment information will appear here.
                </p>

              </div>

            </div>


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
                  $0.00
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
                  $0.00
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
                  $0.00
                </h3>

              </div>

            </div>

          </div>

        )}

      </div>


      {/* =====================================
          ADD TABLE MODAL
      ====================================== */}
      {isTableModalOpen && (
        <Modal
          setIsTableModalOpen={
            setIsTableModalOpen
          }
        />
      )}


      {/* =====================================
          DELETE TABLE MODAL
      ====================================== */}
      {isDeleteTableModalOpen && (
        <DeleteTableModal
          setIsDeleteTableModalOpen={
            setIsDeleteTableModalOpen
          }
        />
      )}

    </section>
  );
};

export default Dashboard;