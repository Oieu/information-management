import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import db from '../db';

const router = express.Router();
const saltRounds = 10;

// SIGNUP POST AND GET
router.post('/signup', upload.single('profilePicture'), (req, res) => {
    const { email, password, userName } = req.body;
    const profilePicturePath = req.file ? req.file.path : null;

    const emailCheck = 'SELECT * FROM user WHERE userEmail = ?';

    db.query(emailCheck, [email], (checkError, checkResult) => {
        if (checkError) {
            return res.status(500).json({ Message: "Error from the server side." });
        }

        if (checkResult.length > 0) {
            return res.status(500).json({ Message: "Email already exists in the database" });
        }

        const insertSql = 'INSERT INTO user (userEmail, userPassword, userName, profilePicture) VALUES (?, ?, ?, ?)';

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ Message: 'Error on the server side!' });
            }

            const values = [email, hash, userName, profilePicturePath];
            db.query(insertSql, values, (err, insertResult) => {
                if (err) {
                    return res.status(500).json({ Message: 'Error on the server side!' });
                }
                return res.status(200).json({ Message: 'User registration successful', user: insertResult });
            });
        });
    });
});

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
