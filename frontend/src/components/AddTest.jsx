import React, { useState, useEffect } from "react";
import "../styles/addTest.css";

const AddTest = () => {
 
  const [testDetails, setTestDetails] = useState({
    title: "",
    subject: "",
    type: "",
    totalMarks: 0,
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
    topic: "",
    difficulty: "medium",
    type: "MCQ",
  });

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genTopic, setGenTopic] = useState(""); 
  const [genCount, setGenCount] = useState(5);
  const MAX_GEN = 30;

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setTestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...newQuestion.options];
    updated[index] = value;
    setNewQuestion((prev) => ({ ...prev, options: updated }));
  };

  
  useEffect(() => {
    const total = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);
    setTestDetails((prev) => ({ ...prev, totalMarks: total }));
  }, [questions]);

  
  const handleAddQuestion = () => {
    const { text, correctAnswer, marks, topic } = newQuestion;
    if (!text || !correctAnswer || !marks || !topic) {
      alert("⚠️ Please fill all question fields (text, correct answer, marks, topic).");
      return;
    }

    if (newQuestion.options.some((opt) => !opt)) {
      if (!window.confirm("Some options are empty. Continue adding?")) return;
    }

    setQuestions((prev) => [...prev, newQuestion]);
    setNewQuestion({ text: "", options: ["", "", "", ""], correctAnswer: "", marks: "", topic: "", difficulty: "medium", type: "MCQ" });
  };

  const handleDeleteQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  
  const handleGenerateWithGemini = async () => {
    if (!genTopic.trim()) return alert("⚠️ Please enter at least one topic.");
    const count = Number(genCount);
    if (!count || count <= 0) return alert("⚠️ Enter a valid number of questions.");
    if (count > MAX_GEN && !window.confirm(`You requested ${count} questions. Continue?`)) return;

    const topicsArray = genTopic.split(",").map((t) => t.trim()).filter((t) => t);

    setGenerating(true);
    try {
      const resp = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topics: topicsArray, countPerTopic: count }),
      });

      const raw = await resp.text();
      let data;
      try { data = JSON.parse(raw); } catch { alert("❌ Invalid AI response."); return; }

      if (!resp.ok || !data.success || !Array.isArray(data.questions)) {
        console.error("Generate error:", data);
        return alert("❌ Failed to generate questions. See console.");
      }

      const mapped = data.questions.map((q, i) => {
        const opts = Array.isArray(q.options) && q.options.length >= 4 ? q.options.slice(0, 4) : ["", "", "", ""];
        let correct = (q.correctAnswer || "A").toUpperCase();
        if (!["A","B","C","D"].includes(correct)) correct = "A";

        const marks = Number(q.marks) || (q.difficulty === "hard" ? 4 : q.difficulty === "medium" ? 2 : 1);
        const topic = topicsArray[i % topicsArray.length];

        return { text: q.text || `Question ${i+1}`, options: opts, correctAnswer: correct, marks, difficulty: q.difficulty || "medium", topic, type: q.type || "MCQ" };
      });

      setQuestions((prev) => [...prev, ...mapped]);
      alert(`✅ ${mapped.length} AI questions added successfully.`);
    } catch (err) {
      console.error("Error generating AI questions:", err);
      alert("❌ Error generating AI questions.");
    } finally {
      setGenerating(false);
    }
  };


  const handleSubmit = async () => {
    if (!testDetails.title.trim() || questions.length === 0) {
      return alert("⚠️ Test title and at least one question required.");
    }

    setLoading(true);
    try {
      const payload = { ...testDetails, questions, date: testDetails.date ? new Date(testDetails.date).toISOString() : undefined };

      const res = await fetch("http://localhost:5000/api/tests/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Test published successfully!");
        handleReset(false);
      } else alert(`❌ Failed to publish test: ${data.message || "Unknown error"}`);
    } catch (err) {
      console.error("Error publishing test:", err);
      alert("⚠️ Error publishing test. Check console.");
    } finally {
      setLoading(false);
    }
  };


  const handleReset = (showAlert = true) => {
    setTestDetails({ title: "", subject: "", type: "", totalMarks: 0, duration: "", date: "", instructions: "" });
    setQuestions([]);
    setNewQuestion({ text: "", options: ["", "", "", ""], correctAnswer: "", marks: "", topic: "", difficulty: "medium", type: "MCQ" });
    if (showAlert) alert("🔄 Form reset successfully.");
  };

 
  return (
    <div className="add-test-container">
      <h1>🧩 Create New Test</h1>
      <p>Fill details and add questions for students.</p>

    
      <section className="ai-generator">
        <h3>🤖 Generate Questions </h3>
        <div className="ai-row">
          <input type="text" placeholder="Topics (comma-separated)" value={genTopic} onChange={(e) => setGenTopic(e.target.value)} />
          <input type="number" min="1" max={MAX_GEN} value={genCount} onChange={(e) => setGenCount(e.target.value)} />
          <button onClick={handleGenerateWithGemini} disabled={generating}>{generating ? "Generating..." : "✨ Generate"}</button>
        
        </div>
         <br></br>
          <h4>NOTE: Count applies to each topic. </h4>
      </section>

      
      <section className="test-details">
        <h2>📋 Test Details</h2>
        <input type="text" name="title" placeholder="Title" value={testDetails.title} onChange={handleDetailChange} />
        <input type="text" name="subject" placeholder="Subject" value={testDetails.subject} onChange={handleDetailChange} />
        <select name="type" value={testDetails.type} onChange={handleDetailChange}>
          <option value="">Select Type</option>
          <option value="MCQ">MCQ</option>
          <option value="Aptitude">Aptitude</option>
          <option value="Coding">Coding</option>
        </select>
        <input type="number" name="duration" placeholder="Duration (minutes)" value={testDetails.duration} onChange={handleDetailChange} />
        <input type="datetime-local" name="date" value={testDetails.date} onChange={handleDetailChange} />
        <textarea name="instructions" placeholder="Instructions..." value={testDetails.instructions} onChange={handleDetailChange} />
        <p>💯 <strong>Total Marks:</strong> {testDetails.totalMarks}</p>
      </section>

   
      <section className="add-question">
        <h2>➕ Add Question</h2>
        <input type="text" placeholder="Topic" name="topic" value={newQuestion.topic} onChange={handleQuestionChange} />
        <textarea placeholder="Question text" name="text" value={newQuestion.text} onChange={handleQuestionChange} />
        <div className="options-grid">
          {newQuestion.options.map((opt, i) => (
            <input key={i} value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65+i)}`} />
          ))}
        </div>
        <div className="question-meta">
          <select name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleQuestionChange}>
            <option value="">Correct Answer</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <input type="number" name="marks" placeholder="Marks" value={newQuestion.marks} onChange={handleQuestionChange} />
          <select name="difficulty" value={newQuestion.difficulty} onChange={handleQuestionChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button onClick={handleAddQuestion}>➕ Add Question</button>

        {questions.length > 0 && (
          <div className="question-list">
            <h3>🧾 Added Questions ({questions.length})</h3>
            {questions.map((q, idx) => (
              <div key={idx} className="question-item">
                <p><strong>Q{idx+1}:</strong> {q.text}</p>
                <p><strong>Topic:</strong> {q.topic}</p>
                <ul>{q.options.map((opt,i) => <li key={i}>{String.fromCharCode(65+i)}. {opt}</li>)}</ul>
                <p>✅ Correct: {q.correctAnswer} | 💯 Marks: {q.marks} | 🔹 Difficulty: {q.difficulty}</p>
                <button onClick={() => handleDeleteQuestion(idx)}>❌ Delete</button>
              </div>
            ))}
          </div>
        )}
      </section>

     
      <section className="submit-section">
        <button onClick={handleSubmit} disabled={loading}>{loading ? "Publishing..." : "🚀 Publish Test"}</button>
        <button onClick={() => handleReset(true)}>🔄 Reset</button>
      </section>
    </div>
  );
};

export default AddTest;
