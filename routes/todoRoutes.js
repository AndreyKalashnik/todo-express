const express = require("express");
const Todo = require("../model/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isCompleted } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, { task, isCompleted }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
