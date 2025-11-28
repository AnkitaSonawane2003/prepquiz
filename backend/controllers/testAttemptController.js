const TestAttempt = require("../models/TestAttempt");
const Test = require("../models/Test");

// 🧩 Create a new test attempt
exports.createTestAttempt = async (req, res) => {
  try {
    const { testId } = req.params;
    const studentId = req.user?._id;

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

// 🧩 Submit a test attempt (includes question text + options + selected answer)
exports.submitTestAttempt = async (req, res) => {
  try {
    const { testId } = req.params;
    const { answers = {}, timeTaken = 0 } = req.body;
    const studentId = req.user?._id;

    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    let totalMarks = 0;
    let totalObtained = 0;

    const gradedAnswers = (test.questions || []).map((q) => {
      totalMarks += Number(q.marks || 0);
      const selected = (answers[q._id] || "").toString().trim();
      let marks = 0;
      let graded = false;

      if (q.type === "MCQ" && q.correctAnswer) {
        graded = true;
        if (selected.toUpperCase() === q.correctAnswer.toUpperCase()) {
          marks = Number(q.marks || 0);
        }
      }

      totalObtained += marks;

      return {
        question: q._id,
        selectedOption: selected,     // ✅ student choice
        correctAnswer: q.correctAnswer, // ✅ correct answer
        marksObtained: marks,
        graded,
      };
    });

    const attempt = new TestAttempt({
      test: testId,
      student: studentId,
      answers: gradedAnswers,
      totalObtained,
      totalMarks,
      timeTaken,
    });

    await attempt.save();

    res.status(201).json({
      success: true,
      message: "Test submitted successfully",
      attempt,
      score: totalObtained,
    });
  } catch (error) {
    console.error("❌ Submission error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// 🧩 Get all test attempts (for admin/teacher)
exports.getAllTestAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find()
      .populate("test")
      .populate("student");
    res.status(200).json({ success: true, attempts });
  } catch (error) {
    console.error("❌ Error fetching all attempts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Get logged-in student’s attempts
exports.getMyTestAttempts = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const attempts = await TestAttempt.find({ student: userId }).populate("test");
    res.status(200).json({ success: true, attempts });
  } catch (error) {
    console.error("❌ Error fetching attempts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Get a specific test attempt by ID
exports.getTestAttemptById = async (req, res) => {
  try {
    const attempt = await TestAttempt.findById(req.params.id)
      .populate("test")
      .populate("student");

    if (!attempt) return res.status(404).json({ success: false, message: "Attempt not found" });

    res.status(200).json({ success: true, attempt });
  } catch (error) {
    console.error("❌ Error fetching attempt by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🧩 Get logged-in student’s attempt for a specific test
exports.getMyTestAttemptForTest = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { testId } = req.params;

    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const attempt = await TestAttempt.findOne({ student: userId, test: testId }).populate("test");
    if (!attempt) return res.status(404).json({ success: false, message: "No attempt found for this test" });

    res.status(200).json({ success: true, attempt });
  } catch (error) {
    console.error("❌ Error fetching attempt for test:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getTestAttemptsPerStudent = async (req, res) => {
  try {
    const attempts = await TestAttempt.aggregate([
      {
        $lookup: {
          from: "students",      // join student info
          localField: "student",
          foreignField: "_id",
          as: "studentInfo"
        }
      },
      { $unwind: "$studentInfo" },
      {
        $lookup: {
          from: "tests",         // join test info
          localField: "test",
          foreignField: "_id",
          as: "testInfo"
        }
      },
      { $unwind: "$testInfo" },
      {
        $group: {
          _id: "$student",       // group by student
          fullName: { $first: "$studentInfo.fullName" },
          email: { $first: "$studentInfo.email" },
          totalSubmissions: { $sum: 1 },
          lastSubmission: { $max: "$createdAt" },
          attempts: {
            $push: {
              testName: "$testInfo.title",
              totalObtained: "$totalObtained",
              totalMarks: "$totalMarks",
              date: "$testInfo.date",
              type: "$testInfo.type"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          fullName: 1,
          email: 1,
          totalSubmissions: 1,
          lastSubmission: 1,
          attempts: 1
        }
      }
    ]);

    res.status(200).json({ success: true, attempts });
  } catch (err) {
    console.error("❌ Error fetching test attempts per student:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

