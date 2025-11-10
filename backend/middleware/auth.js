// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_for_dev";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      console.error("[auth] Missing Authorization header");
      return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.error("[auth] Invalid Authorization format:", authHeader);
      return res.status(401).json({ success: false, message: "Invalid authorization format" });
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      console.error("[auth] Empty token after Bearer");
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log("[auth] decoded token:", decoded);
    } catch (err) {
      console.error("[auth] JWT verify error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid or expired token", error: err.message });
    }

    if (!decoded || !decoded.id) {
      console.error("[auth] decoded token missing id:", decoded);
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    // Try to find the user in Admin, Teacher, Student (priority order)
    const user =
      (await Admin.findById(decoded.id).select("-password")) ||
      (await Teacher.findById(decoded.id).select("-password")) ||
      (await Student.findById(decoded.id).select("-password"));

    if (!user) {
      console.error("[auth] No user found for id:", decoded.id);
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    req.userRole = user.role || null; // optional if you use role field
    return next();
  } catch (err) {
    console.error("[auth] Unexpected error:", err);
    return res.status(500).json({ success: false, message: "Server error in auth middleware" });
  }
};

module.exports = verifyToken;
