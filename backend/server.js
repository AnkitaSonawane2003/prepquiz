// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // MongoDB connection

// Load environment variables from .env
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB()
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middleware
app.use(cors());           // Enable CORS for frontend-backend connection
app.use(express.json());   // Parse JSON request bodies

// ==============================
// 🚀 API ROUTES
// ==============================
app.use('/api/auth', require('./routes/auth'));       // Admin login
app.use('/api/admin', require('./routes/admin'));     // Admin creation
app.use('/api/teacher', require('./routes/teacher')); // Teacher registration & login
app.use('/api/student', require('./routes/student')); // ✅ Student registration & login

// ==============================
// 🌐 Serve React frontend in production
// ==============================
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // Serve frontend build folder
  app.use(express.static(path.join(__dirname1, 'frontend', 'dist')));

  // Handle React Router routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
  });
}

// ==============================
// 🟢 Start the server
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
