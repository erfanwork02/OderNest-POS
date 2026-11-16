const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      guests: {
        type: Number,
        required: true,
      },
    },

    orderStatus: {
      type: String,
      required: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    bills: {
      // Supports both old and newer order data
      total: {
        type: Number,
        required: function () {
          return this.bills.totals == null;
        },
      },

      totals: {
        type: Number,
        required: function () {
          return this.bills.total == null;
        },
      },

      tax: {
        type: Number,
        required: true,
      },

      totalWithTax: {
        type: Number,
        required: true,
      },
    },

    items: [],

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },

    // PAYMENT METHOD
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      lowercase: true,
      default: null,
    },

    // PAYMENT STATUS
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "pending",
    },

    // DATE PAYMENT WAS COMPLETED
    paidAt: {
      type: Date,
      default: null,
    },

    // Optional payment transaction ID
    paymentId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);