import multer from "multer";
import path from "path";

// Cấu hình nơi lưu trữ tệp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Thư mục lưu trữ tệp
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Bộ lọc loại file hợp lệ
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ cho phép file ảnh (.png, .jpg)"), false);
    }
};

// Middleware upload với multer
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
