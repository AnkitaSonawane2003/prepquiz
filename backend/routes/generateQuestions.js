// const express = require("express");
// const router = express.Router();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY1);

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


// const express = require("express");
// const router = express.Router();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // ✅ Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ Route: Generate Questions Using Gemini
// router.post("/generate-questions", async (req, res) => {
//   try {
//     const { topic, count } = req.body;

//     if (!topic || !count) {
//       return res.status(400).json({
//         success: false,
//         message: "Both topic and question count are required.",
//       });
//     }

//     const prompt = `
//     You are an expert test creator. 
//     Generate ${count} high-quality multiple-choice questions (MCQs) on the topic "${topic}".
//     Each question should include:
//     - question text
//     - exactly 4 options (A, B, C, D)
//     - correct answer (like A, B, C, or D)
//     - difficulty (easy, medium, or hard)
//     - marks (integer between 1–5)

//     Return output in pure JSON format as:
//     {
//       "questions": [
//         {
//           "text": "Question text here",
//           "options": ["Option A", "Option B", "Option C", "Option D"],
//           "correctAnswer": "B",
//           "difficulty": "medium",
//           "marks": 2
//         },
//         ...
//       ]
//     }
//     Ensure it's valid JSON only — no explanations or extra text.
//     `;

//     // ✅ Gemini Model Call
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const text = await result.response.text();

//     console.log("🧠 Gemini Raw Output:", text);

//     // Try to parse the AI's JSON output
//     let parsed;
//     try {
//       parsed = JSON.parse(text);
//     } catch (e) {
//       console.error("⚠️ Invalid JSON from AI:", e.message);
//       return res.status(500).json({
//         success: false,
//         message: "AI returned invalid JSON. Try again.",
//       });
//     }

//     if (!parsed.questions || !Array.isArray(parsed.questions)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid response format from AI.",
//       });
//     }

//     // ✅ Success response
//     res.status(200).json({
//       success: true,
//       message: `Generated ${parsed.questions.length} questions successfully.`,
//       questions: parsed.questions,
//     });
//   } catch (error) {
//     console.error("🔥 Error generating questions:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while generating questions.",
//     });
//   }
// });

// module.exports = router;
// routes/generateQuestions.js
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
// const express = require("express");
// const router = express.Router();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// router.post("/", async (req, res) => {
//   try {
//     const { topics, countPerTopic = 2 } = req.body;

//     // ✅ Validate input
//     if (!topics || !Array.isArray(topics) || topics.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide an array of topics.",
//       });
//     }

//     let allQuestions = [];

//     // ✅ Loop through each topic and generate questions
//     for (const topic of topics) {
//       const prompt = `
// Generate ${countPerTopic} mixed difficulty questions about "${topic}".
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
//       `;

//       const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
//       const result = await model.generateContent(prompt);
//       const text = result.response.text();

//       // ✅ Parse AI output safely
//       try {
//         const match = text.match(/\[.*\]/s);
//         if (!match) throw new Error("No JSON array found for " + topic);
//         const questions = JSON.parse(match[0]);
//         allQuestions.push(...questions.map((q) => ({ ...q, topic })));
//       } catch (err) {
//         console.error(`AI returned invalid JSON for topic ${topic}:`, text);
//       }
//     }

//     if (allQuestions.length === 0) {
//       return res.json({
//         success: false,
//         message: "AI returned invalid format for all topics. Try again.",
//       });
//     }

//     // ✅ Shuffle all questions
//     const shuffled = allQuestions
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

// ✅ Use GEMINI_API_KEY1 for question generation
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY1);

router.post("/", async (req, res) => {
  try {
    const { topics, countPerTopic = 2 } = req.body;

    // ✅ Input validation
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
Generate ${countPerTopic} mixed difficulty multiple-choice questions on "${topic}".
Return ONLY a valid JSON array (no extra text or explanation).
Each question object must include:
{
  "text": "Question text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "A" | "B" | "C" | "D",
  "marks": number,
  "difficulty": "easy" | "medium" | "hard"
}
Example:
[
  {
    "text": "What is React?",
    "options": ["Library", "Framework", "Language", "Database"],
    "correctAnswer": "A",
    "marks": 2,
    "difficulty": "easy"
  }
]
      `;

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // ✅ Extract and parse JSON safely
        const jsonMatch = text.match(/\[.*\]/s);
        if (!jsonMatch) throw new Error(`Invalid JSON format for topic "${topic}"`);

        const questions = JSON.parse(jsonMatch[0]);
        allQuestions.push(...questions.map((q) => ({ ...q, topic })));
      } catch (err) {
        console.error(`❌ Failed to parse Gemini output for topic "${topic}":`, err.message);
      }
    }

    if (allQuestions.length === 0) {
      return res.json({
        success: false,
        message: "AI returned invalid format for all topics. Please try again.",
      });
    }

    // ✅ Shuffle questions randomly
    const shuffled = allQuestions
      .map((q) => ({ ...q, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...rest }) => rest);

    res.json({ success: true, questions: shuffled });
  } catch (error) {
    console.error("🔥 Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
});

module.exports = router;
