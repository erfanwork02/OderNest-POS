import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical, FaMinus, FaPlus } from "react-icons/fa6";

const CartInfo = () => {
  const cartItems = [
    {
      id: 1,
      name: "Chicken Tikka",
      quantity: 2,
      price: 24.99,
    },
    {
      id: 2,
      name: "Butter Chicken",
      quantity: 1,
      price: 18.99,
    },
    {
      id: 3,
      name: "Garlic Naan",
      quantity: 3,
      price: 11.97,
    },
  ];

  return (
    <div className="px-5 py-4">

      {/* TITLE */}
      <div className="mb-4">
        <h2 className="text-white text-lg font-bold">
          
        </h2>

        <p className="text-[#777] text-xs mt-1">
        
        </p>
      </div>

      {/* CART ITEMS */}
      <div className="flex flex-col gap-3">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="
              bg-[#252525]
              border
              border-[#343434]
              rounded-xl
              px-4
              py-3
              hover:border-[#fb6100]/60
              transition-all
              duration-200
            "
          >

            {/* TOP */}
            <div className="flex items-center justify-between gap-4">

              <div>
                <h3 className="text-white font-semibold text-sm">
                  {item.name}
                </h3>

                <p className="text-[#777] text-xs mt-1">
                  Regular
                </p>
              </div>

              <p className="text-white font-bold text-sm">
                ${item.price.toFixed(2)}
              </p>

            </div>

            {/* BOTTOM */}
            <div className="flex items-center justify-between mt-3">

              {/* ITEM ACTIONS */}
              <div className="flex items-center gap-2">

                <button
                  title="Remove item"
                  className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-500/10
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                    transition
                  "
                >
                  <RiDeleteBin2Fill size={15} />
                </button>

                <button
                  title="Add note"
                  className="
                    flex
                    items-center
                    gap-2
                    h-8
                    px-3
                    rounded-lg
                    bg-[#343434]
                    text-[#ababab]
                    hover:text-white
                    transition
                  "
                >
                  <FaNotesMedical size={13} />

                  <span className="text-xs">
                    Note
                  </span>
                </button>

              </div>

              {/* QUANTITY */}
              <div
                className="
                  flex
                  items-center
                  bg-[#1c1c1c]
                  border
                  border-[#343434]
                  rounded-lg
                  p-1
                "
              >

                <button
                  className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    text-[#ababab]
                    hover:text-white
                    hover:bg-[#343434]
                    rounded-md
                    transition
                  "
                >
                  <FaMinus size={9} />
                </button>

                <span className="w-8 text-center text-white text-sm font-semibold">
                  {item.quantity}
                </span>

                <button
                  className="
                    w-8
                    h-8
                    flex
                    items-center
                    justify-center
                    bg-[#fb6100]
                    text-white
                    hover:bg-[#e55700]
                    rounded-md
                    transition
                  "
                >
                  <FaPlus size={9} />
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CartInfo;