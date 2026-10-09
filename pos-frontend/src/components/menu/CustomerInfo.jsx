import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo = () => {
  const customerData = useSelector((state) => state.customer);
  const [dateTime] = useState(() => new Date());

  const customerName =
    customerData.customerName || "Customer Name";

  return (
    <div className="px-5 py-4">
      <div
        className="
          flex
          items-center
          justify-between
          bg-[#252525]
          border
          border-[#343434]
          rounded-xl
          px-2
          py-1
        "
      >
        {/* CUSTOMER INFO */}
        <div>
          <h1 className="text-white text-base font-semibold">
            {customerName}
          </h1>

          <p className="text-[#ababab] text-sm mt-1">
            {customerData.tableNo || "Table 101"} / Dine In
          </p>

          <p className="text-[#777] text-xs mt-2">
            {formatDate(dateTime)}
          </p>
        </div>

        {/* AVATAR */}
        <div
          className="
            w-12
            h-12
            flex
            items-center
            justify-center
            bg-[#fb6100]
            text-white
            rounded-xl
            font-bold
            text-sm
          "
        >
          {getAvatarName(customerName)}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;