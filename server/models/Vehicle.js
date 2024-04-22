import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    predictedPrice: {
      type: Number,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String, 
      required: true,
    },
    photos: [String],
    reviews: {
      type:String,
      default:null,
    },
    isInspected: {
      type: Boolean,
      default: false,
    },
    inspectedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  });
  
export default mongoose.model("Vehicle", vehicleSchema);
