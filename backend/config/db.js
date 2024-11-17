// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:ad123456@qairline.e5anb.mongodb.net/flightSchema?retryWrites=true&w=majority&appName=QAirline",
      {}
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  }
};

export default connectDB;
