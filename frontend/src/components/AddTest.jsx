import React, { useState } from "react";
import "../styles/addTest.css";

const AddTest = () => {
  const [testDetails, setTestDetails] = useState({
    title: "",
    subject: "",
    type: "",
    totalMarks: "",
    duration: "",
    date: "",
    instructions: "",
  });

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle test details change
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setTestDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle question change
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...newQuestion.options];
    updated[index] = value;
    setNewQuestion({ ...newQuestion, options: updated });
  };

  // Add Question
  const handleAddQuestion = () => {
    if (!newQuestion.text || !newQuestion.correctAnswer || !newQuestion.marks) {
      alert("⚠️ Please fill all question fields before adding!");
      return;
    }

    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: "",
    });
  };

  const handleDeleteQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  // Publish Test
  const handleSubmit = async () => {
    if (!testDetails.title || questions.length === 0) {
      alert("⚠️ Please fill test details and add at least one question.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/tests/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...testDetails,
          questions,
        }),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (res.ok && data.success) {
        alert("✅ Test Published Successfully!");
        handleReset(false);
      } else {
        alert("❌ Failed to publish test. " + (data.message || "Try again."));
      }
    } catch (error) {
      console.error("❌ Error publishing test:", error);
      alert("⚠️ Server error. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = (showAlert = true) => {
    setTestDetails({
      title: "",
      subject: "",
      type: "",
      totalMarks: "",
      duration: "",
      date: "",
      instructions: "",
    });
    setQuestions([]);
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: "",
    });

    if (showAlert) alert("🔄 Test form has been reset.");
  };

  return (
    <div className="add-test-container">
      <h1 className="add-test-title">🧩 Create New Test</h1>
      <p className="add-test-subtitle">Fill details and add questions for students.</p>

      {/* Test Details */}
      <section className="test-details-card">
        <h2>📋 Test Details</h2>
        <div className="form-grid">
          <input type="text" name="title" value={testDetails.title} onChange={handleDetailChange} placeholder="Enter test title" />
          <input type="text" name="subject" value={testDetails.subject} onChange={handleDetailChange} placeholder="Enter subject" />
          <select name="type" value={testDetails.type} onChange={handleDetailChange}>
            <option value="">Select Test Type</option>
            <option value="MCQ">MCQ</option>
            <option value="Aptitude">Aptitude</option>
            <option value="Coding">Coding</option>
          </select>
          <input type="number" name="totalMarks" value={testDetails.totalMarks} onChange={handleDetailChange} placeholder="Total Marks" />
          <input type="number" name="duration" value={testDetails.duration} onChange={handleDetailChange} placeholder="Duration (minutes)" />
          <input type="datetime-local" name="date" value={testDetails.date} onChange={handleDetailChange} />
        </div>
        <textarea
          name="instructions"
          value={testDetails.instructions}
          onChange={handleDetailChange}
          placeholder="Write important instructions..."
          className="instructions-box"
        />
      </section>

      {/* Add Question Section */}
      <section className="add-question-card">
        <h2>➕ Add Questions</h2>
        <textarea name="text" value={newQuestion.text} onChange={handleQuestionChange} placeholder="Enter question..." />
        <div className="options-grid">
          {newQuestion.options.map((opt, i) => (
            <input key={i} type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
          ))}
        </div>
        <div className="question-meta">
          <select name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleQuestionChange}>
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>
          <input type="number" name="marks" value={newQuestion.marks} onChange={handleQuestionChange} placeholder="Marks" />
        </div>

        <button className="btn add-question-btn" onClick={handleAddQuestion}>
          ➕ Add Question
        </button>

        {questions.length > 0 && (
          <div className="question-list">
            <h3>🧾 Added Questions ({questions.length})</h3>
            {questions.map((q, index) => (
              <div className="question-item" key={index}>
                <p>
                  <strong>Q{index + 1}:</strong> {q.text}
                </p>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>{String.fromCharCode(65 + i)}. {opt}</li>
                  ))}
                </ul>
                <p>✅ <strong>Correct:</strong> {q.correctAnswer} | 💯 <strong>Marks:</strong> {q.marks}</p>
                <button className="btn delete-btn" onClick={() => handleDeleteQuestion(index)}>❌ Delete</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Submit Section */}
      <div className="submit-section">
        <button
          type="button"
          className="btn save-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Publishing..." : "🚀 Publish Test"}
        </button>
        <button className="btn reset-btn" onClick={() => handleReset(true)}>🔄 Reset</button>
      </div>
    </div>
  );
};

export default AddTest;
