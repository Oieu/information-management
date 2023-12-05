import express from "express";
import db from "../../db.js";

const router = express.Router();

router.get("/admin/orders", (req, res) => {
  const query = `
    SELECT 
    o.orderID,
    o.uniqueNum,
    o.submissionURL,
    o.totalAMount,
    o.inkType,
    o.status,
    o.createdAt,
    m.matName,
    m.matSize,
    s.genServiceName,
    u.userName
            FROM 
                orders o
            INNER JOIN 
                materials m ON m.matID = o.matID
            INNER JOIN 
                genservices s ON o.serviceID = s.genServicesID
            INNER JOIN 
                user u ON o.userID = u.userID;
       `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Order not Found" });
    }

    return res.status(200).json(results);
  });
});

router.post("/updateStatus/:orderID", (req, res) => {
  const orderID = req.params.orderID;
  const { status } = req.body;

  console.log(orderID);
  console.log(status);

  const query = "UPDATE orders SET status = ? WHERE orderID = ?";

  db.query(query, [status, orderID], (err, results) => {
    if (err) {
      console.error("Error updating status:", err);
    } else {
      console.log("Status updated successfully");
      res.status(200).json({ message: "Status updated successfully" });
    }
  });
});

router.get("/admin/orders/total-amount/current-month", (req, res) => {
  const query = `
    SELECT 
      SUM(totalAMount) AS total
    FROM 
      orders
    WHERE 
      MONTH(createdAt) = MONTH(CURDATE()) AND
      YEAR(createdAt) = YEAR(CURDATE());
  `;
 
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }
 
    if (results.length === 0) {
      return res.status(200).json({ total: 0 });
    }
 
    return res.status(200).json(results[0]);
  });
 });
 
 router.get("/admin/orders/total-amount/previous-month", (req, res) => {
  const query = `
    SELECT 
      SUM(totalAMount) AS total
    FROM 
      orders
    WHERE 
      MONTH(createdAt) = MONTH(DATE_SUB(CURDATE(), INTERVAL 1 MONTH)) AND
      YEAR(createdAt) = YEAR(DATE_SUB(CURDATE(), INTERVAL 1 MONTH));
  `;
 
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }
 
    if (results.length === 0) {
      return res.status(200).json({ total: 0 });
    }
 
    return res.status(200).json(results[0]);
  });
 });
 

export default router;
