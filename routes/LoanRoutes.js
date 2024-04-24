const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

// Route for adding a loan
router.post("/add", (req, res) => {
  const { uid, principle, interest, tenure } = req.body;

  try {
    const insertQuery = `INSERT INTO Loan (uid, principle, interest, tenure) VALUES (?, ?, ?, ?)`;
    connection.query(
      insertQuery,
      [uid, principle, interest, tenure],
      (err, results) => {
        if (err) {
          console.error("Error adding loan:", err);
          res.status(500).json({ message: "Failed to add loan" });
        } else {
          res.status(201).json({ message: "Loan added successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to add loan" });
  }
});

// Route for getting loans for a specific user ID
router.get("/:uid", (req, res) => {
  const uid = req.params.uid;

  try {
    const selectQuery = `SELECT * FROM Loan WHERE uid = ?`;
    connection.query(selectQuery, [uid], (err, results) => {
      if (err) {
        console.error("Error fetching loans:", err);
        res.status(500).json({ message: "Failed to fetch loans" });
      } else {
        res.status(200).json({ loans: results });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch loans" });
  }
});

module.exports = router;
