// const mongoose = require("mongoose");

// const questionSchema = new mongoose.Schema({
//   text: String,
//   options: [String],
//   correctAnswer: String,
//   marks: Number,
// });

// const testSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subject: String,
//   type: String,
//   totalMarks: Number,
//   duration: Number,
//   date: Date,
//   instructions: String,
//   questions: [questionSchema],
// });

// module.exports = mongoose.model("Test", testSchema);
// models/Test.js
const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], validate: v => Array.isArray(v) && v.length === 4 },
  correctAnswer: { type: String, required: true }, // e.g. "A", "B", "C", "D"
  marks: { type: Number, default: 1 }
}, { _id: false });

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String },
  type: { type: String },
  totalMarks: { type: Number },
  duration: { type: Number }, // minutes
  date: { type: Date },
  instructions: { type: String },
  questions: { type: [questionSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Test", testSchema);
