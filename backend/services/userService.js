// src/services/userService.js
import { db } from "../config/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

const USERS_COLLECTION = "users";

export const userService = {
  createUser: async (uid, userData) => {
    try {
      await setDoc(doc(db, USERS_COLLECTION, uid), userData);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  getUserById: async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, USERS_COLLECTION, uid));
      if (userDoc.exists()) {
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
      await deleteDoc(doc(db, USERS_COLLECTION, uid));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};
