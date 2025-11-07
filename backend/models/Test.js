// models/Test.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: {
    type: [String],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length === 4;
      },
      message: "options must be an array of 4 strings",
    },
    required: true,
  },
  correctAnswer: { type: String, required: true }, // "A"/"B"/"C"/"D"
  marks: { type: Number, default: 1 },
  type: { type: String, default: "MCQ" }, // MCQ / Coding / Subjective
  difficulty: { type: String, default: "medium" },
}, { timestamps: false /* per-question timestamps not needed */ });

// keep question sub-documents with their own _id (default)
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String },
  type: { type: String },
  totalMarks: { type: Number },
  duration: { type: Number }, // minutes
  date: { type: Date },
  instructions: { type: String },
  questions: { type: [questionSchema], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Test", testSchema);
