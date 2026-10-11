import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add a selected food item to the cart
    addItems: (state, action) => {
      state.push(action.payload);
    },

    // Remove a food item from the cart
    removeItem: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Export actions for other components
export const { addItems, removeItem } = cartSlice.actions;

export const getTotalPrice = (state) =>
  state.cart.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;

