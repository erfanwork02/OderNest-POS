const Table = require("../models/tableModel");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");

const addTable = async (req, res, next) => {
    try {
        const { tableNo } = req.body;
        if (!Number.isInteger(tableNo) || tableNo < 1) {
            return next(createHttpError(400, "Please provide a positive integer table No!"));
        }
        if (await Table.findOne({ tableNo })) {
            return next(createHttpError(400, "Table already exist!"));
        }
        const table = await Table.create({ tableNo });
        res.status(201).json({ success: true, message: "Table added!", data: table });
    } catch (error) {
        // The unique index also handles simultaneous requests for the same table.
        next(error.code === 11000 ? createHttpError(400, "Table already exist!") : error);
    }
};

const getTables = async (req, res, next) => {
    try {
        const tables = await Table.find().populate("currentOrder");
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        next(error);
    }
};

const updateTable = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, orderId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid id!"));
        }
        if (!["Available", "Booked"].includes(status)) {
            return next(createHttpError(400, "Please provide a valid table status!"));
        }
        if (status === "Booked" && (typeof orderId !== "string" || !mongoose.Types.ObjectId.isValid(orderId))) {
            return next(createHttpError(400, "Please provide a valid order id!"));
        }
        const table = await Table.findByIdAndUpdate(id,
            { status, currentOrder: status === "Available" ? null : orderId },
            { returnDocument: "after", runValidators: true });
        if (!table) return next(createHttpError(404, "Table not found!"));
        res.status(200).json({ success: true, message: "Table updated!", data: table });
    } catch (error) {
        next(error);
    }
};

module.exports = { addTable, getTables, updateTable };
