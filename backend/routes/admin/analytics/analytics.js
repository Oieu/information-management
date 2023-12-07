import express from "express";
import db from "../../db.js";

const router = express.Router();

router.get("/admin/analytics/api/user/:year", (req, res) => {
  const query = "SELECT * FROM user";
  const year = req.params.year || new Date().getFullYear();

  db.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: err, Message: "Error on the server side!" });
    }

    if (result.length > 0) {
      const usersGrouped = `SELECT YEAR(createdAt) as Year, MONTH(createdAt) as Month, COUNT(*) AS Registered_Users FROM user WHERE userRole = 'MEMBER' AND YEAR(createdAt) = ${year} GROUP BY YEAR(createdAt), MONTH(createdAt)`;

      db.query(usersGrouped, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ Error: err, Message: "Error on the server side!" });
        }

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ];

        const data = months.map((month) => ({
          Month: month,
          Year: year,
          Count: 0,
        }));

        for (const yearData of result) {
          const { Year, Month, Registered_Users } = yearData;

          const monthIndex = months.indexOf(months[Month - 1]);

          data[monthIndex] = {
            Month: months[Month - 1],
            Year,
            Count: Registered_Users,
          };
        }

        return res
          .status(200)
          .json({ Message: "Query successful", Data: data });
      });
    }
  });
});

router.get("/admin/analytics/api/user/status/:year", (req, res) => {
  const query = "SELECT * FROM user";

  db.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: err, Message: "Error on the server side!" });
    }
    if (result.length > 0) {
      const year = req.params.year;

      const inactiveUsers = `SELECT YEAR(createdAt) as Year, status as Status, COUNT(*) as Count FROM user WHERE userRole = 'MEMBER' AND YEAR(createdAt) = ${year} GROUP BY status`;

      db.query(inactiveUsers, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ Error: err, Message: "Error on the server side!" });
        }
        if (result.length > 0) {
          return res
            .status(200)
            .json({ Message: "Query successful", Data: result });
        }

        return res.status(200).json({ Data: [{ 
          Year: year,
          Status: "inactive",
          Count: 0, 
        }, {
          Year: year,
          Status: "active",
          Count: 0,
        }]});        
      });
    } else {
      return res.status(200).json({ Data: [{ 
        Year: year,
        Status: "inactive",
        Count: 0, 
      }, {
        Year: year,
        Status: "active",
        Count: 0,
      }]});
    }
  });
});

router.get("/admin/analytics/api/materials-count", (req, res) => {
  const sql = `
  SELECT g.genServiceName, SUBSTRING_INDEX(m.matName, ' ', 2) AS groupedMatName,
  COUNT(sm.serviceID) as Count
  FROM genservices g
  LEFT JOIN
  service_materials sm  ON sm.serviceID = g.genServicesID
  INNER JOIN
  materials m ON m.matID = sm.matID
  GROUP BY groupedMatName, sm.serviceID
  ORDER BY Count;`;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: err, Message: "Error on the server side!" });
    }
    if (result.length > 0) {
      return res
        .status(200)
        .json({ Message: "Query successful", Data: result });
    }
  });
});

router.get("/admin/analytics/api/revenue/:year", (req, res) => {
  const year = req.params.year || new Date().getFullYear();

  const sql = `
  WITH RECURSIVE months AS (
    SELECT 1 AS month
    UNION
    SELECT month + 1 FROM months WHERE month < 12
  )
  
  SELECT months.month AS Month, COALESCE(SUM(orders.totalAmount), 0) AS Revenue, COUNT(*) as Sales
  FROM months
  LEFT JOIN orders ON months.month = MONTH(orders.createdAt) AND YEAR(orders.createdAt) = ${year}
  GROUP BY months.month;  
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Error: err, Message: "Error on the server side!" });
    }
    if (result.length > 0) {
      return res
        .status(200)
        .json({ Message: "Query successful", Data: result });
    }
  });
});

export default router;
