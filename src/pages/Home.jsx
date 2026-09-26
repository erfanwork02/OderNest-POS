import React from "react";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { FaReceipt } from "react-icons/fa";
import MiniCard from "../components/home/MiniCard";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

const Home = () => {
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

          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={512}
            footerNum={1.6}
          />

          <MiniCard
            title="In Progress"
            icon={<GrInProgress />}
            number={16}
            footerNum={3.6}
          />

          <div className="bg-[#1f1f1f] border border-[#303030] rounded-2xl p-5 shadow-md hover:border-[#fb6100] transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-[#8f8f8f] text-sm">
                  Open Tables
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  8
                </h2>
              </div>

              <div className="bg-[#fb6100]/15 text-[#fb6100] p-4 rounded-xl">
                <MdOutlineTableRestaurant size={28} />
              </div>

            </div>

            <p className="text-[#777] text-xs mt-4">
              4 tables currently occupied
            </p>
          </div>

          <div className="bg-[#1f1f1f] border border-[#303030] rounded-2xl p-5 shadow-md hover:border-[#fb6100] transition">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-[#8f8f8f] text-sm">
                  Today&apos;s Orders
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  42
                </h2>
              </div>

              <div className="bg-[#fb6100]/15 text-[#fb6100] p-4 rounded-xl">
                <FaReceipt size={26} />
              </div>

            </div>

            <p className="text-[#777] text-xs mt-4">
              7 new orders this hour
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

            <div className="flex items-center">

            </div>

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

              <button className="bg-[#fb6100] hover:bg-[#e55700] rounded-xl py-4 font-semibold transition shadow-md">
                + New Order
              </button>

              <button className="bg-[#252525] hover:bg-[#303030] border border-[#343434] rounded-xl py-4 font-semibold transition">
                View Tables
              </button>

              <button className="bg-[#252525] hover:bg-[#303030] border border-[#343434] rounded-xl py-4 font-semibold transition">
                Kitchen
              </button>

              <button className="bg-[#252525] hover:bg-[#303030] border border-[#343434] rounded-xl py-4 font-semibold transition">
                Reports
              </button>

            </div>

          </div>


          {/* POPULAR DISHES */}
          <div className="bg-[#1c1c1c] border border-[#2f2f2f] rounded-2xl p-5 shadow-lg">

            <PopularDishes />

          </div>

        </div>

      </div>

      <BottomNav />

    </section>
  );
};

export default Home;