import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import vehicleRouter from "./routes/vehicleRoutes";
import testDriveRouter from "./routes/testDriveRoutes";
import fileUpload from "express-fileupload";


dotenv.config();
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());

app.use(fileUpload({
    useTempFiles:true,
}));

// Routes

app.use("/user",userRouter);
app.use("/vehicle",vehicleRouter);
app.use("/testdrive",testDriveRouter);

// MongoDB connection
mongoose
  .connect(
    `mongodb+srv://rohitsarje17:${process.env.MongoDB_Password}@cluster0.l396bya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started !");
      console.log(`Connected to the port ${5000}`);
    });
  })
  .catch((e) => console.log(e));

