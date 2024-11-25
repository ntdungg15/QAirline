// src/services/auth.js
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const authService = {
  register: async (name, email, password, comfirmPassword) => {
    try {
      if (password !== comfirmPassword) {
        throw new Error("Passwords do not match");
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role: "user",
      });
      return userCredential.user;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },

  getUserRole: async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return null;
    } catch (error) {
      console.error("Error getting user role:", error);
      throw error;
    }
  },

  updatePassword: async (newPassword, currentPassword) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Không có người dùng nào đang đăng nhập.");
    }

    // Xác thực mật khẩu hiện tại
    await authService.reauthenticate(user.email, currentPassword);
    await authService.updatePassword(user, newPassword);
  },
};
