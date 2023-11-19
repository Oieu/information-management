import express from "express";
import db from "../../db.js";

const router = express.Router();

router.get('/admin/analytics/api/user/:year', (req, res) => {
    const query = "SELECT * FROM user";
    const year = req.params.year || new Date().getFullYear();
    
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ Error: err, Message: "Error on the server side!" });
        }

        if (result.length > 0) {
            const usersGrouped = `SELECT YEAR(createdAt) as Year, MONTH(createdAt) as Month, COUNT(*) AS Registered_Users FROM user WHERE userRole = 'MEMBER' AND YEAR(createdAt) = ${year} GROUP BY YEAR(createdAt), MONTH(createdAt)`;

            db.query(usersGrouped, (err, result) => {
                if (err) {
                    return res.status(500).json({ Error: err, Message: "Error on the server side!" });
                }

                const months = [
                    "January", "February", "March", "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"
                ];

                const data = months.map(month => ({ Month: month, Year: year, Count: 0 }));

                for (const yearData of result) {
                    const { Year, Month, Registered_Users } = yearData;
                    
                    const monthIndex = months.indexOf(months[Month - 1]);

                    data[monthIndex] = {
                        Month: months[Month - 1],
                        Year,
                        Count: Registered_Users,
                    };
                }

                return res.status(200).json({ Message: "Query successful", Data: data });
            });
        }
    });
});

router.get('/admin/analytics/api/user/status/:year', (req, res) => {
    const query = "SELECT * FROM user";

    db.query(query, (err, result) => {
        if(err) {
            return res.status(500).json({ Error: err, Message: "Error on the server side!" });
        }
        if(result.length > 0) {
            const year = req.params.year;

            const inactiveUsers = `SELECT YEAR(createdAt) as Year, status as Status, COUNT(*) as Count FROM user WHERE userRole = 'MEMBER' AND YEAR(createdAt) = ${year} GROUP BY status`;

            db.query(inactiveUsers, (err, result) => {
                if(err) {
                    return res.status(500).json({ Error: err, Message: "Error on the server side!" });
                }
                if(result.length > 0) {
                    return res.status(200).json({ Message: "Query successful", Data: result });
                }
            });
        } else {
            return res.status(404).json({ Message: "No users found" });
        }
    });
});

export default router;
