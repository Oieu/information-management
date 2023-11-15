import express from "express";
import db from "../../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/admin/materials", (req, res) => {
  const query = "SELECT * FROM materials ORDER BY matName";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    }
    return res.status(200).json({ Message: "Query successful", result });
  });
});

router.post("/admin/materials", upload.single("materialImage"), (req, res) => {
  const { name, size, count, quantity, units, color, description } = req.body;
  const materialImagePath = req.file ? req.file.path : null;
  const insertSql =
    "INSERT INTO materials (matName, matSize, matCount, matQty, matUnit, matImageUrl, color, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    size,
    count,
    quantity,
    units,
    materialImagePath,
    color,
    description,
  ];
  db.query(insertSql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    }
    return res
      .status(200)
      .json({ Message: "Query successful", materials: result });
  });
});

router.post("/admin/materials/delete/:id", (req, res) => {
  const id = req.params.id;
  const deleteSql = "DELETE FROM materials WHERE matID = ?";
  db.query(deleteSql, id, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side." });
    }
    return res.status(200).json({ Message: "Material deleted successfully." });
  });
});

export default router;
