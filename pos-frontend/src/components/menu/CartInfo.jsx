import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  FaNotesMedical,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";

import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  updateItemNote,
} from "../../redux/slices/cartSlice";

const CartInfo = () => {
  const cartItems = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  const [openNoteId, setOpenNoteId] =
    useState(null);

  // Scroll to newest item
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartItems.length]);

  // Remove item
  const handleRemove = (id) => {
    dispatch(removeItem(id));

    if (openNoteId === id) {
      setOpenNoteId(null);
    }
  };

  // Increase quantity
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  // Open or close note box
  const handleNoteClick = (id) => {
    setOpenNoteId((currentId) =>
      currentId === id ? null : id
    );
  };

  // Update note
  const handleNoteChange = (id, note) => {
    dispatch(
      updateItemNote({
        id,
        note,
      })
    );
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
        className="
          flex
          flex-col
          gap-3
          max-h-[380px]
          overflow-y-auto
          scrollbar-hide
        "
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
                ${Number(item.price).toFixed(2)}
              </p>

            </div>

            {/* BOTTOM */}
            <div className="flex items-center justify-between mt-3">

              {/* ITEM ACTIONS */}
              <div className="flex items-center gap-2">

                {/* DELETE */}
                <button
                  title="Remove item"
                  onClick={() =>
                    handleRemove(item.id)
                  }
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

                {/* NOTE */}
                <button
                  title="Add note"
                  onClick={() =>
                    handleNoteClick(item.id)
                  }
                  className={`
                    flex
                    items-center
                    gap-2
                    h-8
                    px-3
                    rounded-lg
                    transition
                    ${
                      openNoteId === item.id ||
                      item.note
                        ? "bg-[#fb6100]/10 text-[#fb6100]"
                        : "bg-[#343434] text-[#ababab] hover:text-white"
                    }
                  `}
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

                {/* MINUS */}
                <button
                  onClick={() =>
                    handleDecrease(item.id)
                  }
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

                {/* QUANTITY NUMBER */}
                <span className="w-8 text-center text-white text-sm font-semibold">
                  {item.quantity}
                </span>

                {/* PLUS */}
                <button
                  onClick={() =>
                    handleIncrease(item.id)
                  }
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

            {/* NOTE INPUT */}
            {openNoteId === item.id && (
              <div className="mt-3">

                <textarea
                  value={item.note || ""}
                  onChange={(e) =>
                    handleNoteChange(
                      item.id,
                      e.target.value
                    )
                  }
                  placeholder="Add special instructions..."
                  rows={2}
                  className="
                    w-full
                    bg-[#1c1c1c]
                    border
                    border-[#343434]
                    rounded-lg
                    px-3
                    py-2
                    text-white
                    text-sm
                    placeholder-[#666]
                    resize-none
                    outline-none
                    focus:border-[#fb6100]
                    transition
                  "
                />

              </div>
            )}

            {/* SAVED NOTE */}
            {item.note &&
              openNoteId !== item.id && (
                <div
                  className="
                    mt-3
                    bg-[#1c1c1c]
                    border
                    border-[#343434]
                    rounded-lg
                    px-3
                    py-2
                  "
                >
                  <p className="text-[#777] text-[10px] uppercase tracking-wide">
                    Note
                  </p>

                  <p className="text-[#ababab] text-xs mt-1">
                    {item.note}
                  </p>
                </div>
              )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default CartInfo;