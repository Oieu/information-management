import express from "express";
import db from "../../db.js";
import Mailjet from "node-mailjet";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

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
    u.userName,
    u.userEmail
            FROM 
                orders o
            INNER JOIN 
                materials m ON m.matID = o.matID
            INNER JOIN 
                genservices s ON o.serviceID = s.genServicesID
            INNER JOIN 
                user u ON o.userID = u.userID
    ORDER BY status, createdAt DESC;
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
  const { status, uniqueNum, TotalAmount, Service, matName, matSize,   email, userName } = req.body;

  const query = "UPDATE orders SET status = ? WHERE orderID = ?";

  db.query(query, [status, orderID], (err, results) => {
    if (err) {
      console.error("Error updating status:", err);
    } else {
      console.log("Status updated successfully");
      res.status(200).json({ message: "Status updated successfully" });

      console.log(status);

       //WHEN ORDER IS SUCCESSFUL AN EMAIL IS SENT TO USER FOR THE SUMMARY OF THE ORDER
      
       if(status === "completed") {
        const emailSubject = "Order Number:" + uniqueNum;  
        const emailBody = "<html>" +
                            "<body>" +
                              "<h2> Dear Customer, <br/>" +
                              "<h2>Thank you for trusting our services! Your order is now ready for pickup</h2><br/>" +
                              "<p>Here is a summary of the order that you have made:</p><br/>" +
                              "<p><strong>Service Name:</strong>" + Service +"</p><br/>" +
                              "<p><strong>Material Name:</strong> " + matName +"</p><br/>"+ 
                              "<p><strong>Size:</strong>" + matSize +"</p><br/>" +
                              "<p><strong>Total Amount paid:</strong>" + TotalAmount + "</p><br/><br/>" +
                              "<p>If you already have picked up your order, please ignore this message.</p><br/>" +
                              "<p>Thank you and have a wonderful day!</p>"
                            "</body>" +
                          "</html>" ;
  
        const mailjetClient = new Mailjet({
          apiKey: process.env.MAILJET_PUBLIC_KEY,
          apiSecret: process.env.MAILJET_SECRET_KEY,
        });
  
        try {
          const request = mailjetClient
            .post('send', { version: 'v3.1' })
            .request({
              Messages: [
                {
                  From: {
                    Email: process.env.EMAIL_OFFICIAL_QIR,
                    Name: 'OFFICIAL QUICK INK RESERVE',
                  },
                  To: [
                    {
                      Email: email, 
                      Name: userName,
                    },
                  ],
                  Subject: emailSubject,
                  HTMLPart: emailBody,
                },
              ],
            });
          request
          console.log('Email sent successfully');
        } catch (emailError) {
          console.error('Error sending email:', emailError);
        }
 
       }
      
      
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

 router.get("/admin/api/order/:month", (req, res) => {
  const month = req.params.month;
  const sql = `
    SELECT *
    FROM orders o LEFT JOIN user u ON o.userID = u.userID
    WHERE MONTH(o.createdAt) = ? AND YEAR(o.createdAt) = YEAR(CURDATE())
  `

  db.query(sql, [month], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error on the server side" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Orders not Found" });
    }

    return res.status(200).json(results);
  });
 });
 

export default router;
