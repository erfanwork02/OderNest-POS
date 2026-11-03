export const orderNumber = (order) => order._id?.slice(-8).toUpperCase() || "N/A";
export const itemCount = (order) => (order.items || []).reduce((count, item) => count + (Number(item.quantity) || 1), 0);
export const orderTotal = (order) => Number(order.bills?.totalWithTax ?? order.bills?.total ?? order.bills?.totals ?? 0);
export const formatOrderDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York",
  });
};
export const matchesOrder = (order, search) => [order.customerDetails?.name, order._id, orderNumber(order), order.table?.tableNo, order.orderStatus]
  .some((value) => String(value ?? "").toLowerCase().includes(search.trim().toLowerCase()));
