const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const mongoose = require("mongoose");

// 🧪 Add new test (Teacher)
router.post("/add", async (req, res) => {
  try {
    const { title, subject, type, totalMarks, duration, date, instructions, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Title and at least one question are required" });
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text || !q.correctAnswer || typeof q.marks === "undefined") {
        return res.status(400).json({ success: false, message: `Question ${i + 1} missing text/correctAnswer/marks` });
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        return res.status(400).json({ success: false, message: `Question ${i + 1} must have 4 options` });
      }
    }

    const parsedDate = date ? new Date(date) : undefined;

    const test = new Test({
      title,
      subject,
      type,
      totalMarks,
      duration,
      date: parsedDate,
      instructions,
      questions,
    });

    await test.save();
    res.status(201).json({ success: true, message: "Test created successfully", testId: test._id });
  } catch (err) {
    console.error("POST /api/tests/add error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
});

// 📋 Get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: 1 }).lean();
    res.json({ success: true, tests });
  } catch (err) {
    console.error("GET /api/tests error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch tests" });
  }
});

// 📘 Get a single test by ID (student-safe)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid test ID" });
    }

    const test = await Test.findById(id).lean();
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    const safeQuestions = (test.questions || []).map((q) => {
      const { correctAnswer, ...safeQ } = q;
      return safeQ;
    });

    res.json({ success: true, test: { ...test, questions: safeQuestions } });
  } catch (err) {
    console.error("GET /api/tests/:id error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
