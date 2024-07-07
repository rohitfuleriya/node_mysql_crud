const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

dotenv.config({ path: "" });

const app = express();


app.use(express.json());
app.use(morgan("dev"));

// middlewares

// router
app.use('/',require('./routes/studentRoutes'))

app.get("/test", (req, res) => {
  res.status(200).send("<h1>Welcome to </h1>");
});

// port
const PORT = process.env.PORT || 8000;

// conditionaly listen

mySqlPool.query("SELECT 1").then(() => {
  console.log("MYSQL DB Connected".bgCyan.white);
});

app.listen(PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white);
});
