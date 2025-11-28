
const mongoose = require("mongoose");

const attemptAnswerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, required: true },
  answer: { type: String, default: "" }, // "A"/"B"/"C"/"D" or text
  marksObtained: { type: Number, default: 0 },
  graded: { type: Boolean, default: false },
}, { _id: false });

const attemptSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false }, // optional if no auth
  answers: { type: [attemptAnswerSchema], default: [] },
  totalObtained: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
  timeTaken: { type: Number, default: 0 }, // seconds
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attempt", attemptSchema);
