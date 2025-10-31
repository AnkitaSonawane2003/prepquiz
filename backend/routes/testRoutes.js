// const express = require("express");
// const Test = require("../models/Test");

// const router = express.Router();

// // ➕ Add New Test (Teacher)
// router.post("/add", async (req, res) => {
//   try {
//     const { title, subject, type, totalMarks, duration, date, instructions, questions } = req.body;

//     if (!title || !questions || questions.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and at least one question are required",
//       });
//     }

//     const newTest = new Test({
//       title,
//       subject,
//       type,
//       totalMarks,
//       duration,
//       date,
//       instructions,
//       questions,
//     });

//     await newTest.save();

//     res.status(201).json({ success: true, message: "Test added successfully!" });
//   } catch (error) {
//     console.error("Error adding test:", error);
//     res.status(500).json({ success: false, message: "Server error while adding test" });
//   }
// });

// // 📋 Get All Tests (Student)
// router.get("/", async (req, res) => {
//   try {
//     const tests = await Test.find().sort({ date: 1 }); // Upcoming first
//     res.status(200).json(tests);
//   } catch (error) {
//     console.error("Error fetching tests:", error);
//     res.status(500).json({ message: "Failed to fetch tests" });
//   }
// });

// module.exports = router;
// routes/tests.js
const express = require("express");
const Test = require("../models/Test");

const router = express.Router();

// DEBUG route to quickly test JSON parsing from client
router.post("/debug", (req, res) => {
  console.log("DEBUG /api/tests/debug body:", JSON.stringify(req.body, null, 2));
  res.json({ success: true, received: req.body });
});

// ➕ Add New Test (Teacher)
router.post("/add", async (req, res) => {
  console.log("POST /api/tests/add body:", JSON.stringify(req.body, null, 2));
  try {
    const { title, subject, type, totalMarks, duration, date, instructions, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Title and at least one question are required",
      });
    }

    // Validate questions minimally
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text || !q.correctAnswer || typeof q.marks === "undefined") {
        return res.status(400).json({
          success: false,
          message: `Question ${i + 1} is missing text/correctAnswer/marks`,
        });
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        return res.status(400).json({
          success: false,
          message: `Question ${i + 1} must have 4 options`,
        });
      }
    }

    // Parse date (if provided)
    const parsedDate = date ? new Date(date) : undefined;

    const newTest = new Test({
      title,
      subject,
      type,
      totalMarks,
      duration,
      date: parsedDate,
      instructions,
      questions,
    });

    await newTest.save();

    res.status(201).json({ success: true, message: "Test added successfully!" });
  } catch (error) {
    console.error("Error adding test:", error);
    // Return db error message to help debugging
    res.status(500).json({ success: false, message: error.message || "Server error while adding test" });
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
