import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { admin, db, auth, storage } from "./config/firebase.js";

import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import postRoutes from "./routes/postRoutes.js"; 

import connectDB from "./database/db.js"; 

dotenv.config(); 
connectDB();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5000", 
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json()); 


app.use("/uploads", express.static("uploads")); 

// Routes
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);
app.use("/api/posts", postRoutes); 


app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.setMaxListeners(15);