import React from 'react'
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import OrderList from "./OrderList";
const RecentOrders = () => {
  return (
    <div className="px-8 mt-6">
      <div className="bg-[#fdf5e6] w-full h-[450px] rounded-lg">
        <div className="flex justify-between items-center px-6 py-4"> 
            <h1 className='text-[f5f5f5] text-lg font-semibold tracking-wide'>
                Recent Orders</h1>
            <a herf="" className="text-[#025cca] text-sm font-semibold">View all</a>
        </div>

        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-1 mx-5">
        <FaSearch className="text-[#f5f5f5]" />

        <input
          type="text"
          placeholder="Search recent Orders"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
        />
        </div>

        {/* Order list */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar">
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
        <OrderList />
        </div>

      </div>
    </div>
  )
}

export default RecentOrders
