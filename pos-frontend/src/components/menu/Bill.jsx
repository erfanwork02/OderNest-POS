import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa";

const Bill = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardReady, setIsCardReady] = useState(false);

  const cardRef = useRef(null);

  // Get cart items and total price from Redux
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);

  // Calculate tax and final bill
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  // Initialize Square card form
  useEffect(() => {
    if (paymentMethod !== "online") {
      setIsCardReady(false);
      return;
    }

    let card;

    const initializeSquare = async () => {
      try {
        setIsCardReady(false);

        if (!window.Square) {
          console.error("Square.js failed to load.");
          alert("Square payment system failed to load.");
          return;
        }

        const applicationId =
          import.meta.env.VITE_SQUARE_APPLICATION_ID;

        const locationId =
          import.meta.env.VITE_SQUARE_LOCATION_ID;

        if (!applicationId || !locationId) {
          alert("Square Application ID or Location ID is missing.");
          return;
        }

        console.log("Initializing Square...");

        const payments = window.Square.payments(
          applicationId,
          locationId
        );

        card = await payments.card();

        await card.attach("#card-container");

        cardRef.current = card;
        setIsCardReady(true);

        console.log("Square card is ready.");
      } catch (error) {
        console.error("Square initialization error:", error);

        setIsCardReady(false);

        alert("Unable to initialize Square card form.");
      }
    };

    initializeSquare();

    return () => {
      setIsCardReady(false);

      if (card) {
        card.destroy();
      }

      cardRef.current = null;
    };
  }, [paymentMethod]);

  // Handle Place Order
  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (totalPriceWithTax <= 0) {
      alert("Please add items to the order first.");
      return;
    }

    // CASH PAYMENT
    if (paymentMethod === "cash") {
      console.log("Payment Method: Cash");
      console.log("Total:", totalPriceWithTax.toFixed(2));

      alert("Cash payment selected. Order can be placed.");

      return;
    }

    // ONLINE PAYMENT
    if (paymentMethod === "online") {
      try {
        if (!isCardReady || !cardRef.current) {
          alert("Square card form is not ready yet.");
          return;
        }

        setIsProcessing(true);

        const tokenResult =
          await cardRef.current.tokenize();

        if (tokenResult.status !== "OK") {
          console.error(
            "Square tokenization error:",
            tokenResult.errors
          );

          alert("Card information could not be verified.");
          return;
        }

        const sourceId = tokenResult.token;

        console.log("Square token created successfully.");

        const response = await fetch(
          "http://localhost:5100/api/payment/create-payment",
          {
            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              sourceId,
              amount: Number(
                totalPriceWithTax.toFixed(2)
              ),
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Payment error:", data);

          alert(
            data.message ||
              "Payment failed. Please try again."
          );

          return;
        }

        console.log("Payment successful:", data);

        alert("Payment completed successfully!");

        if (cardRef.current) {
          await cardRef.current.clear();
        }
      } catch (error) {
        console.error("Payment error:", error);

        alert(
          "Something went wrong while processing the payment."
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="p-5">
      {/* BILL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[#ababab] text-sm">
            Items (
            {cartData.reduce(
              (count, item) =>
                count + item.quantity,
              0
            )}
            )
          </p>

          <p className="text-white text-sm font-semibold">
            ${total.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[#ababab] text-sm">
            Tax (5.25%)
          </p>

          <p className="text-white text-sm font-semibold">
            ${tax.toFixed(2)}
          </p>
        </div>

        {/* TOTAL */}
        <div className="border-t border-[#343434] pt-4 mt-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[#777] text-xs">
                Total Amount
              </p>

              <p className="text-white text-2xl font-bold mt-1">
                ${totalPriceWithTax.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              setPaymentMethod("cash")
            }
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all ${
              paymentMethod === "cash"
                ? "bg-[#fb6100]/10 border-[#fb6100] text-[#fb6100]"
                : "bg-[#252525] border-[#343434] text-[#ababab]"
            }`}
          >
            <FaMoneyBillWave />
            Cash
          </button>

          <button
            onClick={() =>
              setPaymentMethod("online")
            }
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all ${
              paymentMethod === "online"
                ? "bg-[#fb6100]/10 border-[#fb6100] text-[#fb6100]"
                : "bg-[#252525] border-[#343434] text-[#ababab]"
            }`}
          >
            <FaCreditCard />
            Online
          </button>
        </div>
      </div>

      {/* SQUARE CARD FORM */}
      {paymentMethod === "online" && (
        <div className="mt-5">
          <p className="text-white font-semibold mb-3">
            Card Information
          </p>

          <div
            id="card-container"
            className="bg-white rounded-xl p-3"
          ></div>

          <p className="text-[#ababab] text-xs mt-2">
            {isCardReady
              ? "Square Sandbox Payment - Ready"
              : "Loading Square payment form..."}
          </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <button
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-[#252525]
            border
            border-[#343434]
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-[#303030]
            transition
          "
        >
          <FaPrint />
          Print Receipt
        </button>

        <button
          onClick={handlePlaceOrder}
          disabled={
            isProcessing ||
            (paymentMethod === "online" &&
              !isCardReady)
          }
          className={`
            flex
            items-center
            justify-center
            gap-2
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            ${
              isProcessing ||
              (paymentMethod === "online" &&
                !isCardReady)
                ? "bg-[#777] cursor-not-allowed"
                : "bg-[#fb6100] hover:bg-[#e55700]"
            }
          `}
        >
          <FaCheckCircle />

          {isProcessing
            ? "Processing..."
            : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Bill;