import React, { useState } from "react";

import {
  FaDollarSign,
  FaReceipt,
  FaUsers,
  FaChartLine,
} from "react-icons/fa6";

import {
  MdCategory,
  MdRestaurantMenu,
  MdPendingActions,
  MdTableRestaurant,
} from "react-icons/md";

import { menus, tables } from "../../constants";


const Metrics = () => {
  const [timeRange, setTimeRange] = useState("Last 1 Month");


  // ============================================
  // REAL FRONTEND DATA
  // ============================================

  // Total menu categories
  const totalCategories = menus.length;

  // Total dishes from every category
  const totalDishes = menus.reduce(
    (total, category) => total + category.items.length,
    0
  );

  // Total restaurant tables
  const totalTables = tables.length;

  // Will be connected to Order API later
  const activeOrders = 0;


  // ============================================
  // OVERALL PERFORMANCE
  // These will be connected to backend later
  // ============================================

  const performanceData = [
    {
      id: 1,
      title: "Revenue",
      value: "$0.00",
      icon: <FaDollarSign />,
      accent: "bg-green-500/10",
      iconColor: "text-green-400",
    },
    {
      id: 2,
      title: "Total Orders",
      value: "0",
      icon: <FaReceipt />,
      accent: "bg-[#fb6100]/10",
      iconColor: "text-[#fb6100]",
    },
    {
      id: 3,
      title: "Total Customers",
      value: "0",
      icon: <FaUsers />,
      accent: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      id: 4,
      title: "Average Order Value",
      value: "$0.00",
      icon: <FaChartLine />,
      accent: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
  ];


  // ============================================
  // ITEM DETAILS
  // ============================================

  const itemData = [
    {
      id: 1,
      title: "Total Categories",
      value: totalCategories,
      icon: <MdCategory />,
      accent: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      id: 2,
      title: "Total Dishes",
      value: totalDishes,
      icon: <MdRestaurantMenu />,
      accent: "bg-green-500/10",
      iconColor: "text-green-400",
    },
    {
      id: 3,
      title: "Active Orders",
      value: activeOrders,
      icon: <MdPendingActions />,
      accent: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      id: 4,
      title: "Total Tables",
      value: totalTables,
      icon: <MdTableRestaurant />,
      accent: "bg-[#fb6100]/10",
      iconColor: "text-[#fb6100]",
    },
  ];


  // ============================================
  // METRIC CARD
  // ============================================

  const MetricCard = ({
    title,
    value,
    icon,
    accent,
    iconColor,
  }) => {
    return (
      <div
        className="
          bg-[#1f1f1f]
          border
          border-[#303030]
          rounded-2xl
          p-5
          hover:bg-[#252525]
          hover:border-[#fb6100]/40
          transition-all
          duration-200
        "
      >
        <div className="flex items-start justify-between">

          {/* LEFT SIDE */}
          <div>
            <p className="text-[#8f8f8f] text-sm font-medium">
              {title}
            </p>

            <h2 className="text-white text-2xl font-bold mt-2">
              {value}
            </h2>
          </div>


          {/* ICON */}
          <div
            className={`
              ${accent}
              ${iconColor}
              w-12
              h-12
              rounded-xl
              flex
              items-center
              justify-center
              text-xl
            `}
          >
            {icon}
          </div>

        </div>
      </div>
    );
  };


  return (
    <div className="w-full">

      {/* ============================================
          OVERALL PERFORMANCE
      ============================================ */}

      <div>

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-4
            mb-5
          "
        >

          {/* TITLE */}
          <div>
            <h2 className="text-white text-xl font-bold">
              Overall Performance
            </h2>

            <p className="text-[#777] text-sm mt-1">
              Monitor restaurant sales and order performance
            </p>
          </div>


          {/* TIME RANGE */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="
              bg-[#1f1f1f]
              border
              border-[#303030]
              text-[#f5f5f5]
              px-4
              py-2.5
              rounded-xl
              text-sm
              outline-none
              cursor-pointer
              hover:border-[#fb6100]/50
              transition
            "
          >
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 1 Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Last 1 Year</option>
          </select>

        </div>


        {/* PERFORMANCE CARDS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {performanceData.map((metric) => (
            <MetricCard
              key={metric.id}
              {...metric}
            />
          ))}
        </div>

      </div>


      {/* ============================================
          ITEM DETAILS
      ============================================ */}

      <div className="mt-10">

        <div className="mb-5">

          <h2 className="text-white text-xl font-bold">
            Item Details
          </h2>

          <p className="text-[#777] text-sm mt-1">
            Current menu, order and restaurant table information
          </p>

        </div>


        {/* ITEM DETAIL CARDS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >

          {itemData.map((item) => (
            <MetricCard
              key={item.id}
              {...item}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default Metrics;