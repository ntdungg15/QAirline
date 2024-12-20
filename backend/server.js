import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  admin,
  db,
  auth,
  storage as firebaseStorage,
} from "./config/firebase.js"; // Đổi tên biến storage thành firebaseStorage
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import aircraftRoutes from "./routes/aircraftRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js"; // Đổi require thành import
import multer from "multer";
import path from "path"; // Đừng quên import path nếu bạn sử dụng path.extname
import { isAuth } from "./middleware/middleware.js";

dotenv.config();
connectDB();
const app = express();

// Cấu hình multer để lưu trữ ảnh
const multerStorage = multer.diskStorage({
  // Đổi tên thành multerStorage
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Lưu ảnh vào thư mục 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên tệp là thời gian hiện tại + đuôi mở rộng của ảnh
  },
});

// Tạo instance multer với cấu hình multerStorage
const upload = multer({ storage: multerStorage });

// Route cho upload ảnh
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).json({
    message: "Image uploaded successfully",
    imageUrl: `/uploads/${req.file.filename}`, // Đường dẫn ảnh để lưu vào cơ sở dữ liệu
  });
});

// Middleware------------------------------------------------------------
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
// Sử dụng middleware xác thực

// Routes
app.use("/api", flightRoutes);
app.use("/api", bookingRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", aircraftRoutes);
app.use("/api/users", userRoutes);
// app.use('/upload', upload.single('image'));

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.setMaxListeners(20);
