const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    food_id: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    additives: { type: Array },
    instructions: { type: String, default: "" },
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
