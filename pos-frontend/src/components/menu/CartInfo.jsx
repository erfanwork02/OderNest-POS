import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical, FaMinus, FaPlus } from "react-icons/fa6";
import { removeItem } from "../../redux/slices/cartSlice";



const CartInfo = () => {
const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Reference to the cart items container
const scrollRef = useRef(null);

// Automatically scroll to the latest cart item
useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [cartItems]);



  // Remove an item from the cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

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
<div
  ref={scrollRef}
  className="flex flex-col gap-3 max-h-[380px] overflow-y-auto scrollbar-hide"
>
  

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
                  onClick={() => handleRemove(item.id)}
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

