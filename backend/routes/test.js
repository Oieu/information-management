import express from "express";
import * as pdfjsLib from "pdfjs-dist";
import db from "./db.js";
import path from "path";

const router = express.Router();
const app = express();

app.use("/uploads", express.static("uploads"));

async function checkFileExtension(url) {
  const fileExtension = path.extname(url);
  let num = 0;

  switch (fileExtension) {
    case ".pdf":
      return (num = await getPdfPageCount(url));
    case `${[".jpg", ".jpeg", ".png", ".webp"]}`:
      return 1;
    default:
      return "invalid";
  }
}

async function getPdfPageCount(pdfUrl) {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdfDocument = await loadingTask.promise;

  return pdfDocument.numPages;
}

//TEST STUFF
router.get("/test", (req, res) => {
  if (req.cookies["name"]) {
    console.log('Cookie with key "name" exists');
    res.send("Cookie Exists");
  } else {
    console.log('Cookie with key "name" does not exist');
  }
});
router.get("/test-sql", (req, res) => {
  const query = "SELECT * FROM user";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    }
    return res.status(200).json({ Message: "Query successful", result });
  });
});
router.get("/test-get", (req, res) => {
  const testValue = req.session.testVariable || "No session data found";
  const loggedIn =
    req.session.user.userPassword != undefined
      ? req.session.user.userPassword
      : null;
  res.send(`Session variable value: ${testValue}, Logged In: `);
});

router.get("/test-file", async (req, res) => {
  try {
    const numPages = await checkFileExtension(
      "http://localhost:5000/uploads/report.pdf"
    );
    return res.status(200).send({ PageCount: numPages });
  } catch (err) {
    res.status(500).send("Error reading the PDF file: " + err);
  }
});

export default router;
