const express = require("express");
const router = express.Router();

const { isVerifiedUser } = require("../middleware/tokenVerification");
const { createPayment } = require("../controllers/paymentController");

router.post(
  "/create-payment",
  isVerifiedUser,
  createPayment
);

module.exports = router;