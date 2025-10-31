// const express = require("express");
// const router = express.Router();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ Generate Questions Route
// router.post("/", async (req, res) => {
//   try {
//     const { topic, count } = req.body;

//     if (!topic || !count) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide topic(s) and number of questions.",
//       });
//     }

//     const prompt = `
// Generate ${count} mixed difficulty questions about "${topic}".
// Return ONLY a JSON array of objects, no extra text, no explanation.
// Each object should have these keys:
// "text": question text,
// "options": array of 4 strings,
// "correctAnswer": "A" | "B" | "C" | "D",
// "marks": number,
// "difficulty": "easy" | "medium" | "hard"
// JSON Example:
// [
//   { "text": "Sample question?", "options": ["A","B","C","D"], "correctAnswer": "A", "marks": 2, "difficulty": "medium" }
// ]
// `;

//     const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     // --- Safe JSON parsing ---
//     let questions = [];
//     try {
//       // Extract JSON array from AI response
//       const match = text.match(/\[.*\]/s);
//       if (!match) throw new Error("No JSON array found");
//       questions = JSON.parse(match[0]);
//     } catch (err) {
//       console.error("AI output invalid JSON:", text);
//       return res.json({
//         success: false,
//         message: "AI returned invalid JSON. Try again.",
//         raw: text
//       });
//     }

//     // Shuffle questions for mixed difficulty
//     const shuffled = questions
//       .map((q) => ({ ...q, sort: Math.random() }))
//       .sort((a, b) => a.sort - b.sort)
//       .map(({ sort, ...rest }) => rest);

//     res.json({ success: true, questions: shuffled });
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate questions",
//       error: error.message,
//     });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { topics, countPerTopic = 2 } = req.body;

    // ✅ Validate input
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of topics.",
      });
    }

    let allQuestions = [];

    // ✅ Loop through each topic and generate questions
    for (const topic of topics) {
      const prompt = `
Generate ${countPerTopic} mixed difficulty questions about "${topic}".
Return ONLY a JSON array of objects, no extra text, no explanation.
Each object should have these keys:
"text": question text,
"options": array of 4 strings,
"correctAnswer": "A" | "B" | "C" | "D",
"marks": number,
"difficulty": "easy" | "medium" | "hard"
JSON Example:
[
  { "text": "Sample question?", "options": ["A","B","C","D"], "correctAnswer": "A", "marks": 2, "difficulty": "medium" }
]
      `;

      const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // ✅ Parse AI output safely
      try {
        const match = text.match(/\[.*\]/s);
        if (!match) throw new Error("No JSON array found for " + topic);
        const questions = JSON.parse(match[0]);
        allQuestions.push(...questions.map((q) => ({ ...q, topic })));
      } catch (err) {
        console.error(`AI returned invalid JSON for topic ${topic}:`, text);
      }
    }

    if (allQuestions.length === 0) {
      return res.json({
        success: false,
        message: "AI returned invalid format for all topics. Try again.",
      });
    }

    // ✅ Shuffle all questions
    const shuffled = allQuestions
      .map((q) => ({ ...q, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...rest }) => rest);

    res.json({ success: true, questions: shuffled });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
});

module.exports = router;
