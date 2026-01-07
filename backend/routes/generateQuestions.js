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
