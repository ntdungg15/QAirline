// backend/src/routes/bookingRoutes.js
import express from "express";
const router = express.Router();
import bookingController from "../controllers/bookingController.js";
import { isAuth } from "../middleware/auth.js";

router.post("/bookings", isAuth, bookingController.createBooking);
router.get("/bookings/user/:userId", isAuth, bookingController.getUserBookings);

export default router;
