import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes


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

