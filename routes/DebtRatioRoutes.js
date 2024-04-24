const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

// Route for adding a debt ratio
router.post("/add", (req, res) => {
  const { uid, debt, income } = req.body;

  try {
    const insertQuery = `INSERT INTO DebtToIncome (uid, debt, income) VALUES (?, ?, ?)`;
    connection.query(insertQuery, [uid, debt, income], (err, results) => {
      if (err) {
        console.error("Error adding debt ratio:", err);
        res.status(500).json({ message: "Failed to add debt ratio" });
      } else {
        res.status(201).json({ message: "Debt ratio added successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to add debt ratio" });
  }
});

// Route for getting debt ratios for a specific user ID
router.get("/:uid", (req, res) => {
  const uid = req.params.uid;

  try {
    const selectQuery = `SELECT * FROM DebtToIncome WHERE uid = ?`;
    connection.query(selectQuery, [uid], (err, results) => {
      if (err) {
        console.error("Error fetching debt ratios:", err);
        res.status(500).json({ message: "Failed to fetch debt ratios" });
      } else {
        res.status(200).json({ debt_ratios: results });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch debt ratios" });
  }
});

module.exports = router;
