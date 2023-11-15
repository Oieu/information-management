import express from 'express';
import db from '../../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const saltRounds = process.env.SALT_ROUNDS || 10;

router.put('/reset', (req, res) => {
    const { email, newUsername, newPassword, currPassword } = req.body;  
    const checkCurrPasswordQuery = 'SELECT * FROM user WHERE userEmail = ?';
  
    db.query(checkCurrPasswordQuery, [email], (checkError, checkResult) => {
      if (checkError) {
        return res.status(500).json({ Message: 'Error on the server side.' });
      }
  
      if (checkResult.length === 0) {
        return res.status(401).json({ Message: 'User not found.' });
      }
  
      const user = checkResult[0];
  
      bcrypt.compare(currPassword, user.userPassword, (compareErr, passwordMatch) => {
        if (compareErr) {
          return res.status(500).json({ Message: 'Error on the server side.' });
        }
  
        if (passwordMatch) {
          const updateSql = 'UPDATE user SET userName = ?, userPassword = ? WHERE userEmail = ?';
  
          bcrypt.hash(newPassword, saltRounds, (hashErr, hash) => {
            if (hashErr) {
              return res.status(500).json({ Message: 'Error on the server side.' });
            }
  
            const values = [newUsername, hash, email];
  
            db.query(updateSql, values, (updateErr, updateResult) => {
              if (updateErr) {
                return res.status(500).json({ Message: 'Error on the server side.' });
              }
  
              return res.status(200).json({ Message: 'User information updated successfully. Redirecting in 3 seconds...' });
            });
          });
        } else {
          return res.status(401).json({ passMessage: 'Wrong current password! Please input the correct current password.' });
        }
      });
    });
});

export default router;