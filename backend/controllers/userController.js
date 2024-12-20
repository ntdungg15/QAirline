import { db } from "../config/firebase.js";
import User from "../models/userModel.js";
import { userService } from "../services/userService.js";

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
      const userId = req.user.uid;
      const user = await userService.getUserById(userId); // Sửa thành userService.getUserById

      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }

      delete user.password;
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cập nhật thông tin người dùng
  updateUserProfile: async (req, res) => {
    try {
      const userId = req.user.uid;
      const { username, email } = req.body;

      // Kiểm tra email đã tồn tại (nếu email thay đổi)
      if (email) {
        const existingUser = await db
          .collection("users")
          .where("email", "==", email)
          .where("id", "!=", userId)
          .get();

        if (!existingUser.empty) {
          return res.status(400).json({ error: "Email đã được sử dụng" });
        }
      }

      // Cập nhật thông tin người dùng
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;

      await db.collection("users").doc(userId).update(updateData);

      // Lấy thông tin người dùng sau khi cập nhật
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.password;

      res.json({
        message: "Cập nhật thông tin thành công",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Đăng xuất người dùng
  logout: async (req, res) => {
    try {
      await authService.logout();
      res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Thêm booking vào user
  addBookingToUser: async (userId, bookingId) => {
    try {
      await db
        .collection("users")
        .doc(userId)
        .update({
          bookings: admin.firestore.FieldValue.arrayUnion(bookingId),
        });
      return true;
    } catch (error) {
      console.error("Error adding booking to user:", error);
      return false;
    }
  },

  // Xóa booking khỏi user
  removeBookingFromUser: async (userId, bookingId) => {
    try {
      await db
        .collection("users")
        .doc(userId)
        .update({
          bookings: admin.firestore.FieldValue.arrayRemove(bookingId),
        });
      return true;
    } catch (error) {
      console.error("Error removing booking from user:", error);
      return false;
    }
  },
};

export default userController;
