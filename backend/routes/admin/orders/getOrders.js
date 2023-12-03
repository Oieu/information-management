import express from "express";
import db from "../../db.js";

const router = express.Router();



router.get("/admin/orders", (req, res) => {
    const query =  `
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
  
    db.query(query,  (err, results) => {
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

    const query = 'UPDATE orders SET status = ? WHERE orderID = ?';

    db.query(query, [status, orderID], (err, results) => {
        if (err) {
          console.error('Error updating status:', err);
          // Handle the error
        } else {
          console.log('Status updated successfully');
           res.status(200).json({ message: "Status updated successfully" });
          // Handle the success
        }
  });

});
  
  
  export default router;