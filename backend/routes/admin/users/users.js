import express from 'express';
import db from '../../db.js';

const router = express.Router();

router.get('/admin/users', (req, res) => {
    const query = 'SELECT * FROM user ORDER BY userEmail';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', result });
    });
});

router.post('/admin/users/delete/:id', (req, res) => {
    const id = req.params.id;
    const deleteSql = 'DELETE FROM user WHERE userID = ?';

    db.query(deleteSql, id, (err, result) => {
        if(err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }

        return res.status(200).json({ Message: 'Query successful', result });
    });
});

export default router;
