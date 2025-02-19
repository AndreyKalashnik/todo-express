const { mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: String,
  isCompleted: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
