const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todos = require("../model/todoSchema");
const User = require("../model/userSchema");

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing." });
  }
});

router.get("/", async function (req, res) {
  const user = await User.findById(req.payload.id);
  Todos.find()
    .where("author")
    .equals(user.username)
    .then((todos) => {
      return res.status(200).json(todos);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.post("/", async function (req, res) {
  const todo = new Todos({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    complete: false,
    dateCreated: new Date(),
    dateCompleted: new Date()
  });
  todo
    .save()
    .then((newTodo) => {
      return res.status(200).json({
        id: newTodo._id,
        title: newTodo.title,
        description: newTodo.description,
        author: newTodo.author,
        complete: newTodo.complete,
        dateCreated: newTodo.dateCreated,
        dateCompleted: newTodo.dateCompleted
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todos.findById(id);
  const newTodo = await Todos.findOneAndUpdate(
    { _id: id },
    { $set: { complete: !todo.complete, dateCompleted: new Date() } },
    { new: true }
  );
  return res.status(200).json({
    id: newTodo._id,
    dateCompleted: newTodo.dateCompleted
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Todos.findByIdAndDelete(id);
  return res.status(200).json({
    id,
    message:"Delete successfully"
  });
});

module.exports = router