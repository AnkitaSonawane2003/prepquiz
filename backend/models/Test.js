const mongoose = require("mongoose");

// Subschema for individual questions
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  options: {
    type: [String],
    validate: {
      validator: (v) => Array.isArray(v) && v.length === 4,
      message: "Options must be an array of exactly 4 strings",
    },
    required: true,
  },
  correctAnswer: { type: String, enum: ["A","B","C","D"], required: true },
  marks: { type: Number, default: 1, min: 0 },
  type: { type: String, default: "MCQ" },
  difficulty: { type: String, enum: ["easy","medium","hard"], default: "medium" },
  topic: { type: String, default: "N/A", trim: true }, // default N/A
});

// Main schema for Test
const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, trim: true },
    type: { type: String, default: "Quiz" },
    totalMarks: { type: Number, default: 0, min: 0 },
    duration: { type: Number, min: 1 },
    date: { type: Date, default: Date.now },
    instructions: { type: String, trim: true },
    questions: { type: [questionSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Auto-calculate total marks before save
testSchema.pre("save", function (next) {
  this.totalMarks = (this.questions || []).reduce((sum, q) => sum + (q.marks || 0), 0);
  next();
});

module.exports = mongoose.model("Test", testSchema);
