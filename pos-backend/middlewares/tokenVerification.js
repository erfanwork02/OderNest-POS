const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");



// VERIFY LOGGED-IN USER

const isVerifiedUser = async (req, res, next) => {
    try {
        // Get access token from cookie
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return next(
                createHttpError(401, "Access token not found!")
            );
        }

        // Verify token
        const decodedToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );

        // Find user using ID stored in JWT
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return next(
                createHttpError(401, "User does not exist!")
            );
        }

        // Attach user to request
        req.user = user;

        next();

    } catch (error) {
        return next(
            createHttpError(401, "Invalid or expired token!")
        );
    }
};


module.exports = {
    isVerifiedUser
};