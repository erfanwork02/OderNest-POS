const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNo: { type: Number, required: true, unique: true, min: 1,
        validate: { validator: Number.isInteger, message: "Table number must be an integer" } },
    status: { type: String, enum: ["Available", "Booked"], default: "Available" },
    currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null }
});

module.exports = mongoose.model("Table", tableSchema);
