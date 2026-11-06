const cors = require("cors");
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("../config/database");
const config = require("../config/config");
const globalErrorHandler = require("../middleware/globalErrorHandler");

const app = express();


// MIDDLEWARES

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.startsWith("http://localhost:")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.set("json spaces", 2);


// PORT

const PORT = config.port || 8000;


// DATABASE

connectDB();


// ROOT ENDPOINT

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello from OrderNest POS Backend!",
  });
});


// ROUTES

app.use("/api/user", require("../routes/userRoute"));
app.use("/api/table", require("../routes/tableRoute"));
app.use("/api/order", require("../routes/orderRoute"));
//app.use("/api/payment", require("../routes/PaymentRoute"));


// GLOBAL ERROR HANDLER

app.use(globalErrorHandler);


// START SERVER

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});