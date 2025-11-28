const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    type: { type: String, default: "DSA" },
    description: { type: String, required: true },
    inputFormat: { type: String, default: "" },
    outputFormat: { type: String, default: "" },
    sampleInput: { type: String, default: "" },
    sampleOutput: { type: String, default: "" },
    tags: { type: [String], default: [] },

    // Hidden test cases
    hiddenTestCases: [testCaseSchema],

    status: {
      type: String,
      enum: ["open", "solved"],
      default: "open",
    },

    solvedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
