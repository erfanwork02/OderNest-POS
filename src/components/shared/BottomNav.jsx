
import React, { use } from "react";

import { FaHome } from "react-icons/fa";

import {
  MdOutlineReorder,
  MdTableBar,
} from "react-icons/md";

import { CiCircleMore } from "react-icons/ci";

import { BiSolidDish } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {

  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">

      {/* Home Button */}
      <button onClick={() => navigate("/")}  className="flex items-center justify-center text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px]">
        <FaHome className="inline mr-2" size={20} />
        <p>Home</p>
      </button>

      {/* Orders Button */}
      <button onClick={() => navigate("/orders")} className="flex items-center justify-center text-[#ababab] w-[200px]">
        <MdOutlineReorder className="inline mr-2" size={20} />
        <p>Orders</p>
      </button>

      {/* Tables Button */}
      <button onClick={() => navigate("/tables")} className="flex items-center justify-center text-[#ababab] w-[200px]">
        <MdTableBar className="inline mr-2" size={20} />
        <p>Tables</p>
      </button>

      {/* More Button */}
      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <CiCircleMore className="inline mr-2" size={20} />
        <p>More</p>
      </button>

    {/* Dish Button */}
<button
  className="
    absolute
    left-1/2
    -translate-x-1/2
    bottom-6
    bg-[#F6B100]
    text-white
    rounded-full
    p-4
    flex
    items-center
    justify-center
    shadow-lg
    z-10
  "
>
  <BiSolidDish size={30} />
</button>

    </div>
  );
};

export default BottomNav;