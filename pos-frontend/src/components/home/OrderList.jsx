import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";

function OrderList() {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        bg-[#252525]
        border
        border-[#343434]
        rounded-xl
        px-4
        py-3
        hover:border-[#fb6100]/60
        hover:bg-[#2a2a2a]
        transition-all
        duration-200
      "
    >
      {/* CUSTOMER INITIALS */}
      <div
        className="
          bg-[#fb6100]
          text-white
          w-12
          h-12
          rounded-xl
          flex
          items-center
          justify-center
          text-lg
          font-bold
          shrink-0
        "
      >
        MH
      </div>

      {/* ORDER DETAILS */}
      <div className="flex items-center justify-between w-full">

        {/* CUSTOMER INFO */}
        <div className="flex flex-col items-start gap-1 min-w-[160px]">
          <h1 className="text-white text-base font-semibold tracking-wide">
            Mahedi Hasan
          </h1>

          <p className="text-[#8f8f8f] text-sm">
            8 items
          </p>
        </div>

        {/* TABLE */}
        <div>
          <span
            className="
              bg-[#fb6100]/10
              text-[#fb6100]
              border
              border-[#fb6100]/40
              rounded-lg
              px-3
              py-2
              text-sm
              font-semibold
            "
          >
            Table 3
          </span>
        </div>

        {/* STATUS */}
        <div className="flex flex-col items-end gap-2 min-w-[130px]">

          <span
            className="
              flex
              items-center
              gap-2
              bg-green-500/10
              text-green-400
              px-3
              py-1.5
              rounded-lg
              text-sm
              font-medium
            "
          >
            <FaCheckDouble />
            Ready
          </span>

          <span className="flex items-center gap-2 text-[#8f8f8f] text-xs">
            <FaCircle className="text-green-500 text-[8px]" />
            Ready to serve
          </span>

        </div>
      </div>
    </div>
  );
}

export default OrderList;