const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: {type: String, required: true,},
        phone: {type: String, required: true,},
        guests: {type: Number, required: true,},
    },
    orderStatus: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    bills:{
        // Accept the tutorial field and the original team field without a data migration.
        total: {type: Number, required: function () { return this.bills.totals == null; }},
        totals: {type: Number, required: function () { return this.bills.total == null; }},
        tax: {type: Number, required: true},
        totalWithTax: {type: Number, required: true},
    },
    items:[],
    table: {type: mongoose.Schema.Types.ObjectId, ref: "Table"}
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);
