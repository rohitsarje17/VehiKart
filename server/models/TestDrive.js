import mongoose from "mongoose";

const Schema = mongoose.Schema;

const testDriveSchema = new Schema({
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
    enum: ["Pending", "Confirmed", "Completed"],
    default: "Pending",
  },
});

export default mongoose.model("TestDrive", testDriveSchema);
