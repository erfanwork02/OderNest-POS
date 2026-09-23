
import React from "react";

import { FaHome } from "react-icons/fa";

import {
  MdOutlineReorder,
  MdTableBar,
} from "react-icons/md";

import { CiCircleMore } from "react-icons/ci";

import { BiSolidDish } from "react-icons/bi";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">

      {/* Home Button */}
      <button className="flex items-center justify-center text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px]">
        <FaHome className="inline mr-2" size={20} />
        <p>Home</p>
      </button>

      {/* Orders Button */}
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <MdOutlineReorder className="inline mr-2" size={20} />
        <p>Orders</p>
      </button>

      {/* Tables Button */}
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <MdTableBar className="inline mr-2" size={20} />
        <p>Tables</p>
      </button>

      {/* More Button */}
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <CiCircleMore className="inline mr-2" size={20} />
        <p>More</p>
      </button>

      {/* Dish Button */}
      <button className="absolute bottom-3 right-3 bg-[#F6B100] text-[#f5f5f5] rounded-full p-3 flex items-center justify-center">
        <BiSolidDish size={30} />
      </button>

    </div>
  );
};

export default BottomNav;