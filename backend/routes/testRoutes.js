const express = require("express");
const Test = require("../models/Test");

const router = express.Router();

// ➕ Add New Test (Teacher)
router.post("/add", async (req, res) => {
  try {
    const { title, subject, type, totalMarks, duration, date, instructions, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title and at least one question are required",
      });
    }

    const newTest = new Test({
      title,
      subject,
      type,
      totalMarks,
      duration,
      date,
      instructions,
      questions,
    });

    await newTest.save();

    res.status(201).json({ success: true, message: "Test added successfully!" });
  } catch (error) {
    console.error("Error adding test:", error);
    res.status(500).json({ success: false, message: "Server error while adding test" });
  }
});

// 📋 Get All Tests (Student)
router.get("/", async (req, res) => {
  try {
    const tests = await Test.find().sort({ date: 1 }); // Upcoming first
    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Failed to fetch tests" });
  }
});

module.exports = router;
