import { db } from "../config/firebase.js";
import Aircraft from "../models/aircraftModel.js";

const aircraftController = {
  // Thêm thông tin tàu bay
  addAircraft: async (req, res) => {
    try {
      const aircraftData = req.body;
      const docRef = await db.collection("aircrafts").add(aircraftData);

      res.status(201).json({
        id: docRef.id,
        ...aircraftData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy danh sách tàu bay
  getAircrafts: async (req, res) => {
    try {
      const aircraftsSnapshot = await db.collection("aircrafts").get();
      const aircrafts = [];

      aircraftsSnapshot.forEach((doc) => {
        aircrafts.push(new Aircraft({ id: doc.id, ...doc.data() }));
      });

      res.json(aircrafts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cập nhật thông tin tàu bay
  updateAircraft: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      await db.collection("aircrafts").doc(id).update(updateData);

      res.json({ id, ...updateData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Xóa tàu bay
  deleteAircraft: async (req, res) => {
    try {
      const { id } = req.params;

      await db.collection("aircrafts").doc(id).delete();

      res.json({ message: "Aircraft deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default aircraftController;
