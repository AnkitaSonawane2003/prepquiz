// const mongoose = require("mongoose");

// const submissionSchema = new mongoose.Schema({
//   problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
//   code: { type: String, required: true },
//   language: { type: String, required: true },
//   output: { type: String },
//   user: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Submission", submissionSchema);
const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  output: { type: String },
  user: { type: String }, // user's email
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
