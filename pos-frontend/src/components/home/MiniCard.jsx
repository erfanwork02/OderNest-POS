import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  const isEarnings = title === "Total Earnings";
  const isPositive = Number(footerNum) >= 0;

  return (
    <div
      className="
        relative
        overflow-hidden
        bg-[#1c1c1c]
        border
        border-[#303030]
        rounded-2xl
        p-5
        w-full
        shadow-lg
        hover:border-[#fb6100]/70
        hover:bg-[#202020]
        hover:-translate-y-1
        transition-all
        duration-300
        group
      "
    >
      {/* SUBTLE TOP ACCENT */}
      <div
        className={`
          absolute
          top-0
          left-0
          w-full
          h-[3px]
          ${
            isEarnings
              ? "bg-green-500"
              : "bg-[#fb6100]"
          }
        `}
      />

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>
          <p className="text-[#8f8f8f] text-sm font-medium">
            {title}
          </p>

          <h1 className="text-[#f5f5f5] text-3xl font-bold mt-2 tracking-tight">
            {title === "Total Earnings" ? `$${number}` : number}
          </h1>
        </div>

        {/* ICON */}
        <div
          className={`
            w-12
            h-12
            flex
            items-center
            justify-center
            rounded-xl
            text-xl
            transition-all
            duration-300
            group-hover:scale-110
            ${
              isEarnings
                ? "bg-green-500/10 text-green-400"
                : "bg-[#fb6100]/10 text-[#fb6100]"
            }
          `}
        >
          {icon}
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-[1px] bg-[#303030] my-4" />

      {/* BOTTOM */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span
            className={`
              px-2.5
              py-1
              rounded-full
              text-xs
              font-semibold
              ${
                isPositive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }
            `}
          >
            {isPositive ? "↑" : "↓"} {Math.abs(footerNum)}%
          </span>

          <span className="text-[#777] text-xs">
            vs yesterday
          </span>

        </div>

        {/* STATUS */}
        <div className="flex items-center gap-2">

          <span
            className={`
              w-2
              h-2
              rounded-full
              ${
                isEarnings
                  ? "bg-green-500"
                  : "bg-[#fb6100]"
              }
            `}
          />

          <span className="text-[#666] text-xs">
            Today
          </span>

        </div>

      </div>
    </div>
  );
};

export default MiniCard;