const mongoose = require("mongoose");

const testAnswerSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer: { type: String, default: "" }, // selected option or written text
    marksObtained: { type: Number, default: 0 },
    graded: { type: Boolean, default: false },
  },
  { _id: false }
);

const testAttemptSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  answers: { type: [testAnswerSchema], default: [] },
  totalObtained: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestAttempt", testAttemptSchema);
