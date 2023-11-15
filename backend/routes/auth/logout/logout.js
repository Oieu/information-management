import express from 'express';

const router = express.Router();

router.post('/logout', (req, res) => {
    if (req.session && req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ Message: 'Error in logging out. ' + err });
            } else {
                if (req.cookies['name']) {
                    res.clearCookie('name');
                }
                return res.status(200).json({ Message: 'Logout was Successful.', loggedIn: false });
            }
        });
    } else {
        return res.status(401).json({ Message: 'Not logged in' });
    }
});

export default router;