import express from "express";
import db from "../../db.js";
import bcrypt from "bcrypt";
import Mailjet from "node-mailjet";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.post("/api/reset", (req, res) => {
  const { email } = req.body;
  const checkSql = "SELECT * FROM user WHERE userEmail = ?";

  db.query(checkSql, email, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Server error", error: err });
    } else if (result.length === 0) {
      return res.status(400).json({ message: "Email does not exist" });
    } else {
      const user = result[0];
      const otp = Math.floor(100000 + Math.random() * 900000);
      const resetLink = "http://localhost:5173/reset/";
      const now = new Date();
      const philippinesTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Manila" })
      );
      philippinesTime.setMinutes(philippinesTime.getMinutes() + 5);

      const checkOtpTable = "SELECT * FROM otp_reset WHERE userID = ?";
      db.query(checkOtpTable, user.userID, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Server error", error: err });
        } else if (result.length > 0) {
          const updateSql =
            "UPDATE otp_reset SET otp = ?, expiry = ?, status = ? WHERE userID = ?";

          db.query(
            updateSql,
            [otp, philippinesTime, 1, user.userID],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Server error", error: err });
              } else {
                const mailjetClient = new Mailjet({
                  apiKey: process.env.MAILJET_PUBLIC_KEY,
                  apiSecret: process.env.MAILJET_SECRET_KEY,
                });
                console.log(user.userEmail);
                const request = mailjetClient
                  .post("send", { version: "v3.1" })
                  .request({
                    Messages: [
                      {
                        From: {
                          Email: process.env.EMAIL_OFFICIAL_QIR,
                          Name: "Quick Ink Reserve",
                        },
                        To: [
                          {
                            Email: user.userEmail,
                            Name: user.userName,
                          },
                        ],
                        Subject: "OTP Password Reset",
                        TextPart:
                          "Dear user, here is an otp for you to reset your password.",
                        HTMLPart:
                          "<h3>Dear user,</h3><br />Here is an otp for you to reset your password.<br /><br /><h1>" +
                          otp +
                          "<br />" +
                          "<br />" +
                          "Here is the link to reset your password: " +
                          resetLink +
                          "</h1>",
                      },
                    ],
                  });
                request
                  .then((result) => {
                    console.log(result.body);
                  })
                  .catch((err) => {
                    console.log(err.statusCode);
                  });

                return res.status(200).json({
                  message: "OTP has been sent!",
                  result: result,
                });
              }
            }
          );
        } else {
          const insertSql =
            "INSERT INTO otp_reset (userID, otp, expiry) VALUES (?, ?, ?)";

          db.query(
            insertSql,
            [user.userID, otp, philippinesTime],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: "Server error", error: err });
              } else {
                const mailjetClient = new Mailjet({
                  apiKey: process.env.MAILJET_PUBLIC_KEY,
                  apiSecret: process.env.MAILJET_SECRET_KEY,
                });
                const request = mailjetClient
                  .post("send", { version: "v3.1" })
                  .request({
                    Messages: [
                      {
                        From: {
                          Email: process.env.EMAIL_OFFICIAL_QIR,
                          Name: "Quick Ink Reserve",
                        },
                        To: [
                          {
                            Email: user.userEmail,
                            Name: user.userName,
                          },
                        ],
                        Subject: "OTP Password Reset",
                        TextPart:
                          "Dear user, here is an otp for you to reset your password.",
                        HTMLPart:
                          "<h3>Dear user,</h3><br />Here is an otp for you to reset your password.<br /><br /><h1>" +
                          otp +
                          "</h1>",
                      },
                    ],
                  });
                request
                  .then((result) => {
                    console.log(result.body);
                  })
                  .catch((err) => {
                    console.log(err.statusCode);
                  });

                return res.status(200).json({
                  message: "OTP has been sent!",
                  result: result,
                });
              }
            }
          );
        }
      });
    }
  });
});

router.get("/api/reset-password/:email", (req, res) => {
  const { email } = req.params;

  try {
    const sql = "SELECT * FROM user WHERE userEmail = ?";

    db.query(sql, email, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Server error" });
      } else if (result.length === 0) {
        res.status(400).json({ message: "Email does not exist" });
      } else {
        const user = result[0];
        const checkOtpTable = "SELECT * FROM otp_reset WHERE userID = ?";

        db.query(checkOtpTable, user.userID, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Server error" });
          } else if (result.length === 0) {
            res.status(400).json({ message: "No OTP found" });
          } else {
            const otp = result[0];
            const expiry = new Date(otp.expiry);
            const philippinesTime = expiry.toLocaleString("en-US", {
              timeZone: "Asia/Manila",
            });
            const now = new Date().toLocaleString("en-US", {
              timeZone: "Asia/Manila",
            });

            console.log(
              philippinesTime,
              now,
              new Date(now) > new Date(philippinesTime)
            );
            if (new Date(now) > new Date(philippinesTime)) {
              console.log("OTP has expired");

              return res.status(400).json({ message: "OTP has expired" });
            } else {
              console.log("OTP has not expired");

              return res.status(200).json({ message: "OTP is available" });
            }
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

router.post("/api/reset-password/:email", (req, res) => {
  const { email } = req.params;
  const { otp } = req.body;
  console.log(email, otp);

  try {
    const sql = "SELECT * FROM user WHERE userEmail = ?";

    db.query(sql, email, (err, result) => {
      if (err) {
        res.status(500).json({ message: "Server error" });
      } else if (result.length === 0) {
        res.status(400).json({ message: "Email does not exist" });
      } else {
        const user = result[0];
        const checkOtpTable = "SELECT * FROM otp_reset WHERE userID = ?";

        db.query(checkOtpTable, user.userID, (err, result) => {
          if (err) {
            res.status(500).json({ message: "Server error" });
          } else if (result.length === 0) {
            res.status(400).json({ message: "No OTP found" });
          } else {
            const otpData = result[0];
            const expiry = new Date(otp.expiry);
            const philippinesTime = expiry.toLocaleString("en-US", {
              timeZone: "Asia/Manila",
            });
            const now = new Date().toLocaleString("en-US", {
              timeZone: "Asia/Manila",
            });

            if (new Date(now) > new Date(philippinesTime)) {
              console.log("OTP has expired");

              return res.status(400).json({ message: "OTP has expired" });
            } else {
              if (otpData.otp !== otp)
                return res.status(400).json({ message: "OTP is incorrect" });
              else {
                const sql = "UPDATE otp_reset SET status = ? WHERE userID = ?";

                db.query(sql, [0, user.userID], (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  } else {
                    console.log("Status has been set to inactive!");
                    return res
                      .status(200)
                      .json({ message: "Correct OTP. Change your password!" });
                  }
                });
              }
            }
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

router.post("/api/reset-password/user/:email", (req, res) => {
  const { email } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  } else {
    const checkEmail = "SELECT * FROM user WHERE userEmail = ?";

    db.query(checkEmail, email, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      } else if (result.length === 0) {
        res.status(400).json({ message: "Email does not exist" });
      } else {
        const user = result[0];
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const updatePassword =
          "UPDATE user SET userPassword = ? WHERE userID = ?";

        db.query(
          updatePassword,
          [hashedPassword, user.userID],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: "Server error" });
            } else {
              const updateOtpStatus =
                "UPDATE otp_reset SET status = ? WHERE userID = ?";

              db.query(updateOtpStatus, [0, user.userID], (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ message: "Server error" });
                } else {
                  return res
                    .status(200)
                    .json({ message: "Password has been updated" });
                }
              });
            }
          }
        );
      }
    });
  }
});

export default router;
