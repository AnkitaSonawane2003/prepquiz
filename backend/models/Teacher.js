const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  phone: { type: String, default: '' },        // optional phone number
  employeeId: { type: String, default: '' },   // optional employee ID
}, { timestamps: true }); // add timestamps for createdAt and updatedAt

module.exports = mongoose.model('Teacher', teacherSchema);
