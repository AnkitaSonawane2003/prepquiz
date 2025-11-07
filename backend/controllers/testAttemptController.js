// backend/controllers/testAttemptController.js
const TestAttempt = require("../models/TestAttempt");
const Test = require("../models/Test");

// 🧩 Create a new test attempt
exports.createTestAttempt = async (req, res) => {
  try {
    const { testId } = req.params;
    const { studentId } = req.body;

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    const newAttempt = new TestAttempt({
      test: testId,
      student: studentId,
      answers: [],
      totalObtained: 0,
      totalMarks: test.totalMarks || 0,
      timeTaken: 0,
    });

    await newAttempt.save();
    res.status(201).json({ success: true, attempt: newAttempt });
  } catch (error) {
    console.error("❌ Error creating attempt:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Submit a test attempt
exports.submitTestAttempt = async (req, res) => {
  try {
    const { testId } = req.params;
    const { answers, timeTaken, studentId } = req.body;

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    let totalObtained = 0;
    const gradedAnswers = [];

    test.questions.forEach((q) => {
      const given = answers[q._id];
      let marks = 0;

      if (q.type === "MCQ" && given === q.correctOption) marks = q.marks || 1;
      if (q.type === "Short" || q.type === "Coding") marks = 0; // will be graded later

      totalObtained += marks;
      gradedAnswers.push({
        question: q._id,
        answer: given,
        marksObtained: marks,
        graded: q.type === "MCQ",
      });
    });

    const attempt = new TestAttempt({
      test: testId,
      student: studentId,
      answers: gradedAnswers,
      totalObtained,
      totalMarks: test.totalMarks || 0,
      timeTaken,
    });

    await attempt.save();
    res.status(201).json({ success: true, message: "Test submitted", attempt });
  } catch (error) {
    console.error("❌ Submission error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Get all attempts (for admin/teacher)
exports.getAllTestAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find()
      .populate("test")
      .populate("student");
    res.status(200).json({ success: true, attempts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Get attempts for logged-in student
exports.getMyTestAttempts = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId || req.query.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "User not authenticated" });

    const attempts = await TestAttempt.find({ student: userId }).populate("test");
    res.status(200).json({ success: true, attempts });
  } catch (error) {
    console.error("❌ Error fetching attempts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Get specific attempt by ID
exports.getTestAttemptById = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.id)
      .populate("test")
      .populate("student");
    if (!attempt)
      return res.status(404).json({ success: false, message: "Attempt not found" });

    res.status(200).json({ success: true, attempt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
