
import React from "react";

const Invoice = ({ orderInfo, setShowInvoice }) => {
  if (!orderInfo) return null;

  const customer = orderInfo.customerDetails || {};
  const bills = orderInfo.bills || {};
  const items = orderInfo.items || [];

  const money = (value) => `$${Number(value || 0).toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 text-black">

        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold">OrderNest POS</h1>
          <p className="text-gray-500">Restaurant Invoice</p>
          <p className="text-sm mt-2">
            Thank you for your order!
          </p>
        </div>

        <div className="border-t pt-4 text-sm space-y-2">
          <p><strong>Order ID:</strong> {orderInfo._id || "N/A"}</p>
          <p><strong>Name:</strong> {customer.name || "N/A"}</p>
          <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
          <p><strong>Guests:</strong> {customer.guests ?? "N/A"}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(orderInfo.orderDate || Date.now()).toLocaleString()}
          </p>
        </div>

        <div className="border-t mt-4 pt-4">
          <h2 className="font-bold mb-3">Items Ordered</h2>

          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name || item.itemName || "Item"} x {item.quantity || 1}
              </span>
              <span>
                {money((item.price || 0) * (item.quantity || 1))}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{money(bills.total ?? bills.totals)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>{money(bills.tax)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Grand Total</span>
            <span>{money(bills.totalWithTax)}</span>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 text-sm">
          <p>
            <strong>Payment Method:</strong>{" "}
            {orderInfo.paymentMethod || "Not specified"}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowInvoice(false)}
            className="flex-1 bg-gray-200 py-3 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
