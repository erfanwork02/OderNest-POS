import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  customerName: "",
  customerPhone: "",
  guests: 0,
  tableNo: "",
  table: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, phone, guests } = action.payload;
      state.orderId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      state.customerName = name;
      state.customerPhone = phone;
      state.guests = guests;
    },
    removeCustomer: (state) => {
      state.orderId = "";
      state.customerName = "";
      state.customerPhone = "";
      state.guests = 0;
      state.tableNo = "";
      state.table = null;
    },
    updateTable: (state, action) => {
      state.tableNo = action.payload.tableNo;
      state.table = { tableId: action.payload.tableId, tableNo: action.payload.tableNo };
    },
  },
});

export const { setCustomer, removeCustomer, updateTable } =
  customerSlice.actions;

export default customerSlice.reducer;