const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");
const authenticateToken = require("./middleware/authenticateToken");

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("we are connected to database"))
  .catch((error) => console.error(`connection error: ${error}`));

app.use("api/auth", authRoutes);
app.use("api/todos", authenticateToken, todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use("/static", express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
