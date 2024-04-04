const vehicleSchema = new Schema({
    brand: {
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
    photos: [String],
    reviews: {
      type:String,
      default:null,
    },
    isInspected: {
      type: Boolean,
      default: false,
    },
  });
  