const bodyParser = require("body-parser");
const express = require("express");
const connection = require("./utils/database");
const cors = require("cors");
const app = express();
const AuthRoutes = require("./routes/AuthRoutes");
const LoanRoutes = require("./routes/LoanRoutes");
const DebtRoutes = require("./routes/DebtRatioRoutes");

connection.connect((err) => {
  if (err) throw err;
  console.log("connected to database");
});
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
app.set("view engine", "ejs");

app.use(express.json());

//routes
app.use("/auth", AuthRoutes);
app.use("/loan", LoanRoutes);
app.use("/debt", DebtRoutes);

// app.use("*", (req, res) => {
//   res.render("404");
// });

app.listen(8000, () => {
  console.log("app running on port 8000");
});
