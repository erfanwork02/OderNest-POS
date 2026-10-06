import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice.js";

const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;