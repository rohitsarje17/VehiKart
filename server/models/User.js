import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isExpert: {
    type: Boolean,
    default: false,
  },
  addedVehicles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
  testDriveBookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TestDrive",
    },
  ],
  inspections: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Inspection",
    },
  ],
});

export default mongoose.model("User", userSchema);
