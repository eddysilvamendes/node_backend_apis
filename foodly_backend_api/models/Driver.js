const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vehicle_type: {
      type: String,
      required: true,
      enum: ["Bike", "Scooter", "Car"],
    },
    vehicle_number: { type: String, required: true },
    current_location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      latitudeDelta: { type: Number, default: 0.0122, required: true },
      longitudeDelta: { type: Number, required: true, default: 0.0221 },
    },
    is_available: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    total_delivery: { type: Number, default: 0 },
    profile_image: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", DriverSchema);
