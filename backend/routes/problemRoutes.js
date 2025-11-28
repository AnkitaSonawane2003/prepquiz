const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// Add Problem
router.post("/add", async (req, res) => {
  try {
    let {
      title,
      difficulty,
      type,
      description,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      tags,
      hiddenTestCases
    } = req.body;

    if (!title || !description)
      return res.status(400).json({ success: false, message: "Title & description required" });

    const tagsArray =
      typeof tags === "string"
        ? tags.split(",").map(t => t.trim()).filter(Boolean)
        : Array.isArray(tags) ? tags : [];

    // Ensure hidden test cases always exist
    if (!hiddenTestCases || hiddenTestCases.length < 2) {
      hiddenTestCases = [
        { input: "10", output: "20" },
        { input: "15", output: "30" }
      ];
    }

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
      hiddenTestCases
    });

    await newProblem.save();

    res.status(201).json({
      success: true,
      message: "Problem saved successfully",
      problem: newProblem,
    });

  } catch (err) {
    console.error("Error saving problem:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get solved count
router.get("/problems-solved/:studentId", async (req, res) => {
  try {
    const count = await Problem.countDocuments({
      solvedBy: req.params.studentId,
      status: "solved"
    });

    res.json({ success: true, solvedCount: count });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json({ success: true, problems });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get problem by ID
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });

    res.json({ success: true, problem });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Mark solved
router.post("/:id/solve", async (req, res) => {
  try {
    const { studentId } = req.body;

    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ success: false, message: "Not found" });

    if (!problem.solvedBy.includes(studentId)) {
      problem.solvedBy.push(studentId);
      problem.status = "solved";
      await problem.save();
    }

    res.json({ success: true, message: "Marked solved" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
