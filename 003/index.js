const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get("/", (req, res) => {
  res.render("home", { data: tasks });
});


app.post("/add", (req, res) => {
  const { task_title, task_desc, status, deadline } = req.body;
  if (!task_title || !task_desc || !status || !deadline) {
    return res.redirect("/");
  }
  tasks.push({ task_title, task_desc, status, deadline });
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  tasks = tasks.filter((_, i) => i != req.params.id);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const task = tasks[req.params.id];
  res.render("edit", { task, id: req.params.id });
});

app.post("/update", (req, res) => {
  const id = req.body.id;
  tasks[id] = { ...req.body };
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
