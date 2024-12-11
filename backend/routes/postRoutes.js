import express from "express";
import upload from "../middleware/upload.js";
import Image from "../database/image.js";
import connectDB from "../database/db.js"; 
const router = express.Router();

// API đăng ảnh
router.post("/upload", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;

  try {
    // Lưu thông tin ảnh vào MongoDB
    const imageUrl = `/uploads/${req.file.filename}`;
    const newImage = new Image({
      title,
      description,
      imageUrl,
    });
    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image." });
  }
});

export default router;
