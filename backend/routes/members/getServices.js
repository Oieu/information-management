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

router.get("/service-avail/materials/:genServiceID", (req, res) => {
  const genServiceID = req.params.genServiceID;
  const query =  `
       SELECT  sm.service_materialsID, sm.matID,  s.genServiceName, m.matName, m.matSize
       FROM  service_materials sm 
       INNER JOIN genservices s ON s.genServicesID = sm.serviceID
       INNER JOIN materials m ON sm.matID = m.matID
       WHERE s.genServicesID = ?
     `;

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