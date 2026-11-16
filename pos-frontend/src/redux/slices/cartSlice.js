import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add item to cart
    addItems: (state, action) => {
      state.push(action.payload);
    },

    // Remove all items
    removeAllItems: () => [],

    // Remove one item
    removeItem: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    // Increase quantity
    increaseQuantity: (state, action) => {
      const item = state.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity < 9) {
        item.quantity += 1;

        item.price =
          item.pricePerQuantity *
          item.quantity;
      }
    },

    // Decrease quantity
    decreaseQuantity: (state, action) => {
      const item = state.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;

        item.price =
          item.pricePerQuantity *
          item.quantity;
      } else {
        return state.filter(
          (cartItem) =>
            cartItem.id !== action.payload
        );
      }
    },

    // Update item notes
    updateItemNote: (state, action) => {
      const { id, note } = action.payload;

      const item = state.find(
        (item) => item.id === id
      );

      if (item) {
        item.note = note;
      }
    },
  },
});

export const {
  addItems,
  removeItem,
  removeAllItems,
  increaseQuantity,
  decreaseQuantity,
  updateItemNote,
} = cartSlice.actions;

export const getTotalPrice = (state) =>
  state.cart.reduce(
    (total, item) => total + item.price,
    0
  );

export default cartSlice.reducer;