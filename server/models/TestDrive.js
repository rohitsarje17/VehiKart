import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicle: {
    type: mongoose.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  requestedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

export default mongoose.model("Booking", bookingSchema);
