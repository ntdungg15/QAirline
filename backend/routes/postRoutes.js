import express from "express";
import { handlePostInformation } from "../controllers/postController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Route xử lý POST request từ frontend
router.post("/", upload.single("file"), handlePostInformation);

export default router;
