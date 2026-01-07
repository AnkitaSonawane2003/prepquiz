const mongoose = require("mongoose");

const testAnswerSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, required: true },
    selectedOption: { type: String, default: "" }, // student's selected option
    correctAnswer: { type: String, default: "" },  // correct answer for the question
    marksObtained: { type: Number, default: 0 },
    graded: { type: Boolean, default: false },
  },
  { _id: false }
);

const testAttemptSchema = new mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: { type: [testAnswerSchema], default: [] },
    totalObtained: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 },
  },
  { timestamps: true } // automatic createdAt and updatedAt
);

module.exports = mongoose.model("TestAttempt", testAttemptSchema);
