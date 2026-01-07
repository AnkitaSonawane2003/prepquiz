const express = require("express");
const router = express.Router();
const Test = require("../models/Test");
const mongoose = require("mongoose");

// Add new test
router.post("/add", async (req, res) => {
  try {
    const { title, subject, type, duration, date, instructions, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0)
      return res.status(400).json({ success: false, message: "Title and at least one question are required" });

    const mappedQuestions = questions.map((q, idx) => {
      if (!q.text || !q.correctAnswer || typeof q.marks === "undefined")
        throw new Error(`Question ${idx+1} missing text/correctAnswer/marks`);
      if (!Array.isArray(q.options) || q.options.length !== 4)
        throw new Error(`Question ${idx+1} must have 4 options`);

      return {
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        marks: q.marks,
        type: q.type || "MCQ",
        topic: q.topic || "N/A",
        difficulty: q.difficulty || "medium",
      };
    });

    const test = new Test({
      title,
      subject,
      type: type || "Quiz",
      duration,
      date: date ? new Date(date) : undefined,
      instructions,
      questions: mappedQuestions,
    });

    await test.save();
    res.status(201).json({ success: true, message: "Test created successfully", testId: test._id });
  } catch (err) {
    console.error("POST /api/tests/add error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
});

// Get all tests
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: 1 }).lean();
    res.json({ success: true, tests });
  } catch (err) {
    console.error("GET /api/tests error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch tests" });
  }
});

// Get single test (student-safe)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid test ID" });

    const test = await Test.findById(id).lean();
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    const safeQuestions = (test.questions || []).map(({ correctAnswer, ...rest }) => rest);
    res.json({ success: true, test: { ...test, questions: safeQuestions } });
  } catch (err) {
    console.error("GET /api/tests/:id error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
