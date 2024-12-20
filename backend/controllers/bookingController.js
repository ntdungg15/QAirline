import { db } from "../config/firebase.js";
import Booking from "../models/bookingModel.js";
import Flight from "../models/flightModel.js";

const bookingController = {
  // Tạo đặt vé mới
  createBooking: async (req, res) => {
    try {
      const bookingData = req.body;

      // Kiểm tra chuyến bay
      const flightDoc = await db
        .collection("flights")
        .doc(bookingData.flightId)
        .get();
      if (!flightDoc.exists) {
        return res.status(404).json({ error: "Chuyến bay không tồn tại" });
      }
      const flight = new Flight({ id: flightDoc.id, ...flightDoc.data() });

      // Kiểm tra hạng ghế và số ghế còn trống
      const seatClass = bookingData.seatClass || "economy";
      let availableSeats, seatPrice;

      if (seatClass === "economy") {
        availableSeats = flight.economySeats.available;
        seatPrice = flight.economySeats.price;

        if (availableSeats <= 0) {
          return res.status(400).json({ error: "Hết ghế Economy" });
        }
      } else if (seatClass === "business") {
        availableSeats = flight.businessSeats.available;
        seatPrice = flight.businessSeats.price;

        if (availableSeats <= 0) {
          return res.status(400).json({ error: "Hết ghế Business" });
        }
      } else {
        return res.status(400).json({ error: "Hạng ghế không hợp lệ" });
      }

      // Validate required fields
      if (!bookingData.passengerName || !bookingData.passengerEmail) {
        return res.status(400).json({
          error: "Vui lòng cung cấp đầy đủ thông tin hành khách",
        });
      }

      // Generate seat number (you may want to implement your own logic)
      const seatNumber = `${seatClass
        .charAt(0)
        .toUpperCase()}${availableSeats}`;

      // Tạo booking với đầy đủ thông tin theo model
      const newBooking = {
        userId: req.user.id,
        flightId: bookingData.flightId,
        passengerName: bookingData.passengerName,
        passengerEmail: bookingData.passengerEmail,
        bookingDate: new Date(),
        status: "Active",
        seatNumber: seatNumber,
        cancellationDeadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
        seatClass: seatClass,
        seatPrice: seatPrice,
      };

      const docRef = await db.collection("bookings").add(newBooking);

      // Cập nhật số ghế còn trống của chuyến bay
      const updateData =
        seatClass === "economy"
          ? { "economySeats.available": flight.economySeats.available - 1 }
          : { "businessSeats.available": flight.businessSeats.available - 1 };

      await db
        .collection("flights")
        .doc(bookingData.flightId)
        .update(updateData);

      res.status(201).json({ id: docRef.id, ...newBooking });
    } catch (error) {
      console.error("Booking error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy danh sách đặt vé của user
  getUserBookings: async (req, res) => {
    try {
      const bookingsSnapshot = await db
        .collection("bookings")
        .where("userId", "==", req.user.id)
        .get();

      const bookings = [];
      for (const doc of bookingsSnapshot.docs) {
        const bookingData = doc.data();

        // Lấy thông tin chuyến bay chi tiết
        const flightDoc = await db
          .collection("flights")
          .doc(bookingData.flightId)
          .get();
        const flight = flightDoc.data();

        bookings.push({
          ...new Booking({ id: doc.id, ...bookingData }),
          flightDetails: flight,
        });
      }

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Hủy vé
  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const bookingDoc = await db.collection("bookings").doc(id).get();

      if (!bookingDoc.exists) {
        return res.status(404).json({ error: "Booking không tồn tại" });
      }

      const bookingData = bookingDoc.data();

      // Get flight data before updating seats
      const flightDoc = await db
        .collection("flights")
        .doc(bookingData.flightId)
        .get();
      const flight = flightDoc.data();

      // Define the reference and update field correctly
      const flightRef = db.collection("flights").doc(bookingData.flightId);
      const seatUpdateField =
        bookingData.seatClass === "business"
          ? "businessSeats.available"
          : "economySeats.available";

      await flightRef.update({
        [seatUpdateField]: seatUpdateValue,
      });

      res.json({ message: "Hủy booking thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default bookingController;
