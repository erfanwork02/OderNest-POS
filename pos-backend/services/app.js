require("dotenv").config();

const express = require("express");
const connectDB = require("../config/database");
const config = require("../config/config");
const globalErrorHandler = require("../middlewares/globalErrorHandler");
const createHttpError= require("http-errors");
const app = express();
app.set("json spaces", 2);

const PORT = config.port || 8000;

connectDB();

// Root Endpoint
app.get("/", (req, res) => {

  res.json({
    message: "Hello from OrderNest POS Backend!",
  });
});

// Global Error Handler
app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});