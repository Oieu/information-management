import express from "express";
import db from "../../db.js";
import { upload } from "../../multerConfig.js";

const router = express.Router();

router.get("/admin/services", (req, res) => {
  const query = "SELECT * FROM genservices ORDER BY genServiceName";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    }
    return res.status(200).json({ Message: "Query successful", result });
  });
});

router.post("/admin/services", upload.single("serviceImage"), (req, res) => {
  const { name, description, rateUnit } = req.body;
  const serviceImagePath = req.file ? req.file.path : null;
  const insertSql =
    "INSERT INTO genservices (genServiceName, genServiceDesc, genServiceImageUrl, rateUnit) VALUES (?, ?, ?, ?)";

  const values = [name, description, serviceImagePath, rateUnit];
  db.query(insertSql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    } else if (result) {
      const serviceID = result.insertId;
      const materials = JSON.parse(req.body.materials);
      const results = [];
      const errors = [];

      const materialPromises = materials.map((material) => {
        const checkSql = "SELECT 1 FROM genservices WHERE genServicesID = ?";

        db.query(checkSql, serviceID, (err, result) => {
          if (err) {
            console.log("err", err);
            throw new Error(
              `specServiceID ${serviceID} doesn't exist in the genservices table`
            );
          }

          if (result.length > 0) {
            const insertToServiceMaterialsSql =
              "INSERT INTO `service-materials` (serviceID, matID) VALUES (?, ?)";
            const values = [serviceID, material];

            return db.query(insertToServiceMaterialsSql, values);
          }
        });
      });

      Promise.all(materialPromises)
        .then((results) => {
          if (errors.length > 0) {
            return res
              .status(500)
              .json({ Message: "Error on the server side!", errors });
          }
          return res
            .status(200)
            .json({ Message: "Query successful", services: results });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ Message: "Error on the server side!", errors: [err] });
        });
    }
  });
});

router.post("/admin/services/delete/:id", (req, res) => {
  const id = req.params.id;
  const deleteSql = "DELETE FROM genservices WHERE genServicesID = ?";

  db.query(deleteSql, id, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    }
    return res
      .status(200)
      .json({ Message: "Query successful", services: result });
  });
});

router.put("/admin/services/:id", (req, res) => {
  const id = req.params.id;
  const featured = req.body.featured;
  const updateSql =
    "UPDATE genservices SET featured = ? WHERE genServiceID = ?";
  const values = [featured, id];

  db.query(updateSql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error on the server side!" });
    }
    return res
      .status(200)
      .json({ Message: "Query successful", services: result });
  });
});

export default router;
