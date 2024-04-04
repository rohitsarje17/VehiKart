import mongoose from "mongoose";

const Schema = mongoose.Schema;

const inspectionSchema = new Schema({
  vehicle: {
    type: mongoose.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  expert: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  inspectionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Inspection", inspectionSchema);
