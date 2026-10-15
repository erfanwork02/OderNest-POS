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
        totals: {type: Number, required: true},
        tax: {type: Number, required: true},
        totalWithTax: {type: Number, required: true},
    },
    items:[]
}, {timestams : true});

module.exports = mongoose.model("Order", orderSchema);