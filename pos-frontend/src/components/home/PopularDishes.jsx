import React from "react";

const PopularDishes = ({ orders = [] }) => {
  const dishCounts = {};

  // Count every dish from every saved order
  orders.forEach((order) => {
    const items = order.items || [];

    if (!Array.isArray(items)) return;

    items.forEach((item) => {
      const dishName = item.name;
      const quantity = Number(item.quantity || 0);

      if (!dishName || quantity <= 0) return;

      if (dishCounts[dishName]) {
        dishCounts[dishName] += quantity;
      } else {
        dishCounts[dishName] = quantity;
      }
    });
  });

  // Rank dishes from most ordered to least ordered
  const rankedDishes = Object.entries(dishCounts)
    .map(([name, numberOfOrders]) => ({
      name,
      numberOfOrders,
    }))
    .sort((a, b) => b.numberOfOrders - a.numberOfOrders);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-white text-xl font-bold">
            Popular Dishes
          </h1>

          <p className="text-[#777] text-xs mt-1">
            Ranked by all-time orders
          </p>
        </div>

        <button className="text-[#fb6100] text-sm font-semibold hover:text-[#ff7b2c] transition">
          View All
        </button>
      </div>

      {/* DISH LIST */}
      <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto scrollbar-hide pr-1">

        {rankedDishes.length === 0 ? (
          <div className="bg-[#252525] border border-[#343434] rounded-xl p-6 text-center">
            <p className="text-[#777] text-sm">
              No order data available yet.
            </p>
          </div>
        ) : (
          rankedDishes.map((dish, index) => (
            <div
              key={dish.name}
              className={`
                flex
                items-center
                justify-between
                rounded-xl
                px-4
                py-3
                border
                transition-all
                duration-200
                ${
                  index === 0
                    ? "bg-[#fb6100]/10 border-[#fb6100]"
                    : "bg-[#252525] border-[#343434] hover:border-[#fb6100] hover:bg-[#2a2a2a]"
                }
              `}
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">

                {/* RANK NUMBER */}
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
                  {index + 1 < 10
                    ? `0${index + 1}`
                    : index + 1}
                </div>

                {/* DISH NAME */}
                <h2 className="text-white font-semibold">
                  {dish.name}
                </h2>

              </div>

              {/* ORDER COUNT */}
              <div className="text-right">
                <p className="text-[#fb6100] text-lg font-bold">
                  {dish.numberOfOrders}
                </p>

                <p className="text-[#777] text-xs">
                  ordered
                </p>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default PopularDishes;