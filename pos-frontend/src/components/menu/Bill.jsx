import React, { useState } from "react";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa";

const Bill = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <div className="p-5">

      

      {/* BILL */}
      <div className="space-y-3">

        <div className="flex items-center justify-between">
          <p className="text-[#ababab] text-sm">
            Items (4)
          </p>

          <p className="text-white text-sm font-semibold">
            $240.00
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[#ababab] text-sm">
            Tax (5.25%)
          </p>

          <p className="text-white text-sm font-semibold">
            $24.00
          </p>
        </div>

        {/* TOTAL */}
        <div className="border-t border-[#343434] pt-4 mt-4">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-[#777] text-xs">
                Total Amount
              </p>

              <p className="text-white text-2xl font-bold mt-1">
                $264.00
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* PAYMENT */}
      <div className="mt-5">

        

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => setPaymentMethod("cash")}
            className={`
              flex
              items-center
              justify-center
              gap-2
              py-3
              rounded-xl
              border
              font-semibold
              transition-all
              ${
                paymentMethod === "cash"
                  ? "bg-[#fb6100]/10 border-[#fb6100] text-[#fb6100]"
                  : "bg-[#252525] border-[#343434] text-[#ababab]"
              }
            `}
          >
            <FaMoneyBillWave />
            Cash
          </button>

          <button
            onClick={() => setPaymentMethod("card")}
            className={`
              flex
              items-center
              justify-center
              gap-2
              py-3
              rounded-xl
              border
              font-semibold
              transition-all
              ${
                paymentMethod === "card"
                  ? "bg-[#fb6100]/10 border-[#fb6100] text-[#fb6100]"
                  : "bg-[#252525] border-[#343434] text-[#ababab]"
              }
            `}
          >
            <FaCreditCard />
            Card
          </button>

        </div>

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-3 mt-5">

        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-[#252525]
            border
            border-[#343434]
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-[#303030]
            transition
          "
        >
          <FaPrint />
          Print Receipt
        </button>

        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-[#fb6100]
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-[#e55700]
            transition
          "
        >
          <FaCheckCircle />
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Bill;