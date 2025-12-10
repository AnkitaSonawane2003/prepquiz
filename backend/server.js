const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
// server.js (or app.js)



dotenv.config();

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://prepquiz-jrpx-git-ankitaprepquiz-ankita-sonawanes-projects.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Import routes
const testRoutes = require("./routes/testRoutes");
const geminiRoutes = require("./routes/geminiRoutes"); // DSA route
const generateQuestionsRoute = require("./routes/generateQuestions"); // MCQ route
const compiler = require("./routes/compiler");
const evaluationRoutes = require("./routes/evaluation");
const testAttemptRoutes = require("./routes/testAttemptRoutes");

// ✅ Use routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/student", require("./routes/student"));
app.use("/api/announcement", require("./routes/announcement"));
app.use("/api/tests", testRoutes);
app.use("/api/testAttempts", testAttemptRoutes);
app.use("/api/contact", require("./routes/contact"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/gemini", geminiRoutes); // ✅ For DSA
app.use("/api/generate-questions", require("./routes/generateQuestions"));

app.use("/uploads", express.static("uploads"));

app.use("/api/submissions", require("./routes/submissionRoutes"));
app.use("/api/compiler", compiler);
app.use("/api/evaluation", evaluationRoutes);

app.get("/", (req, res) => res.send("PrepQuiz API is running 🚀"));

app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
})();
