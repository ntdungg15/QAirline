// backend/src/middleware/auth.js
import { admin } from "../config/firebase.js";

const isAuth = async (req, res, next) => {
  try {
    console.log("Headers:", req.headers); // Log toàn bộ headers
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      console.log("No token found in request");
      return res.status(401).json({ error: "No token provided" });
    }

    console.log("Token received:", token); // Log token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded token:", decodedToken); // Log decoded token
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Detailed auth error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    await isAuth(req, res, async () => {
      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(req.user.uid)
        .get();

      if (userDoc.data()?.role === "admin") {
        next();
      } else {
        res.status(403).json({ error: "Access denied" });
      }
    });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export { isAuth, isAdmin };
