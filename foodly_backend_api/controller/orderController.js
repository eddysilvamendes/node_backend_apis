const Order = require("../models/Orders");

module.exports = {
  placeOrder: async (request, response) => {
    const order = new Order(request.body);
    try {
      await order.save();
      response
        .status(201)
        .json({ status: true, message: "Order placed successfully" });
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getOrderDetails: async (request, response) => {
    const order_id = request.params.id;
    try {
      const order = await Order.findById(order_id)
        .populate({
          path: "user_id",
          select: "name email phone",
        })
        .populate({
          path: "delivery_address_id",
          select: "address_line_1 city state postal_code",
        })
        .populate({
          path: "restaurant_id",
          select: "name location",
        })
        .populate({
          path: "driver_id",
          select: "name phone",
        });
      if (order) {
        response.status(200).json(order);
      } else {
        response
          .status(404)
          .json({ status: false, message: "Order not found!" });
      }
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  getUserOrder: async (request, response) => {
    const user_id = request.user.id;

    try {
      const orders = await Order.find({
        user_id,
      })
        .populate({
          path: "restaurant_id",
          select: "name location",
        })
        .populate({
          path: "driver_id",
          select: "name phone",
        });
      if (orders) {
        response.status(200).json(orders);
      } else {
        response
          .status(404)
          .json({ status: false, message: "Order not found" });
      }
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  rateOrders: async (request, response) => {
    const order_id = request.params.id;
    const { rating, feedback } = request.body;
    try {
      const updated_order = await Order.findByIdAndUpdate(
        order_id,
        { rating, feedback },
        { new: true }
      );
      if (updated_order) {
        response
          .status(200)
          .json({ status: true, message: "Order rating successfully placed!" });
      } else {
        response
          .status(404)
          .json({ status: false, message: "Order not found!" });
      }
    } catch (error) {
      response.status(500).json({ status: false, message: error.message });
    }
  },
  updateOrderStatus: async (request, response) => {},
  updatePaymentStatus: async (request, response) => {},
};
