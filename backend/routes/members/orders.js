import db from "../db.js";
import express from "express";
import { upload } from "../multerConfig.js";
import { createRequire } from "module";
import Mailjet from "node-mailjet";
import dotenv from "dotenv";
const require = createRequire(import.meta.url);
const orderid = require("order-id")("key");

const router = express.Router();
dotenv.config();

router.post("/submit_order", upload.single("file"), (req, res) => {
  const orderNumber = orderid.generate();
  const userEmail = req.body.userEmail;
  const service = req.body.genServiceName;
  const userName = req.body.userName;
  const matname = req.body.materialName;
  const matsize = req.body.materialSize;
  const uploadfile = req.file ? req.file.path : null;
  const query = `INSERT INTO orders (uniqueNum, submissionURL, totalAmount, inkType, matID, serviceID, userID) 
 VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    orderNumber,
    uploadfile,
    req.body.totalAmount,
    req.body.inkType,
    req.body.matID,
    req.body.genServicesID,
    req.body.userID,
  ];

  console.log(req.body, values)

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    } if(result) {
      console.log("Data inserted successfully");
      res.send("Data inserted successfully");

      //WHEN ORDER IS SUCCESSFUL AN EMAIL IS SENT TO USER FOR THE SUMMARY OF THE ORDER
      
      const emailSubject = "Order Confirmation";  
      const emailBody = "<html>" +
                          "<body>" +
                            "<h2>Thank you for your order!</h2><br/>" +
                            "<p>Here is a summary of the order that you have made:</p><br/>" +
                            "<p><strong>Order number:</strong>" + orderNumber +"</p><br/>" +
                            "<p><strong>Service Name:</strong>" + service +"</p><br/>" +
                            "<p><strong>Material Name:</strong> " + matname +"</p><br/>"+ 
                            "<p><strong>Size:</strong>" + matsize +"</p><br/>" +
                            "<p><strong>Total Amount paid:</strong>" + req.body.totalAmount + "</p><br/><br/>" +
                            "<p>Once your order is complete, you will be notified via email about the pick-up date. Thank you for choosing our services!</p>" +
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
                    Email: userEmail, 
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
  });
});


export default router;
