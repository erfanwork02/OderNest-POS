// Keep a created order when table booking fails, so retrying never creates it twice.
export async function placeTableOrder({ orderData, savedOrder, addOrder, updateTable, onCreated }) {
  let order = savedOrder;
  if (!order) {
    order = (await addOrder(orderData)).data.data;
    onCreated(order);
  }
  const tableId = typeof order.table === "object" ? order.table?._id : order.table;

if (tableId) {
  await updateTable({
    tableId,
    status: "Booked",
    orderId: order._id
  });
}
  return order;
}


export function createOrderData(customer, items, total, taxRate, paymentMethod, quickOrder = false) {
  if (!quickOrder) {
    if (!customer.customerName?.trim() || !customer.customerPhone?.trim() || customer.guests < 1) {
      throw new Error("Please enter the customer name, phone and number of guests.");
    }

    if (!customer.table?.tableId) {
      throw new Error("Please select a table first.");
    }
  }

  if (!items.length || !Number.isFinite(total) || total <= 0) {
    throw new Error("Please add items to the order first.");
  }

  const subtotal = Math.round(total * 100) / 100;
  const tax = Math.round(subtotal * taxRate) / 100;

  return {
    customerDetails: {
      name: quickOrder ? "Walk-in Customer" : customer.customerName.trim(),
      phone: quickOrder ? "N/A" : customer.customerPhone.trim(),
      guests: quickOrder ? 1 : customer.guests
    },
    orderStatus: "In Progress",
    bills: {
      total: subtotal,
      tax,
      totalWithTax: Math.round((subtotal + tax) * 100) / 100
    },
    items,
    ...(quickOrder ? {} : { table: customer.table.tableId }),
    paymentMethod
  };
}
