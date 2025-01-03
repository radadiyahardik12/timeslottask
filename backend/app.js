import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./Routes/adminRouter.js";
import bookingRouters from "./Routes/bookingRouters.js";
import timeSlotRoutes from "./Routes/timeSlotRouter.js";
import clientRoutes from "./Routes/clientRouter.js";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT ||  3000;

app.use(bodyParser.json());
const upload = multer();

app.use(upload.any()); 
app.use(cors());

app.use('/api/admin', adminRoutes);
app.use('/api/customer', clientRoutes);
app.use('/api/time', timeSlotRoutes);
app.use('/api/client', bookingRouters);


const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/timeslote", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Database connection error: ", error);
  }
};

start();
