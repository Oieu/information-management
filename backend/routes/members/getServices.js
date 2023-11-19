import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/service-avail", (req, res) => {
  const query = "SELECT * FROM genservices";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }
    return res.status(200).json(results);
  });
});

router.get("/service-avail/:genServiceID", (req, res) => {
  const genServiceID = req.params.genServiceID;
  const query = "SELECT * FROM genservices WHERE genServicesID = ?";

  db.query(query, [genServiceID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    return res.status(200).json(results);
  });
});

export default router;