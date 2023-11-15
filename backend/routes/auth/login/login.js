import express from "express";
import db from "../../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const emailCheck = "SELECT * FROM user WHERE userEmail = ?";

  db.query(emailCheck, [email], (checkError, checkResult) => {
    if (checkError) {
      return res.status(500).json({ Message: "Error from the server side." });
    }

    if (checkResult.length === 0) {
      return res.status(401).json({ errorEmailMessage: "Email not found." });
    }

    const user = checkResult[0];

    bcrypt.compare(password, user.userPassword, (err, response) => {
      if (err) {
        return res
          .status(401)
          .json({ errorPasswordMessage: "Incorrect password." });
      }
      if (response) {
        req.session.user = user;
        req.session.loggedIn = true;
        return res
          .status(200)
          .json({ Message: "Login successful", user: user, loggedIn: true });
      } else {
        return res
          .status(401)
          .json({ errorPasswordMessage: "Incorrect password." });
      }
    });
  });
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    return res
      .status(200)
      .json({ loggedIn: false, Message: "No user is logged in." });
  }
});

export default router;
