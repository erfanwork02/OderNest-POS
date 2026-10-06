import React from "react";
import { useSelector } from "react-redux";

import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/shared/BackButton";

import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

import {
  MdRestaurantMenu,
  MdTableRestaurant,
} from "react-icons/md";

import {
  FaUser,
  FaShoppingBag,
  FaCircle,
} from "react-icons/fa";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#161616] min-h-[calc(100vh-5rem)] text-white pb-24">

      {/* PAGE HEADER */}
      <div
        className="
          bg-[#1c1c1c]
          border-b
          border-[#2f2f2f]
          px-8
          py-5
        "
      >
        <div className="flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">

            <BackButton />

            <div>
              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#fb6100]/10
                    text-[#fb6100]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <MdRestaurantMenu size={24} />
                </div>

                <h1 className="text-3xl font-bold tracking-tight">
                  Menu
                </h1>

              </div>

              <p className="text-[#777] text-sm mt-2 ml-[52px]">
                
              </p>
            </div>

          </div>


          {/* CUSTOMER SUMMARY */}
          <div
            className="
              flex
              items-center
              gap-5
              bg-[#252525]
              border
              border-[#343434]
              rounded-2xl
              px-5
              py-3
            "
          >

            {/* CUSTOMER */}
            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#fb6100]
                  flex
                  items-center
                  justify-center
                  text-white
                "
              >
                <FaUser size={17} />
              </div>

              <div>
                <p className="text-[#777] text-xs">
                  Customer
                </p>

                <h2 className="text-white text-sm font-semibold mt-1">
                  {customerData.customerName || "Guest Customer"}
                </h2>
              </div>

            </div>


            {/* DIVIDER */}
            <div className="w-[1px] h-10 bg-[#3a3a3a]" />


            {/* TABLE */}
            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#343434]
                  flex
                  items-center
                  justify-center
                  text-[#fb6100]
                "
              >
                <MdTableRestaurant size={21} />
              </div>

              <div>
                <p className="text-[#777] text-xs">
                  Table
                </p>

                <p className="text-white text-sm font-semibold mt-1">
                  {customerData.tableNo || "Not selected"}
                </p>
              </div>

            </div>


            {/* ACTIVE STATUS */}
            <div
              className="
                flex
                items-center
                gap-2
                bg-green-500/10
                text-green-400
                px-3
                py-2
                rounded-lg
                text-xs
                font-semibold
              "
            >
              <FaCircle className="text-[7px]" />

              Active Order
            </div>

          </div>
        </div>
      </div>


      {/* MAIN CONTENT */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[minmax(0,3fr)_minmax(340px,1fr)]
          gap-5
          px-6
          py-5
        "
      >

        {/* LEFT MENU AREA */}
        <div
          className="
            bg-[#1c1c1c]
            border
            border-[#2f2f2f]
            rounded-2xl
            overflow-hidden
            shadow-lg
            min-w-0
          "
        >

          {/* MENU SECTION HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
              border-[#2f2f2f]
            "
          >
            <div>

              <h2 className="text-xl font-bold">
                Restaurant Menu
              </h2>

              <p className="text-[#777] text-sm mt-1">
                
              </p>

            </div>


            <div
              className="
                flex
                items-center
                gap-2
                text-[#ababab]
                bg-[#252525]
                border
                border-[#343434]
                px-4
                py-2
                rounded-xl
                text-sm
              "
            >
              <FaShoppingBag className="text-[#fb6100]" />

              Select Items
            </div>

          </div>


          {/* YOUR EXISTING MENU COMPONENT */}
          <div
            className="
              h-[calc(100vh-16rem)]
              overflow-y-auto
              scrollbar-hide
            "
          >
            <MenuContainer />
          </div>

        </div>


        {/* RIGHT ORDER PANEL */}
        <aside
          className="
            bg-[#1c1c1c]
            border
            border-[#2f2f2f]
            rounded-2xl
            shadow-xl
            overflow-hidden
            h-[calc(100vh-10rem)]
            flex
            flex-col
          "
        >

          {/* PANEL HEADER */}
          <div
            className="
              px-5
              py-5
              border-b
              border-[#2f2f2f]
              bg-[#202020]
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Current Order
                </h2>

                <p className="text-[#777] text-sm mt-1">
                  
                </p>
              </div>

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#fb6100]/10
                  text-[#fb6100]
                  flex
                  items-center
                  justify-center
                "
              >
                <FaShoppingBag size={18} />
              </div>

            </div>
          </div>


          {/* CUSTOMER INFORMATION */}
          <div className="border-b border-[#2f2f2f]">
            <CustomerInfo />
          </div>


          {/* CART */}
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              scrollbar-hide
              border-b
              border-[#2f2f2f]
            "
          >
            <CartInfo />
          </div>


          {/* BILL */}
          <div className="bg-[#202020]">
            <Bill />
          </div>

        </aside>

      </div>


      {/* BOTTOM NAVIGATION */}
      <BottomNav />

    </section>
  );
};

export default Menu;