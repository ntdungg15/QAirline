import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import { isAuth } from "../middleware/middleware.js";

router.post("/register", userController.register);
router.get("/profile/:id", userController.getUserProfile);
router.get("/inforUser", isAuth, userController.getUserProfile); // Thêm route mới
router.post("/logout", isAuth, userController.logout); // Thêm route đăng xuất
router.put("/update-profile", isAuth, userController.updateUserProfile);

export default router;
