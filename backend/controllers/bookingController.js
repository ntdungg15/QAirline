// backend/src/controllers/bookingController.js
import { db } from "../config/firebase.js";
import Booking from "../models/bookingModel.js";

const bookingController = {
  // Tạo đặt vé mới
  createBooking: async (req, res) => {
    try {
      const bookingData = req.body;
      const docRef = await db.collection("bookings").add({
        ...bookingData,
        bookingDate: new Date(),
        status: "pending",
      });
      res.status(201).json({ id: docRef.id, ...bookingData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy danh sách đặt vé của user
  getUserBookings: async (req, res) => {
    try {
      const { userId } = req.params;
      const bookingsSnapshot = await db
        .collection("bookings")
        .where("userId", "==", userId)
        .get();

      const bookings = [];
      bookingsSnapshot.forEach((doc) => {
        bookings.push(new Booking({ id: doc.id, ...doc.data() }));
      });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default bookingController;
