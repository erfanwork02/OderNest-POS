const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;

        if (!name || !phone || !email || !password || !role) {
            return next(
                createHttpError(400, "All fields are required!")
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        const isUserPresent = await User.findOne({
            email: normalizedEmail
        });

        if (isUserPresent) {
            return next(
                createHttpError(400, "User already exists!")
            );
        }

        // Password is automatically hashed in userModel.js
        const newUser = new User({
            name,
            phone,
            email: normalizedEmail,
            password,
            role
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "New user created successfully!",
            data: {
                id: newUser._id,
                name: newUser.name,
                phone: newUser.phone,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        next(error);
    }
};



// LOGIN USER

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(
                createHttpError(
                    400,
                    "Email and password are required!"
                )
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Find user
        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return next(
                createHttpError(401, "Invalid credentials!")
            );
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return next(
                createHttpError(401, "Invalid credentials!")
            );
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            return next(
                createHttpError(
                    500,
                    "JWT secret is not configured!"
                )
            );
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Save token inside cookie
        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax"
        });

        res.status(200).json({
            success: true,
            message: "Login successful!",
            data: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};


// GET LOGGED-IN USER DATA

const getUserData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return next(
                createHttpError(404, "User not found!")
            );
        }

        res.status(200).json({
            success: true,
            message: "User data fetched successfully!",
            data: user
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    register,
    login,
    getUserData
};