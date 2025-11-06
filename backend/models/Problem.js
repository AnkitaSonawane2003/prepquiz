// backend/models/Problem.js
const mongoose = require("mongoose");

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
    tags: { type: [String], default: [] }, // stored as array

    // ✅ Add these new fields
    status: {
      type: String,
      enum: ["open", "solved"],
      default: "open",
    },
    solvedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // or "User", depending on your auth model
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
