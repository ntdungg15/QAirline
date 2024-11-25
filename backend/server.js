// backend/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { admin, db, auth, storage } from "./config/firebase.js";

import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5000", // Địa chỉ của frontend
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
