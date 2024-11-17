import express from "express";
// import mongoose from "mongoose";
// const cors = require("cors");
import connectDB from "./config/db.js";
import booking from "./routes/booking.js";

// require("dotenv").config();

const app = express();
// app.use(cors());
// app.use(express.json());

// Kết nối đến MongoDB
connectDB();
// Sử dụng routes
app.use("/booking", booking);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
