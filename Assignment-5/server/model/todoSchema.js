const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: { type: String },
  description: { type: String },
  author: { type: String },
  complete: { type: Boolean },
  dateCreated: {type: Date},
  dateCompleted: {type: Date},
})

module.exports = model("todos", todoSchema);