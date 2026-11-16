const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/adminController");

const {
  isVerifiedUser,
} = require("../middleware/tokenVerification");

const router = express.Router();

router.use(isVerifiedUser);

router.get(
  "/dashboard",
  getDashboardStats
);

module.exports = router;