const createHttpError = require("http-errors");
const User = require("../models/userModel");

const register = async (req, res, next) => {
    try {
        const { name, phone, email, password, role } = req.body;

        // Check if all fields are provided
        if (!name || !phone || !email || !password || !role) {
            const error = createHttpError(400, "All fields are required!");
            return next(error);
        }

        // Check if the user already exists
        const isUserPresent = await User.findOne({ email });

        if (isUserPresent) {
            const error = createHttpError(400, "User already exists!");
            return next(error);
        }
       // Create a new user
        const user = {
            name,
            phone,
            email,
            password,
            role
        };

        const newUser = new User(user);
        await newUser.save();

        // Send success response without the password
        res.status(201).json({
            success: true,
            message: "New user created!",
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

const login = async (req, res, next) => {
    // Login functionality will be implemented later
    res.status(501).json({
        success: false,
        message: "Login is not implemented yet."
    });
};

module.exports = { register, login };