import db from "../db.js";
import express from 'express';
import { upload } from '../multerConfig.js'; 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const orderid = require('order-id')('key'); // Can Replace 'key' with your own key

const router = express.Router();

router.post('/submit_order', upload.single('file'), (req, res) => {
 const orderNumber = orderid.generate(); 
//  console.log(req.body.matID);
//  console.log(req.body.inkType); 
//  console.log(req.file);
//  console.log(req.body.userID);
//  console.log(req.body.genServicesID);
//  console.log('Order number:', orderNumber);

 const uploadfile = req.file ? req.file.path : null;

 const query = `INSERT INTO orders (uniqueNum, submissionURL, inkType, matID, serviceID, userID) 
 VALUES (?, ?, ?, ?, ?, ?)`;
const values = [orderNumber, uploadfile, req.body.inkType, req.body.matID, req.body.genServicesID, req.body.userID];
 
    db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.send('Data inserted successfully');
    }
    });

});

export default router;