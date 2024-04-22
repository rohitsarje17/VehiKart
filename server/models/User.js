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
  phoneNumber:{
     required:true,
     type:String,
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
  requestedTestDrives: [
    {
      type: mongoose.Types.ObjectId,
      ref: "TestDrive",
    },
  ],
  inspectedVehicles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
});

export default mongoose.model("User", userSchema);
