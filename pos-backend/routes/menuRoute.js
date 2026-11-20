const express = require("express");

const {
  getMenu,
  addCategory,
  addDish,
} = require("../controllers/menuController");

const {
  isVerifiedUser,
} = require("../middleware/tokenVerification");

const router = express.Router();

router.use(isVerifiedUser);

// GET ALL CATEGORIES + DISHES
router.get("/", getMenu);

// ADD CATEGORY
router.post("/category", addCategory);

// ADD DISH TO CATEGORY
router.post(
  "/category/:categoryId/dish",
  addDish
);

module.exports = router;