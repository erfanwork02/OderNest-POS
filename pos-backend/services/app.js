require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("../config/database");
const config = require("../config/config");
const globalErrorHandler = require("../middlewares/globalErrorHandler");

const app = express();



// MIDDLEWARES

app.use(express.json());
app.use(cookieParser());

app.set("json spaces", 2);



// PORT

const PORT = config.port || 5100;



// DATABASE

connectDB();



// ROOT ENDPOINT

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello from OrderNest POS Backend!"
    });
});



// USER ROUTES

app.use(
    "/api/user",
    require("../routes/userRoute")
);



// ORDER ROUTES

app.use(
    "/api/order",
    require("../routes/orderRoute")
);



// GLOBAL ERROR HANDLER

app.use(globalErrorHandler);


// START SERVER

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});