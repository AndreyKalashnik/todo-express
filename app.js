const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
require("dotenv").config();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("we are connected to database");
});

const todoSchema = new mongoose.Schema({
  task: String,
  isCompleted: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task });

  await newTodo.save();
  res.status(201).json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { task, isCompleted } = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(id, { task, isCompleted }, { new: true });
  res.json(updatedTodo);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  await Todo.findByIdAndDelete(id);
  res.status(204).send();
});

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
