const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctAnswer: String,
  marks: Number,
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  type: String,
  totalMarks: Number,
  duration: Number,
  date: Date,
  instructions: String,
  questions: [questionSchema],
});

module.exports = mongoose.model("Test", testSchema);
