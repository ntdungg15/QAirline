import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const ticketService = {
  // Đặt vé mới
  async bookTicket(ticketData) {
    try {
      const ticketsRef = collection(db, "tickets");
      const newTicket = await addDoc(ticketsRef, {
        ...ticketData,
        status: "booked",
        createdAt: new Date(),
      });
      return newTicket.id;
    } catch (error) {
      throw new Error("Error booking ticket: " + error.message);
    }
  },

  // Hủy vé
  async cancelTicket(ticketId) {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, {
        status: "cancelled",
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error("Error cancelling ticket: " + error.message);
    }
  },

  // Lấy danh sách vé của user
  async getUserTickets(userId) {
    try {
      const ticketsRef = collection(db, "tickets");
      const q = query(ticketsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error("Error fetching user tickets: " + error.message);
    }
  },

  // Admin: Cập nhật thông tin vé
  async updateTicket(ticketId, updateData) {
    try {
      const ticketRef = doc(db, "tickets", ticketId);
      await updateDoc(ticketRef, {
        ...updateData,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error("Error updating ticket: " + error.message);
    }
  },
};
