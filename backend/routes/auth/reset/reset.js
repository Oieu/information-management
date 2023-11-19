import express from "express";

const router = express.Router();

router.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  const resetToken = crypto.randomBytes(32).toString("hex");

  req.session.resetToken = resetToken;

  const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
  sendResetEmail(email, resetLink);

  res.status(200).json({ message: "Reset link sent to email.", email: email });
});

router.get("/api/reset-password", (req, res) => {
  const { resetToken } = req.session;

  if (resetToken !== undefined) {
    res.status(200).json({ message: "Token verified." });
  } else {
    res.status(401).json({ message: "Token invalid." });
  }
});

function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_OFFICIAL_QIR,
      pass: process.env.PASSWORD_OFFICIAL_QIR,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const htmlElement = () => {
    return `<p>Click the following link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`;
  };

  const mailOptions = {
    from: process.env.EMAIL_OFFICIAL_QIR,
    to: email,
    subject: "Reset your password",
    html: htmlElement(),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default router;
