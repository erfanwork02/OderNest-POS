import React, { useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { menus } from "../../constants";

import {
  addItems,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";

import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";

const MenuContainer = () => {
  const [selected, setSelected] = useState(
    menus[0]
  );

  const dispatch = useDispatch();

  // Get the real cart from Redux
  const cartItems = useSelector(
    (state) => state.cart
  );

  // Change quantity directly in Redux
  const updateCartQuantity = (
    item,
    change
  ) => {
    const cartItemId = `menu-${item.id}`;

    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.id === cartItemId
    );

    // ADD / INCREASE
    if (change > 0) {
      if (existingItem) {
        if (existingItem.quantity >= 9) {
          return;
        }

        dispatch(
          increaseQuantity(cartItemId)
        );
      } else {
        dispatch(
          addItems({
            id: cartItemId,
            itemId: item.id,
            name: item.name,
            pricePerQuantity: Number(
              item.price
            ),
            quantity: 1,
            price: Number(item.price),
            note: "",
          })
        );
      }

      return;
    }

    // DECREASE
    if (change < 0 && existingItem) {
      dispatch(
        decreaseQuantity(cartItemId)
      );
    }
  };

  return (
    <div className="w-full">

      {/* CATEGORIES */}
      <div className="px-6 pt-5">

        <div className="mb-4">
          <h2 className="text-white text-lg font-bold">
            Categories
          </h2>

          <p className="text-[#777] text-xs mt-1">
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-3
          "
        >
          {menus.map((menu) => {
            const isSelected =
              selected.id === menu.id;

            return (
              <button
                key={menu.id}
                onClick={() =>
                  setSelected(menu)
                }
                className={`
                  relative
                  text-left
                  rounded-xl
                  px-4
                  py-4
                  border
                  transition-all
                  duration-200
                  ${
                    isSelected
                      ? "bg-[#fb6100]/10 border-[#fb6100]"
                      : "bg-[#252525] border-[#343434] hover:border-[#555]"
                  }
                `}
              >
                <div className="flex items-center justify-between">

                  <div>
                    <h3
                      className={`
                        font-semibold
                        ${
                          isSelected
                            ? "text-[#fb6100]"
                            : "text-white"
                        }
                      `}
                    >
                      {menu.name}
                    </h3>

                    <p className="text-[#777] text-xs mt-1">
                      {menu.items?.length ??
                        0}{" "}
                      items
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-[#fb6100] rounded-full" />
                  )}

                </div>
              </button>
            );
          })}
        </div>
      </div>


      {/* DIVIDER */}
      <div className="border-t border-[#2f2f2f] mt-6" />


      {/* MENU ITEMS */}
      <div className="px-6 py-5">

        <div className="mb-4">
          <h2 className="text-white text-lg font-bold">
            {selected?.name}
          </h2>

          <p className="text-[#777] text-xs mt-1">
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-4
            pb-8
          "
        >
          {selected?.items?.map(
            (item) => {
              const cartItemId =
                `menu-${item.id}`;

              const cartItem =
                cartItems.find(
                  (cartItem) =>
                    cartItem.id ===
                    cartItemId
                );

              const quantity =
                cartItem?.quantity || 0;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    updateCartQuantity(
                      item,
                      1
                    )
                  }
                  className={`
                    bg-[#252525]
                    border
                    rounded-xl
                    p-4
                    cursor-pointer
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    ${
                      quantity > 0
                        ? "border-[#fb6100]/60 bg-[#292929]"
                        : "border-[#343434] hover:border-[#fb6100]/40 hover:bg-[#292929]"
                    }
                  `}
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="text-white font-semibold text-base">
                        {item.name}
                      </h3>

                      <p className="text-[#777] text-xs mt-1">
                        {selected?.name}
                      </p>
                    </div>


                    {/* QUANTITY BADGE */}
                    {quantity > 0 && (
                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          bg-[#fb6100]/10
                          text-[#fb6100]
                          px-2.5
                          py-1.5
                          rounded-lg
                          text-xs
                          font-semibold
                        "
                      >
                        <FaShoppingCart
                          size={11}
                        />

                        {quantity}
                      </div>
                    )}

                  </div>


                  {/* BOTTOM */}
                  <div className="flex items-end justify-between mt-7">

                    {/* PRICE */}
                    <div>
                      <p className="text-[#777] text-xs">
                        Price
                      </p>

                      <p className="text-white text-xl font-bold mt-1">
                        $
                        {Number(
                          item.price
                        ).toFixed(2)}
                      </p>
                    </div>


                    {/* NO ITEM ADDED */}
                    {quantity === 0 ? (
                      <div
                        className="
                          bg-[#fb6100]/10
                          text-[#fb6100]
                          px-3
                          py-2
                          rounded-lg
                          text-xs
                          font-semibold
                        "
                      >
                        Tap to add
                      </div>
                    ) : (

                      /* QUANTITY CONTROL */
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          bg-[#1c1c1c]
                          border
                          border-[#343434]
                          rounded-lg
                          p-1
                        "
                      >

                        {/* MINUS */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            updateCartQuantity(
                              item,
                              -1
                            );
                          }}
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            rounded-md
                            text-[#ababab]
                            hover:text-white
                            hover:bg-[#343434]
                            transition
                          "
                        >
                          <FaMinus
                            size={10}
                          />
                        </button>


                        {/* QUANTITY */}
                        <span
                          className="
                            w-7
                            text-center
                            text-white
                            text-sm
                            font-semibold
                          "
                        >
                          {quantity}
                        </span>


                        {/* PLUS */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            updateCartQuantity(
                              item,
                              1
                            );
                          }}
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            rounded-md
                            bg-[#fb6100]
                            text-white
                            hover:bg-[#e55700]
                            transition
                          "
                        >
                          <FaPlus
                            size={10}
                          />
                        </button>

                      </div>
                    )}

                  </div>

                </div>
              );
            }
          )}
        </div>

      </div>

    </div>
  );
};

export default MenuContainer;