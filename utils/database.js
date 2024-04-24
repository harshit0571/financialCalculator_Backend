const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "financial_calclulator",
});

module.exports = connection;
