// src/services/userService.js
import { db } from "../config/firebase.js"; // Thêm .js vào

const USERS_COLLECTION = "users";

export const userService = {
  createUser: async (uid, userData) => {
    try {
      await db.collection(USERS_COLLECTION).doc(uid).set(userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  getUserById: async (uid) => {
    try {
      const userDoc = await db.collection(USERS_COLLECTION).doc(uid).get();

      if (userDoc.exists) {
        return { id: userDoc.id, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  },

  deleteUser: async (uid) => {
    try {
      await db.collection(USERS_COLLECTION).doc(uid).delete();
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
