// backend/src/routes/bookingRoutes.js
// import express from "express";
// const router = express.Router();
// import bookingController from "../controllers/bookingController.js";
// import { isAuth } from "../middleware/auth.js";

// router.post("/bookings", isAuth, bookingController.createBooking);
// router.get("/bookings/user/:userId", isAuth, bookingController.getUserBookings);

// export default router;

import express from "express";
const router = express.Router();
import bookingController from "../controllers/bookingController.js";
import { isAuth } from "../middleware/auth.js";

// Đặt vé mới
router.post("/bookings", isAuth, bookingController.createBooking);

// Lấy danh sách booking của user
router.get("/bookings", isAuth, bookingController.getUserBookings);

// Hủy booking
router.put("/bookings/:id/cancel", isAuth, bookingController.cancelBooking);

export default router;
