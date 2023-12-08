import express from "express";
import { upload } from "../../multerConfig.js";
import db from '../../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const saltRounds = process.env.SALT_ROUNDS || 10;

router.post("/signup", upload.single("profilePicture"), (req, res) => {
  const { email, password, userName, number } = req.body;
  const profilePicturePath = req.file ? req.file.path : null;

  const emailCheck = "SELECT * FROM user WHERE userEmail = ?";

  db.query(emailCheck, [email], (checkError, checkResult) => {
    if (checkError) {
      console.error("Error from the server side:", checkError);
      return res.status(500).json({ Message: "Error from the server side." });
    }

    if (checkResult.length > 0) {
      return res
        .status(500)
        .json({ Message: "Email already exists in the database" });
    }

    const insertSql =
      "INSERT INTO user (userEmail, userPassword, userName, profilePicture, userNumber) VALUES (?, ?, ?, ?, ?)";

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error from the server side:", checkError);
        return res.status(500).json({ Message: "Error on the server side!" });
      }

      const values = [email, hash, userName, profilePicturePath, number];
      
      db.query(insertSql, values, (err, insertResult) => {
        if (err) {
          console.error("Error from the server side:", err);
          return res.status(500).json({ Message: "Error on the server side!" });
        }
        return res
          .status(200)
          .json({
            Message: "User registration successful",
            user: insertResult,
          });
      });
    });
  });
});

export default router;
