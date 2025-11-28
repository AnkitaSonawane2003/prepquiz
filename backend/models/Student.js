const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
   profileImage: { type: String, default: "" }, 
    resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
});

// ✅ Hash password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Student", studentSchema);
