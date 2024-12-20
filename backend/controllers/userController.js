import { db } from "../config/firebase.js";
import User from "../models/userModel.js";

const userController = {
  // Đăng ký người dùng
  register: async (req, res) => {
    try {
      const { username, email, password, firebaseUid } = req.body;

      // Kiểm tra email đã tồn tại
      const existingUser = await db
        .collection("users")
        .where("email", "==", email)
        .get();

      if (!existingUser.empty) {
        return res.status(400).json({ error: "Email đã được đăng ký" });
      }

      // Tạo user mới
      const userData = {
        username,
        email,
        password,
        role: "user",
        bookings: [],
      };

      await db.collection("users").doc(firebaseUid).set(userData);

      res.status(201).json({
        id: firebaseUid,
        username,
        email,
        role: userData.role,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy thông tin người dùng
  getUserProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }

      const userData = userDoc.data();
      delete userData.password; // Loại bỏ thông tin mật khẩu

      res.json(new User({ id: userDoc.id, ...userData }));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
