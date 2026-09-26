import React from "react";
import { popularDishes } from "../../constants";

const PopularDishes = () => {
  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-white text-xl font-bold">
            Popular Dishes
          </h1>

          <p className="text-[#777] text-sm mt-1">
            Best selling items today
          </p>
        </div>

        <button className="text-[#fb6100] text-sm font-semibold hover:text-[#ff7b2c] transition">
          View All
        </button>
      </div>

      {/* DISH LIST */}
      <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto scrollbar-hide pr-1">

        {popularDishes.map((dish, index) => (
          <div
            key={dish.id}
            className="
              flex
              items-center
              justify-between
              bg-[#252525]
              border
              border-[#343434]
              rounded-xl
              px-4
              py-3
              hover:border-[#fb6100]
              hover:bg-[#2a2a2a]
              transition-all
              duration-200
              cursor-pointer
            "
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-4">

              {/* RANK */}
              <div
                className={`
                  w-8
                  h-8
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                  ${
                    index === 0
                      ? "bg-[#fb6100] text-white"
                      : "bg-[#333333] text-[#aaa]"
                  }
                `}
              >
                {dish.id < 10 ? `0${dish.id}` : dish.id}
              </div>

              {/* IMAGE */}
              <img
                src={dish.image}
                alt={dish.name}
                className="
                  w-[55px]
                  h-[55px]
                  rounded-xl
                  object-cover
                  border
                  border-[#3a3a3a]
                "
              />

              {/* DISH DETAILS */}
              <div>
                <h2 className="text-white font-semibold">
                  {dish.name}
                </h2>

                <p className="text-[#777] text-sm mt-1">
                  Customer favorite
                </p>
              </div>

            </div>

            {/* ORDER COUNT */}
            <div className="text-right">

              <p className="text-[#fb6100] text-lg font-bold">
                {dish.numberOfOrders}
              </p>

              <p className="text-[#777] text-xs">
                orders
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default PopularDishes;