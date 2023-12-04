import db from "../db.js";
import express from "express";

const router = express.Router();

router.get("/material-count/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM materials WHERE matID = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Material not found" });
    }

    return res.status(200).json({ count: results[0].matQty });
  });
});


export default router;