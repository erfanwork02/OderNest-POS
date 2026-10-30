const { SquareClient, SquareEnvironment } = require("square");
const crypto = require("crypto");

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

const createPayment = async (req, res, next) => {
  try {
    const { sourceId, amount } = req.body;

    if (!sourceId || !amount) {
      return res.status(400).json({
        success: false,
        message: "sourceId and amount are required",
      });
    }

    const response = await squareClient.payments.create({
      sourceId,
      idempotencyKey: crypto.randomUUID(),

      amountMoney: {
        amount: BigInt(Math.round(amount * 100)),
        currency: "USD",
      },

      locationId: process.env.SQUARE_LOCATION_ID,
    });

    // Convert BigInt values so Express can return JSON
    const payment = JSON.parse(
      JSON.stringify(response.payment, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    console.error("Square payment error:", error);
    next(error);
  }
};

module.exports = { createPayment };