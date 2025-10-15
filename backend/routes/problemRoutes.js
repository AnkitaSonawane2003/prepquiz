// backend/routes/problemRoutes.js
const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// Add new problem (teacher)
router.post("/add", async (req, res) => {
  try {
    const {
      title,
      difficulty,
      type,
      description,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      tags,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    const tagsArray = typeof tags === "string"
      ? tags.split(",").map(t => t.trim()).filter(Boolean)
      : Array.isArray(tags) ? tags : [];

    const newProblem = new Problem({
      title,
      difficulty,
      type,
      description,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      tags: tagsArray,
    });

    await newProblem.save();
    res.status(201).json({ success: true, message: "Problem saved", problem: newProblem });
  } catch (err) {
    console.error("Error saving problem:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all problems (student)
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, problems });
  } catch (err) {
    console.error("Error fetching problems:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
