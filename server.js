const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock database
let tasks = [
  { id: 1, title: "Complete assignment", status: "Pending" },
  { id: 2, title: "Grocery shopping", status: "Completed" },
];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) res.json(task);
  else res.status(404).json({ error: "Task not found" });
});

// Add a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status || "Pending",
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
