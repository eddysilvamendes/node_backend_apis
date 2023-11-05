const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
    additives: { type: [] },
    instructions: { type: String, default: "" },
    quantity: { type: Number, default: 1 },
    total_price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
