import { getAvatarName } from "../../../utils";
import { formatOrderDate, itemCount, orderNumber, orderTotal } from "../../../utils/orderDisplay";

const OrderCard = ({ order }) => {
  const ready = order.orderStatus === "Ready";
  const completed = order.orderStatus === "Completed";
  return (
    <article className="w-[500px] max-w-full bg-[#262626] p-4 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <div className="bg-[#fb6100] p-3 text-xl font-bold rounded-lg">{getAvatarName(order.customerDetails?.name)}</div>
        <div className="flex justify-between w-full gap-3">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[#f5f5f5] text-lg font-semibold">{order.customerDetails?.name || "Guest"}</h2>
            <p className="text-[#ababab] text-sm">#{orderNumber(order)} / Dine in</p>
            <p className="text-[#ababab] text-sm">Table {order.table?.tableNo ?? "N/A"}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className={`px-2 py-1 rounded-lg ${ready ? "text-green-400 bg-green-500/10" : completed ? "text-blue-400 bg-blue-500/10" : "text-yellow-400 bg-yellow-500/10"}`}>{order.orderStatus}</p>
            <p className="text-[#ababab] text-sm">{ready ? "Ready to serve" : completed ? "Order completed" : "Preparing your order"}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-[#ababab] gap-3">
        <p>{formatOrderDate(order.orderDate || order.createdAt)}</p><p>{itemCount(order)} items</p>
      </div>
      <hr className="w-full mt-4 border-gray-500" />
      <div className="flex justify-between mt-4 text-[#f5f5f5] text-lg font-semibold"><h3>Total</h3><p>${orderTotal(order).toFixed(2)}</p></div>
    </article>
  );
};
export default OrderCard;
