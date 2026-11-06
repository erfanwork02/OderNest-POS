const express = require("express");
const {
    register,
    login,
    getUserData,
    logout
} = require("../controllers/userController");

const {
    isVerifiedUser
} = require("../middleware/tokenVerification");

const router = express.Router();


// Authentication Routes
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").post(isVerifiedUser, logout);

// Protected Route - Get logged-in user information
router.route("/").get(isVerifiedUser, getUserData);


module.exports = router;