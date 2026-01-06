// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const morgan = require("morgan");
// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(
//   cors({
//     origin: [
//        "http://localhost:5173", 
//       "https://prepquiz-jrpx-4kybnadud-ankita-sonawanes-projects.vercel.app",
//       "https://prepquiz-jrpx-git-ankitaprepquiz-ankita-sonawanes-projects.vercel.app",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );



// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// const testRoutes = require("./routes/testRoutes");
// const geminiRoutes = require("./routes/geminiRoutes"); // DSA route
// const generateQuestionsRoute = require("./routes/generateQuestions"); // MCQ route
// const compiler = require("./routes/compiler");
// const evaluationRoutes = require("./routes/evaluation");
// const testAttemptRoutes = require("./routes/testAttemptRoutes");

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/teacher", require("./routes/teacher"));
// app.use("/api/student", require("./routes/student"));
// app.use("/api/announcement", require("./routes/announcement"));
// app.use("/api/tests", testRoutes);
// app.use("/api/testAttempts", testAttemptRoutes);
// app.use("/api/contact", require("./routes/contact"));
// app.use("/api/problems", require("./routes/problemRoutes"));
// app.use("/api/gemini", geminiRoutes); // 
// app.use("/api/generate-questions", require("./routes/generateQuestions"));

// app.use("/uploads", express.static("uploads"));

// app.use("/api/submissions", require("./routes/submissionRoutes"));
// app.use("/api/compiler", compiler);
// app.use("/api/evaluation", evaluationRoutes);

// app.get("/", (req, res) => res.send("PrepQuiz API is running 🚀"));

// app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// (async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
//   } catch (err) {
//     console.error("❌ MongoDB Connection Failed:", err);
//     process.exit(1);
//   }
// })();
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ✅ IMPORTANT: Use Render's PORT
const PORT = process.env.PORT || 5000;

/* =========================
   MIDDLEWARES
========================= */

// ✅ Allow ALL origins since frontend is NOT deployed
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* =========================
   ROUTES
========================= */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/student", require("./routes/student"));
app.use("/api/announcement", require("./routes/announcement"));

app.use("/api/tests", require("./routes/testRoutes"));
app.use("/api/testAttempts", require("./routes/testAttemptRoutes"));

app.use("/api/contact", require("./routes/contact"));
app.use("/api/problems", require("./routes/problemRoutes"));

app.use("/api/gemini", require("./routes/geminiRoutes"));
app.use("/api/generate-questions", require("./routes/generateQuestions"));

app.use("/api/compiler", require("./routes/compiler"));
app.use("/api/evaluation", require("./routes/evaluation"));
app.use("/api/submissions", require("./routes/submissionRoutes"));

app.use("/uploads", express.static("uploads"));

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("PrepQuiz API is running 🚀");
});

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =========================
   START SERVER
========================= */

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
})();
