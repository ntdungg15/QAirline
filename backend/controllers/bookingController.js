import { db, admin } from "../config/firebase.js";

import Booking from "../models/bookingModel.js";
import Flight from "../models/flightModel.js";

const bookingController = {
  createBooking: async (req, res) => {
    const bookingRef = db.collection("bookings");
    const flightRef = db.collection("flights");

    try {
      const bookingData = req.body;

      // Kiểm tra chuyến bay trong transaction để đảm bảo concurrent booking
      const bookingResult = await db.runTransaction(async (transaction) => {
        const flightDoc = await transaction.get(
          flightRef.doc(bookingData.flightId)
        );

        if (!flightDoc.exists) {
          throw new Error("Chuyến bay không tồn tại");
        }

        const flight = new Flight({ id: flightDoc.id, ...flightDoc.data() });
        const seatClass = bookingData.seatClass || "economy";
        let availableSeats, seatPrice;

        if (seatClass === "economy") {
          availableSeats = flight.economySeats.available;
          seatPrice = flight.economySeats.price;

          if (availableSeats <= 0) {
            throw new Error("Hết ghế Economy");
          }
        } else if (seatClass === "business") {
          availableSeats = flight.businessSeats.available;
          seatPrice = flight.businessSeats.price;

          if (availableSeats <= 0) {
            throw new Error("Hết ghế Business");
          }
        } else {
          throw new Error("Hạng ghế không hợp lệ");
        }

        if (!bookingData.passengerName || !bookingData.passengerEmail) {
          throw new Error("Vui lòng cung cấp đầy đủ thông tin hành khách");
        }

        const seatNumber = `${seatClass
          .charAt(0)
          .toUpperCase()}${availableSeats}`;

        const newBooking = {
          userId: bookingData.userId,
          flightId: bookingData.flightId,
          passengerName: bookingData.passengerName,
          passengerEmail: bookingData.passengerEmail,
          bookingDate: admin.firestore.Timestamp.now(),
          status: "Active",
          seatNumber: seatNumber,
          cancellationDeadline: admin.firestore.Timestamp.fromDate(
            new Date(Date.now() + 24 * 60 * 60 * 1000)
          ),
          seatClass: seatClass,
          seatPrice: seatPrice,
        };

        // Tạo booking mới
        const newBookingRef = bookingRef.doc();
        transaction.set(newBookingRef, newBooking);

        // Cập nhật số ghế còn trống
        const updateData = {
          [`${seatClass}Seats.available`]: availableSeats - 1,
        };
        transaction.update(flightRef.doc(bookingData.flightId), updateData);

        // Cập nhật mảng bookings của user - sử dụng userId từ bookingData
        transaction.update(db.collection("users").doc(bookingData.userId), {
          bookings: admin.firestore.FieldValue.arrayUnion(newBookingRef.id),
        });

        return { id: newBookingRef.id, ...newBooking };
      });

      res.status(201).json(bookingResult);
    } catch (error) {
      console.error("Detailed booking error:", {
        message: error.message,
        stack: error.stack,
        requestBody: req.body,
        user: req.user,
      });
      res.status(500).json({
        error: error.message || "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      if (!req.user?.uid) {
        return res.status(400).json({ error: "User ID không hợp lệ" });
      }

      const bookingsSnapshot = await db
        .collection("bookings")
        .where("userId", "==", req.user.uid)
        .get();

      const bookings = [];
      for (const doc of bookingsSnapshot.docs) {
        const bookingData = doc.data();

        // Lấy thông tin chuyến bay và tạo đối tượng Flight
        const flightDoc = await db
          .collection("flights")
          .doc(bookingData.flightId)
          .get();
        const flightData = flightDoc.data();
        const flight = new Flight({ id: flightDoc.id, ...flightData });

        // Chuyển đổi Timestamp thành Date string
        const cancellationDeadline =
          bookingData.cancellationDeadline instanceof admin.firestore.Timestamp
            ? bookingData.cancellationDeadline.toDate().toISOString()
            : bookingData.cancellationDeadline;

        bookings.push({
          ...new Booking({
            id: doc.id,
            ...bookingData,
            cancellationDeadline: cancellationDeadline,
          }),
          flightDetails: {
            id: flight.id,
            flightNumber: flight.flightNumber,
            from: flight.from,
            to: flight.to,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            aircraft: flight.aircraft,
            manufacturer: flight.manufacturer,
            status: flight.status,
          },
        });
      }

      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ error: error.message });
    }
  },

  cancelBooking: async (req, res) => {
    const bookingRef = db.collection("bookings");
    const flightRef = db.collection("flights");

    try {
      const { id } = req.params;

      // Sử dụng transaction để đảm bảo tính nhất quán
      await db.runTransaction(async (transaction) => {
        const bookingDoc = await transaction.get(bookingRef.doc(id));

        if (!bookingDoc.exists) {
          throw new Error("Booking không tồn tại");
        }

        const bookingData = bookingDoc.data();

        // Kiểm tra deadline hủy vé
        if (bookingData.cancellationDeadline.toDate() < new Date()) {
          throw new Error("Đã quá hạn hủy vé");
        }

        // Kiểm tra trạng thái booking
        if (bookingData.status === "Cancelled") {
          throw new Error("Booking đã được hủy trước đó");
        }

        // Cập nhật số ghế trống của chuyến bay
        const flightDoc = await transaction.get(
          flightRef.doc(bookingData.flightId)
        );
        const flight = flightDoc.data();

        const seatUpdateField = `${bookingData.seatClass}Seats.available`;
        const currentAvailable =
          flight[`${bookingData.seatClass}Seats`].available;

        transaction.update(flightRef.doc(bookingData.flightId), {
          [seatUpdateField]: currentAvailable + 1,
        });

        // Cập nhật trạng thái booking
        transaction.update(bookingRef.doc(id), {
          status: "Cancelled",
          cancelledAt: admin.firestore.Timestamp.now(),
        });

        // Xóa booking ID khỏi mảng bookings của user
        transaction.update(db.collection("users").doc(bookingData.userId), {
          bookings: admin.firestore.FieldValue.arrayRemove(id),
        });
      });

      res.json({ message: "Hủy booking thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default bookingController;
