const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const Order = require("../models/orderModels");

const addOrder = async (req, res, next) => {

    try{

        const order = new Order(req.body);
        await order.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });
    } catch (error){
        next(error);
    }
}

const getOrderById = async (req, res, next) => {
    try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid id!"));
        }
        const order = await Order.findById(id);
        if(!order){
            const error = createHttpError(404, "Order not found");
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
}

const getOrders = async (req, res, next) => {

    try{
        const orders = await Order.find();
        res.status(200).json({
            data: orders
        });
    } catch (error){
        next(error);
    }

}

const updateOrder = async (req, res, next) => {

    try{
            const {orderStatus} = req.body;
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return next(createHttpError(404, "Invalid id!"));
            }
            if (typeof orderStatus !== "string" || !orderStatus.trim()) {
                return next(createHttpError(400, "Please provide order status!"));
            }
            const order = await Order.findByIdAndUpdate(
                id,
                { orderStatus },
                { returnDocument: "after", runValidators: true }
            );
            if (!order) {
                const error = createHttpError(404, "Order not found");
                return next(error);
            }
            res.status(200).json({
                success: true,
                message: "Order updated successfully",
                data: order
            });
    } catch (error){
        next(error);

    }
}

module.exports = { addOrder, getOrderById, getOrders, updateOrder };
