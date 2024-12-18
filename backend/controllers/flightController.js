// backend/src/controllers/flightController.js
import { db } from "../config/firebase.js";
import Flight from "../models/flightModel.js";

const flightController = {
  // Tìm kiếm chuyến bay
  searchFlights: async (req, res) => {
    try {
      const { from, to, departureDate } = req.query;
      let query = db.collection("flights");

      if (from) query = query.where("from", "==", from);
      if (to) query = query.where("to", "==", to);
      if (departureDate) {
        const start = new Date(departureDate);
        const end = new Date(departureDate);
        end.setDate(end.getDate() + 1);
        query = query
          .where("departureTime", ">=", start)
          .where("departureTime", "<", end);
      }

      const flightsSnapshot = await query.get();
      const flights = [];
      flightsSnapshot.forEach((doc) => {
        const flightData = doc.data();
        flights.push(new Flight({ id: doc.id, ...flightData }));
      });

      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy danh sách chuyến bay
  getAllFlights: async (req, res) => {
    try {
      console.log("User in request:", req.user); // Kiểm tra user được truyền vào
      const flightsSnapshot = await db.collection("flights").get();
      const flights = [];
      flightsSnapshot.forEach((doc) => {
        const flightData = doc.data();

        // Chuyển đổi timestamp nếu cần
        if (flightData.departureTime && flightData.departureTime.toDate) {
          flightData.departureTime = flightData.departureTime.toDate();
        }
        if (flightData.arrivalTime && flightData.arrivalTime.toDate) {
          flightData.arrivalTime = flightData.arrivalTime.toDate();
        }

        flights.push(new Flight({ id: doc.id, ...flightData }));
      });
      res.json(flights);
    } catch (error) {
      console.error("Error in getAllFlights:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Thêm chuyến bay mới (chỉ admin)
  addFlight: async (req, res) => {
    try {
      const flightData = {
        ...req.body,
        economySeats: {
          total: req.body.economySeatsTotal || 0,
          available: req.body.economySeatsTotal || 0,
          price: req.body.economySeatsPrice || 0,
        },
        businessSeats: {
          total: req.body.businessSeatsTotal || 0,
          available: req.body.businessSeatsTotal || 0,
          price: req.body.businessSeatsPrice || 0,
        },
      };

      const docRef = await db.collection("flights").add(flightData);
      res.status(201).json({ id: docRef.id, ...flightData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cập nhật thông tin chuyến bay (chỉ admin)
  updateFlight: async (req, res) => {
    try {
      const { id } = req.params;
      const flightData = req.body;
      await db.collection("flights").doc(id).update(flightData);
      res.json({ id, ...flightData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Xóa chuyến bay (chỉ admin)
  deleteFlight: async (req, res) => {
    try {
      const { id } = req.params;

      // Kiểm tra xem chuyến bay có tồn tại không trước khi xóa
      const flightDoc = await db.collection("flights").doc(id).get();
      if (!flightDoc.exists) {
        return res.status(404).json({ error: "Chuyến bay không tồn tại" });
      }

      // Xóa chuyến bay
      await db.collection("flights").doc(id).delete();

      res.json({
        message: "Chuyến bay đã được xóa thành công",
        id,
      });
    } catch (error) {
      console.error("Error in deleteFlight:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Chức năng delay chuyến bay
  delayFlight: async (req, res) => {
    try {
      const { id } = req.params;
      const { delayTime } = req.body;

      const flightDoc = await db.collection("flights").doc(id).get();
      if (!flightDoc.exists) {
        return res.status(404).json({ error: "Chuyến bay không tồn tại" });
      }

      const flightData = flightDoc.data();
      const newDepartureTime = new Date(
        flightData.departureTime.toDate().getTime() + delayTime * 60000
      );
      const newArrivalTime = new Date(
        flightData.arrivalTime.toDate().getTime() + delayTime * 60000
      );

      await db
        .collection("flights")
        .doc(id)
        .update({
          departureTime: newDepartureTime,
          arrivalTime: newArrivalTime,
          status: `Delayed by ${delayTime} minutes`,
        });

      res.json({ message: "Cập nhật chuyến bay thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default flightController;
