const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
