const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");


// ==============================
// ADD TABLE
// ==============================
const addTable = async (req, res, next) => {
  try {
    let { tableNo, seats } = req.body;

    tableNo = Number(tableNo);
    seats = Number(seats);

    if (!Number.isInteger(tableNo) || tableNo < 1) {
      return next(
        createHttpError(
          400,
          "Please provide a positive integer table number!"
        )
      );
    }

    if (!Number.isInteger(seats) || seats < 1) {
      return next(
        createHttpError(
          400,
          "Please provide a positive integer number of seats!"
        )
      );
    }

    const existingTable = await Table.findOne({ tableNo });

    if (existingTable) {
      return next(
        createHttpError(
          409,
          "Table already exists!"
        )
      );
    }

    const table = await Table.create({
      tableNo,
      seats,
      status: "Available",
    });

    res.status(201).json({
      success: true,
      message: "Table added successfully!",
      data: table,
    });

  } catch (error) {
    if (error.code === 11000) {
      return next(
        createHttpError(
          409,
          "Table already exists!"
        )
      );
    }

    next(error);
  }
};


// ==============================
// GET ALL TABLES
// ==============================
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find()
      .populate ({ path: "currentOrder",
        select: "customerDetails"
       })
      .sort({ tableNo: 1 });

    res.status(200).json({
      success: true,
      data: tables,
    });

  } catch (error) {
    next(error);
  }
};


// ==============================
// UPDATE TABLE
// ==============================
const updateTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, orderId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(
        createHttpError(
          400,
          "Invalid table id!"
        )
      );
    }

    if (!["Available", "Booked"].includes(status)) {
      return next(
        createHttpError(
          400,
          "Please provide a valid table status!"
        )
      );
    }

    if (status === "Booked") {
      if (
        !orderId ||
        !mongoose.Types.ObjectId.isValid(orderId)
      ) {
        return next(
          createHttpError(
            400,
            "Please provide a valid order id!"
          )
        );
      }
    }

    const table = await Table.findByIdAndUpdate(
      id,
      {
        status,
        currentOrder:
          status === "Available"
            ? null
            : orderId,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("currentOrder");

    if (!table) {
      return next(
        createHttpError(
          404,
          "Table not found!"
        )
      );
    }

    res.status(200).json({
      success: true,
      message: "Table updated successfully!",
      data: table,
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  addTable,
  getTables,
  updateTable,
};