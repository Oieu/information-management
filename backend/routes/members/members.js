import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    return res.status(200).json({ loggedIn: false });
  }
});

export default router;
