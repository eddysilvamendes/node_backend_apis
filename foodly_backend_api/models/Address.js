const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    address_line_1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    postal_code: { type: String, required: true },
    default: { type: Boolean, default: true },
    country: { type: String, required: true },
    delivery_instructions: { type: String },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Address", AddressSchema);
