app.get('/member/LandingPageComponents', (req, res) => {
    const query = "SELECT * FROM genservices";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error on the server side' });
        }
        console.log(results);
        return res.status(200).json(results);
    });
});

