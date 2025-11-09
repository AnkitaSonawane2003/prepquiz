// // models/Test.js
// const mongoose = require("mongoose");

// const questionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   options: {
//     type: [String],
//     validate: {
//       validator: function (v) {
//         return Array.isArray(v) && v.length === 4;
//       },
//       message: "options must be an array of 4 strings",
//     },
//     required: true,
//   },
//   correctAnswer: { type: String, required: true }, // "A"/"B"/"C"/"D"
//   marks: { type: Number, default: 1 },
//   type: { type: String, default: "MCQ" }, // MCQ / Coding / Subjective
//   difficulty: { type: String, default: "medium" },
// }, { timestamps: false /* per-question timestamps not needed */ });

// // keep question sub-documents with their own _id (default)
// const testSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   subject: { type: String },
//   type: { type: String },
//   totalMarks: { type: Number },
//   duration: { type: Number }, // minutes
//   date: { type: Date },
//   instructions: { type: String },
//   questions: { type: [questionSchema], default: [] },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Test", testSchema);
// models/Test.js
const mongoose = require("mongoose");

// Subschema for individual questions
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Question text is required"],
    trim: true,
  },
  options: {
    type: [String],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length === 4;
      },
      message: "Options must be an array of exactly 4 strings",
    },
    required: [true, "Options are required"],
  },
  correctAnswer: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: [true, "Correct answer is required"],
  },
  marks: {
    type: Number,
    default: 1,
    min: [0, "Marks cannot be negative"],
  },
  type: {
    type: String, // ✅ Now just a plain string
    default: "MCQ",
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
});

// Main schema for test
const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Test title is required"],
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    type: {
      type: String, // ✅ No enum restriction now
      default: "Quiz",
    },
    totalMarks: {
      type: Number,
      default: 0,
      min: [0, "Total marks cannot be negative"],
    },
    duration: {
      type: Number, // in minutes
      min: [1, "Duration must be at least 1 minute"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    instructions: {
      type: String,
      trim: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

// Automatically calculate total marks before saving
testSchema.pre("save", function (next) {
  if (this.questions && this.questions.length > 0) {
    this.totalMarks = this.questions.reduce(
      (sum, q) => sum + (q.marks || 0),
      0
    );
  }
  next();
});

module.exports = mongoose.model("Test", testSchema);
