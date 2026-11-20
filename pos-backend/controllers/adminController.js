const Order = require("../models/orderModels");
const Table = require("../models/tableModel");

const getDashboardStats = async (req, res, next) => {
  try {
    const orders = await Order.find({}).lean();

    const totalOrders = orders.length;

    const totalCustomers = new Set(
      orders
        .map(
          (order) =>
            order.customerDetails?.phone ||
            order.customerDetails?.name
        )
        .filter(Boolean)
    ).size;

    const activeOrders = orders.filter((order) => {
      const status = String(
        order.orderStatus || order.status || ""
      ).toLowerCase();

      return (
        status !== "completed" &&
        status !== "cancelled"
      );
    }).length;

    const getOrderTotal = (order) => {
      return Number(
        order.bills?.totalWithTax ??
          order.bills?.total ??
          order.finalTotal ??
          order.total ??
          0
      );
    };

    const revenue = orders.reduce(
      (total, order) =>
        total + getOrderTotal(order),
      0
    );

    const averageOrderValue =
      totalOrders > 0
        ? revenue / totalOrders
        : 0;

    const cashPayments = orders
      .filter(
        (order) =>
          String(
            order.paymentMethod || ""
          ).toLowerCase() === "cash"
      )
      .reduce(
        (total, order) =>
          total + getOrderTotal(order),
        0
      );

    const cardPayments = orders
      .filter(
        (order) =>
          String(
            order.paymentMethod || ""
          ).toLowerCase() === "card"
      )
      .reduce(
        (total, order) =>
          total + getOrderTotal(order),
        0
      );

    const totalTables =
      await Table.countDocuments();

    res.status(200).json({
      success: true,

      data: {
        revenue: Number(
          revenue.toFixed(2)
        ),

        totalOrders,

        totalCustomers,

        averageOrderValue: Number(
          averageOrderValue.toFixed(2)
        ),

        activeOrders,

        totalTables,

        payments: {
          cash: Number(
            cashPayments.toFixed(2)
          ),

          card: Number(
            cardPayments.toFixed(2)
          ),

          total: Number(
            (
              cashPayments +
              cardPayments
            ).toFixed(2)
          ),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};