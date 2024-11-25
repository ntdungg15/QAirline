// backend/src/routes/flightRoutes.js
import express from "express";
const router = express.Router();
import flightController from "../controllers/flightController.js";
import { isAdmin } from "../middleware/auth.js";

router.get("/flights", flightController.getAllFlights);
router.post("/flights", isAdmin, flightController.addFlight);
router.put("/flights/:id", isAdmin, flightController.updateFlight);

export default router;
