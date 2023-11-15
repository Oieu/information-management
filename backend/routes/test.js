import express from 'express';
import db from './db.js';

const router = express.Router();

//TEST STUFF
router.get('/test', (req, res) => {
    if (req.cookies['name']) {
        console.log('Cookie with key "name" exists');
        res.send('Cookie Exists');
    } else {
        console.log('Cookie with key "name" does not exist');
    }
});
router.get('/test-sql', (req, res) => { 
    const query = 'SELECT * FROM user';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Message: 'Error on the server side!' });
        }
        return res.status(200).json({ Message: 'Query successful', result });
    });
});
router.get('/test-get', (req, res) => {
    const testValue = req.session.testVariable || 'No session data found';
    const loggedIn = (req.session.user.userPassword) != undefined ? req.session.user.userPassword : null;
    res.send(`Session variable value: ${testValue}, Logged In: `);
});

export default router;