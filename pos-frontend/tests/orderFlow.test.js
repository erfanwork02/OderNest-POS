import { test } from "node:test";
import assert from "node:assert/strict";
import { createOrderData, placeTableOrder } from "../src/utils/orderFlow.js";
import { itemCount, matchesOrder, formatOrderDate } from "../src/utils/orderDisplay.js";

const customer = { customerName: " Guest ", customerPhone: "1234567890", guests: 2, table: { tableId: "table-1", tableNo: 1 } };
const items = [{ name: "Meal", price: 10, quantity: 2 }];
test("checkout uses the selected database table and rounds USD totals", () => {
  const data = createOrderData(customer, items, 10, 5.25);
  assert.deepEqual(data.bills, { total: 10, tax: 0.53, totalWithTax: 10.53 });
  assert.equal(data.table, "table-1");
  assert.equal(data.customerDetails.name, "Guest");
  assert.throws(() => createOrderData({ ...customer, table: null }, items, 10, 5.25), /select a table/);
  assert.throws(() => createOrderData(customer, [], 0, 5.25), /add items/);
});
test("booking failure preserves the saved order and retry does not create a duplicate", async () => {
  let savedOrder, created = 0, booked = 0;
  const addOrder = async () => { created++; return { data: { data: { _id: "order-1", table: "table-1" } } }; };
  const updateTable = async (data) => {
    assert.deepEqual(data, { tableId: "table-1", status: "Booked", orderId: "order-1" });
    if (++booked === 1) throw new Error("Connection lost");
  };
  const options = { orderData: {}, addOrder, updateTable, onCreated: (order) => { savedOrder = order; } };
  await assert.rejects(placeTableOrder(options), /Connection lost/);
  assert.equal(savedOrder._id, "order-1");
  await placeTableOrder({ ...options, savedOrder });
  assert.equal(created, 1);
  assert.equal(booked, 2);
});
test("failed order creation never books a table", async () => {
  let booked = false;
  await assert.rejects(placeTableOrder({ addOrder: async () => { throw new Error("Unavailable"); }, updateTable: async () => { booked = true; } }), /Unavailable/);
  assert.equal(booked, false);
});
test("order displays handle quantities, searches and missing historical dates", () => {
  assert.equal(itemCount({ items }), 2);
  assert.equal(matchesOrder({ customerDetails: { name: "Guest" } }, "GUE"), true);
  assert.equal(formatOrderDate(undefined), "N/A");
});

test("customer table selection and checkout resets use serializable Redux state", async () => {
  const { default: customerReducer, updateTable, removeCustomer } = await import("../src/redux/slices/customerSlice.js");
  const { default: cartReducer, addItems, removeAllItems } = await import("../src/redux/slices/cartSlice.js");
  const selected = customerReducer(undefined, updateTable({ tableId: "table-1", tableNo: 1 }));
  assert.deepEqual(selected.table, { tableId: "table-1", tableNo: 1 });
  assert.equal(customerReducer(selected, removeCustomer()).table, null);
  assert.deepEqual(cartReducer(cartReducer(undefined, addItems(items[0])), removeAllItems()), []);
});
