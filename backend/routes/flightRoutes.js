// // backend/src/routes/flightRoutes.js
// import express from "express";
// const router = express.Router();
// import flightController from "../controllers/flightController.js";
// import { isAdmin } from "../middleware/auth.js";

// router.get("/flights", flightController.getAllFlights);
// router.post("/flights", isAdmin, flightController.addFlight);
// router.put("/flights/:id", isAdmin, flightController.updateFlight);
// router.delete("/flights/:id", isAdmin, flightController.deleteFlight);

// export default router;

import express from "express";
const router = express.Router();
import flightController from "../controllers/flightController.js";
import { isAdmin, isAuth } from "../middleware/middleware.js";

// Tìm kiếm chuyến bay (cho tất cả user)
router.get("/flights/search", isAuth, flightController.searchFlights);

// Các route cũ
router.get("/flights", flightController.getAllFlights);
router.post("/flights", isAdmin, flightController.addFlight);
router.put("/flights/:id", isAdmin, flightController.updateFlight);
router.delete("/flights/:id", isAdmin, flightController.deleteFlight);

// Route mới cho delay chuyến bay
router.put("/flights/:id/delay", isAdmin, flightController.delayFlight);

export default router;
