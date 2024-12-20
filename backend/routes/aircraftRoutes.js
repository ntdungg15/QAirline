import express from "express";
import aircraftController from "../controllers/aircraftController.js";

const router = express.Router();

router.post("/aircrafts", aircraftController.addAircraft);
router.get("/aircrafts", aircraftController.getAircrafts);
router.put("/aircrafts/:id", aircraftController.updateAircraft);
router.delete("/aircrafts/:id", aircraftController.deleteAircraft);

export default router;
