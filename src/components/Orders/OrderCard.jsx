import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";

const OrderCard = () => {
  return (
    <div
      className="
        w-[400px]
        bg-[#252525]
        border
        border-[#343434]
        p-4
        rounded-xl
        hover:border-[#fb6100]/60
        hover:bg-[#292929]
        transition-all
        duration-200
      "
    >
      {/* TOP SECTION */}
      <div className="flex items-center gap-5">

        {/* CUSTOMER INITIAL */}
        <div
          className="
            bg-[#fb6100]
            w-14
            h-14
            flex
            items-center
            justify-center
            text-white
            text-xl
            font-bold
            rounded-xl
            shrink-0
          "
        >
          AM
        </div>

        <div className="flex items-center justify-between w-full">

          {/* CUSTOMER INFO */}
          <div className="flex flex-col items-start gap-1">

            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
              Shariar Hossain
            </h1>

            <p className="text-[#ababab] text-sm">
              #101 / Dine in
            </p>

          </div>

          {/* STATUS */}
          <div className="flex flex-col items-end gap-2">

            <div
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
            </div>

            <p className="flex items-center gap-2 text-[#ababab] text-sm">
              <FaCircle className="text-green-500 text-[9px]" />
              Ready to serve
            </p>

          </div>

        </div>
      </div>

      {/* DATE AND ITEMS */}
      <div className="flex items-center justify-between mt-5">

        <p className="text-[#ababab] text-sm">
          September 24, 2026 06:09 PM
        </p>

        <p className="text-[#ababab] text-sm">
          8 Items
        </p>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-[#4a4a4a] my-4" />

      {/* TOTAL */}
      <div className="flex items-center justify-between">

        <p className="text-[#f5f5f5] font-semibold">
          Total
        </p>

        <p className="text-[#f5f5f5] text-lg font-bold">
          $150.00
        </p>

      </div>
    </div>
  );
};

export default OrderCard;