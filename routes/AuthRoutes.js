const express = require("express");
const router = express.Router();
const connection = require("../utils/database");
const bcrypt = require("bcrypt");

// Route for user registration
router.post("/register", async (req, res) => {
  const { username, password, email, name, age } = req.body; // Destructuring the request body to get user data

  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

  try {
    // SQL query to insert user data into the database
    const insertQuery = `INSERT INTO Users (username, password, email, name, age) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      insertQuery,
      [username, hashedPassword, email, name, age],
      (err, results) => {
        if (err) {
          console.error("Error registering user:", err);
          res.status(500).json({ message: "Registration failed" });
        } else {
          res.status(201).json({ message: "Registration successful" });
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// Route for user login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Query to get user data based on username
  connection.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ message: "Login failed" });
      }

      const user = results[0]; // Assuming username is unique, so only one result is expected

      // If user exists and password matches the hashed password
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Login successful", user: user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

module.exports = router;
