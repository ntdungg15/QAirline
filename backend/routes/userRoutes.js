import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import { isAuth } from "../middleware/auth.js";

router.post("/register", userController.register);
router.get("/profile/:id", isAuth, userController.getUserProfile);

export default router;
