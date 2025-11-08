const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-questions", async (req, res) => {
  try {
    const { topic, count } = req.body;

    if (!topic || !count) {
      return res.status(400).json({
        success: false,
        message: "Both topic and question count are required.",
      });
    }

    const prompt = `
      You are an expert test creator.
      Generate ${count} high-quality multiple-choice questions (MCQs) on the topic "${topic}".
      Each question should include:
      - question text
      - exactly 4 options (A, B, C, D)
      - correct answer (A, B, C, or D)
      - difficulty (easy, medium, or hard)
      - marks (1-5)

      Return output in pure JSON format as:
      {
        "questions": [
          {
            "text": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "B",
            "difficulty": "medium",
            "marks": 2
          }
        ]
      }
      Ensure no extra text outside JSON.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", err);
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      return res.status(400).json({
        success: false,
        message: "Invalid response format from AI",
      });
    }

    res.status(200).json({
      success: true,
      message: `Generated ${parsed.questions.length} questions successfully`,
      questions: parsed.questions,
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while generating questions",
    });
  }
});

module.exports = router;
