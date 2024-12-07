// backend/src/controllers/flightController.js
import { db } from "../config/firebase.js";
import Flight from "../models/flightModel.js";

const flightController = {
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
      const flightData = req.body;
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
};

export default flightController;