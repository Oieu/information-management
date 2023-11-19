import express from 'express';
import db from '../../db.js';
import { upload } from '../../multerConfig.js';

const router = express.Router();

router.get('/admin/services', (req, res) => {
    const query = 'SELECT * FROM genservices ORDER BY genServiceName';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', result });
    }
)});

router.post('/admin/services', upload.single('serviceImage'), (req, res) => {
    const { name, description } = req.body;
    const serviceImagePath = req.file ? req.file.path : null;
    const insertSql = 'INSERT INTO genservices (genServiceName, genServiceDesc, genServiceImageUrl) VALUES (?, ?, ?)';
    
    const values = [name, description, serviceImagePath];
    db.query(insertSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', services: result });
    });
});

router.post('/admin/services/delete/:id', (req, res) => {
    const id = req.params.id;
    const deleteSql = 'DELETE FROM genservices WHERE genServicesID = ?';

    db.query(deleteSql, id, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', services: result });
    });
});

router.post('/admin/services/:id', (req, res) => {
    const id = req.params.id;
    const featured = req.body.featured;
    const updateSql = 'UPDATE genservices SET featured = ? WHERE genServiceID = ?';
    const values = [featured, id];

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', services: result });
    });
});

export default router;