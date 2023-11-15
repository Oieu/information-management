import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/profile", (req, res) => {
  if (req.session.user) {
    const id = req.session.user.userID;
    const userCheck = "SELECT * FROM user WHERE userID = ?";

    db.query(userCheck, id, (err, result) => {
      if (err) {
        return res.status(401).json({ Message: "Error on the server side" });
      }
      if (result.length === 0) {
        return res.status(401).json({ Message: "Email was not found" });
      }

      const user = result[0];

      if (user) {
        return res
          .status(200)
          .json({
            loggedIn: req.session.loggedIn,
            Message: "User was found",
            user: user,
          });
      } else {
        return res.status(401).json({ Message: "Error on the server side" });
      }
    });
  } else {
    return res.status(401).json({ Message: "No user is logged in." });
  }
});

export default router;
