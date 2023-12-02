import express from "express";
import db from "../../db.js";

const router = express.Router();

router.get("/admin/service-materials", (req, res) => {
    const query = "SELECT * FROM `service_materials`";
    db.query(query, (err, result) => {
        if (err) {
        return res.status(500).json({ Message: "Error on the server side!" });
        }
        return res.status(200).json({ Message: "Query successful", result });
    });
});

router.get("/admin/service-materials/:id", (req, res) => {
    const query = "SELECT * FROM `service_materials` WHERE `serviceID` = ?";
    db.query(query, req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: "Error on the server side!" });
        }
        if(result.length === 0) {
            return res.status(404).json({ Message: "No service-materials found!" });
        }
        return res.status(200).json({ Message: "Query successful", result });
    });
});

export default router;