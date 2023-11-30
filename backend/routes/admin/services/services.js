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

router.put(
  "/admin/services/update/:id",
  upload.single("serviceImage"),
  (req, res) => {
    const { id, name, rateUnit, description, featured } = req.body;
    const serviceImagePath = req.file ? req.file.path : null;

    let updateSql, params;
    let updatedData = [];
    let results = [];
    let dataDeleted = [];

    if (serviceImagePath === null) {
      updateSql =
        "UPDATE genservices SET genServiceName = ?, genServiceDesc = ?, rateUnit = ?, featured = ? WHERE genServicesID = ?";
      params = [name, description, rateUnit, featured, id];
    } else {
      updateSql =
        "UPDATE genservices SET genServiceName = ?, genServiceDesc = ?, genServiceImageUrl = ?, rateUnit = ?, featured = ? WHERE genServicesID = ?";
      params = [name, description, serviceImagePath, rateUnit, featured, id];
    }

    db.query(updateSql, params, (err, result) => {
      if (err) throw err;
      if (result) {
        updatedData.push(result);
      }
    });

    const { materials } = req.body;

    if (materials) {
      const items = JSON.parse(materials);
      const query2 = `DELETE FROM \`service-materials\` WHERE serviceID = ? AND matID NOT IN (?)`;

      db.query(query2, [id, items], (err, result) => {
        if (err) throw err;
        if (result) {
          dataDeleted.push(result);
        }
      });

      const checkSql =
        "SELECT matID FROM `service-materials` WHERE serviceID = ?";
      db.query(checkSql, id, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const checkSqlResult = result;
          const checkSqlIds = checkSqlResult.map((row) => row.matID);
          const filteredItems = items.filter(
            (item) => !checkSqlIds.includes(item)
          );

          filteredItems.forEach((item) => {
            const insertSql =
              "INSERT INTO `service-materials` (serviceID, matID) VALUES (?, ?)";
            db.query(insertSql, [id, item], (err, result) => {
              if (err) throw err;
              if (result) {
                results.push(result);
              }
            });
          });
        } else if (result.length === 0) {
          items.forEach((item) => {
            const insertSql =
              "INSERT INTO `service-materials` (serviceID, matID) VALUES (?, ?)";
            db.query(insertSql, [id, item], (err, result) => {
              if (err) throw err;
              if (result) {
                results.push(result);
              }
            });
          });
        }
      });
    } else return res.status(404).json({ Message: "No selected items" });

    return res
      .status(200)
      .json({
        Message: "Query successful",
        data: results,
        deleted: dataDeleted,
        updatedData: updatedData,
      });
  }
);

export default router;
