import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import Invoice from "../invoice/invoice";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaPrint,
  FaCheckCircle,
} from "react-icons/fa";

import { useQueryClient } from "@tanstack/react-query";

import {
  addOrder,
  updateTable,
} from "../../https/index";

import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";

import {
  createOrderData,
  placeTableOrder,
} from "../../utils/orderFlow";

const Bill = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const location = useLocation();
  const quickOrder = location.state?.quickOrder === true;


  const customerData = useSelector(
    (state) => state.customer
  );

  const cartData = useSelector(
    (state) => state.cart
  );

  const total = useSelector(getTotalPrice);

  const savedOrderRef = useRef(null);
  const savedPaymentMethodRef = useRef(null);
  const submittingRef = useRef(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardReady, setIsCardReady] = useState(false);

  const cardRef = useRef(null);

 

  // Backend URL
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:8000";

  // Calculate tax
  const taxRate = 6.625;

  const tax =
    (total * taxRate) / 100;

  const totalPriceWithTax =
    total + tax;

  // Refresh frontend data after order
  const refreshData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      }),

      queryClient.invalidateQueries({
        queryKey: ["tables"],
      }),

      queryClient.invalidateQueries({
        queryKey: ["admin-dashboard"],
      }),
    ]);
  };

  // Clear order after successful checkout
  const clearOrder = () => {
    savedOrderRef.current = null;
    savedPaymentMethodRef.current = null;

    dispatch(removeAllItems());
    dispatch(removeCustomer());
  };

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
          console.error(
            "Square.js failed to load."
          );

          alert(
            "Square payment system failed to load."
          );

          return;
        }

        const applicationId =
          import.meta.env
            .VITE_SQUARE_APPLICATION_ID;

        const locationId =
          import.meta.env
            .VITE_SQUARE_LOCATION_ID;

        if (
          !applicationId ||
          !locationId
        ) {
          alert(
            "Square Application ID or Location ID is missing."
          );

          return;
        }

        console.log(
          "Initializing Square..."
        );

        const payments =
          window.Square.payments(
            applicationId,
            locationId
          );

        card = await payments.card();

        await card.attach(
          "#card-container"
        );

        cardRef.current = card;

        setIsCardReady(true);

        console.log(
          "Square card is ready."
        );
      } catch (error) {
        console.error(
          "Square initialization error:",
          error
        );

        setIsCardReady(false);

        alert(
          "Unable to initialize Square card form."
        );
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

  // CASH ORDER
  const handleCashOrder = async () => {
    if (
      savedOrderRef.current &&
      savedPaymentMethodRef.current !== "cash"
    ) {
      alert(
        "This order was already saved with another payment method."
      );

      return;
    }

    const baseOrderData =
      savedOrderRef.current
        ? null
        : createOrderData(
            customerData,
            cartData,
            total,
            taxRate
          );

    const orderData =
      baseOrderData
        ? {
            ...baseOrderData,

            paymentMethod: "cash",

            paymentStatus: "paid",

            paidAt:
              new Date().toISOString(),
          }
        : null;

    await placeTableOrder({
      orderData,

      savedOrder:
        savedOrderRef.current,

      addOrder,

      updateTable,

      onCreated: (order) => {
        savedOrderRef.current =
          order;

        savedPaymentMethodRef.current =
          "cash";
      },
    });

    clearOrder();

    await refreshData();

    alert(
      "Cash order placed successfully."
    );
  };

  // CARD ORDER
  const handleCardOrder = async () => {
    // If payment already completed and
    // only table booking failed,
    // do not charge the card again.
    if (
      savedOrderRef.current &&
      savedPaymentMethodRef.current ===
        "card"
    ) {
      await placeTableOrder({
        orderData: null,

        savedOrder:
          savedOrderRef.current,

        addOrder,

        updateTable,
      });

      clearOrder();

      await refreshData();

      alert(
        "Order completed successfully."
      );

      return;
    }

    // CASH PAYMENT
    if (paymentMethod === "cash") {
      submittingRef.current = true;
      setIsProcessing(true);
      try {
        
const orderData = savedOrderRef.current
  ? null
  : createOrderData(
      customerData,
      cartData,
      total,
      taxRate,
      paymentMethod,
      quickOrder
    );

        await placeTableOrder({
          orderData,
          savedOrder: savedOrderRef.current,
          addOrder,
          updateTable,
          onCreated: (order) => { savedOrderRef.current = order; },
        });
        setOrderInfo(savedOrderRef.current);
        setShowInvoice(true);
        savedOrderRef.current = null;
        dispatch(removeAllItems());
        dispatch(removeCustomer());
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["orders"] }),
          queryClient.invalidateQueries({ queryKey: ["tables"] }),
        ]);
        
alert(
  quickOrder
    ? "Quick order placed successfully."
    : "Order placed and table booked successfully."
);

      } catch (error) {
        const message = error.response?.data?.message || error.message;
        alert(savedOrderRef.current
          ? `Order saved, but table booking failed: ${message}. Select Cash and retry to book the same order.`
          : message);
      } finally {
        submittingRef.current = false;
        setIsProcessing(false);
      }
    if (
      savedOrderRef.current &&
      savedPaymentMethodRef.current !==
        "card"
    ) {
      alert(
        "This order was already saved using another payment method."
      );

      return;
    }

    if (
      !isCardReady ||
      !cardRef.current
    ) {
      alert(
        "Square card form is not ready yet."
      );

      return;
    }

    // Create Square token
    const tokenResult =
      await cardRef.current.tokenize();

    if (
      tokenResult.status !== "OK"
    ) {
      console.error(
        "Square tokenization error:",
        tokenResult.errors
      );

      alert(
        "Card information could not be verified."
      );

      return;
    }

    const sourceId =
      tokenResult.token;

    console.log(
      "Square token created successfully."
    );

    // Process payment
    const response = await fetch(
      `${backendUrl}/api/payment/create-payment`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          sourceId,

          amount: Number(
            totalPriceWithTax.toFixed(2)
          ),
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "Payment error:",
        data
      );

      throw new Error(
        data.message ||
          "Payment failed. Please try again."
      );
    }

    console.log(
      "Payment successful:",
      data
    );

    // Try to get Square payment ID
    const paymentId =
      data?.payment?.id ||
      data?.paymentId ||
      data?.id ||
      null;

    // Build MongoDB order
    const baseOrderData =
      createOrderData(
        customerData,
        cartData,
        total,
        taxRate
      );

    const orderData = {
      ...baseOrderData,

      paymentMethod: "card",

      paymentStatus: "paid",

      paidAt:
        new Date().toISOString(),

      paymentId,
    };

    // Save order and book table
    await placeTableOrder({
      orderData,

      savedOrder: null,

      addOrder,

      updateTable,

      onCreated: (order) => {
        savedOrderRef.current =
          order;

        savedPaymentMethodRef.current =
          "card";
      },
    });

    clearOrder();

    await refreshData();

    if (cardRef.current) {
      await cardRef.current.clear();
    }

    alert(
      "Card payment completed and order placed successfully!"
    );
  };

  // PLACE ORDER
  const handlePlaceOrder =
    async () => {
      if (
        submittingRef.current
      ) {
        return;
      }

      if (!paymentMethod) {
        alert(
          "Please select a payment method"
        );

        return;
      }

      if (
        totalPriceWithTax <= 0
      ) {
        alert(
          "Please add items to the order first."
        );

        return;
      }

      submittingRef.current =
        true;

      setIsProcessing(true);

      try {
        if (
          paymentMethod === "cash"
        ) {
          await handleCashOrder();

          return;
        }

        if (
          paymentMethod === "online"
        ) {
          await handleCardOrder();
        }
      } catch (error) {
        console.error(
          "Order/payment error:",
          error
        );

        const message =
          error.response?.data
            ?.message ||
          error.message ||
          "Something went wrong.";

        if (
          savedOrderRef.current
        ) {
          alert(
            `Order was saved, but table booking failed: ${message}. Try placing the order again to finish booking the table.`
          );
        } else {
          alert(message);
        }
      } finally {
        submittingRef.current =
          false;

        setIsProcessing(false);
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
                count +
                item.quantity,
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
            Tax (6.625%)
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
                $
                {totalPriceWithTax.toFixed(
                  2
                )}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* PAYMENT */}
      <div className="mt-5">

        <div className="grid grid-cols-2 gap-3">

          {/* CASH */}
          <button
            onClick={() =>
              setPaymentMethod(
                "cash"
              )
            }
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all ${
              paymentMethod ===
              "cash"
                ? "bg-[#fb6100]/10 border-[#fb6100] text-[#fb6100]"
                : "bg-[#252525] border-[#343434] text-[#ababab]"
            }`}
          >
            <FaMoneyBillWave />

            Cash
          </button>


          {/* CARD */}
          <button
            onClick={() =>
              setPaymentMethod(
                "online"
              )
            }
            className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold transition-all ${
              paymentMethod ===
              "online"
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
      {paymentMethod ===
        "online" && (
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

        {/* PRINT */}
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


        {/* PLACE ORDER */}
        <button
          onClick={
            handlePlaceOrder
          }
          disabled={
            isProcessing ||
            (paymentMethod ===
              "online" &&
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
              (paymentMethod ===
                "online" &&
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

    {showInvoice && orderInfo && (
      <Invoice
        orderInfo={orderInfo}
        setShowInvoice={setShowInvoice}
      />
    )}

  </div>
);
};

export default Bill;