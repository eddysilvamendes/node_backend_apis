const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  food_id: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  additives: { type: Array },
  instructions: { type: String, default: "" },
});

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    order_item: [OrderItemSchema],
    order_total: { type: Number, required: true },
    delivery_fee: { type: Number, required: true },
    grand_total: { type: Number, required: true },
    delivery_address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    payment_method: { type: String },
    payment_status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Completed", "Faild"],
    },
    order_status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Preparing", "Out for delivery", "Delivery"],
    },
    order_date: { type: Date, default: Date.now },
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    driver_id: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    rating: { type: Number, min: 1, max: 5 },
    feedback: { type: String },
    promo_code: { type: String },
    discount_amount: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
