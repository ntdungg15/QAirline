import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ROUTER SUCCESS");
});

export default router;
