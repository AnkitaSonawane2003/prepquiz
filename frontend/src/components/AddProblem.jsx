import React, { useState } from "react";
import "../styles/addProblem.css";
import Swal from "sweetalert2"; 

const AddProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy", 
    type: "DSA",
    description: "",
    inputFormat: "",
    outputFormat: "",
    sampleInput: "",
    sampleOutput: "",
    tags: "",
    hiddenTests: [], 
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // For AI input fields
  const [aiTopic, setAiTopic] = useState("");
  const [aiDifficulty, setAiDifficulty] = useState("Easy");

  // Local inputs for adding a hidden test
  const [hiddenInputTemp, setHiddenInputTemp] = useState("");
  const [hiddenOutputTemp, setHiddenOutputTemp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const addHiddenTestCase = () => {
    if (!hiddenInputTemp.trim() || !hiddenOutputTemp.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Fields Missing!",
        text: "Hidden Input and Expected Output cannot be empty.",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      hiddenTests: [
        ...prev.hiddenTests,
        { input: hiddenInputTemp.trim(), output: hiddenOutputTemp.trim() },
      ],
    }));

    setHiddenInputTemp("");
    setHiddenOutputTemp("");

    Swal.fire({
      icon: "success",
      title: "Hidden test added",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const removeHiddenTestCase = (index) => {
    setFormData((prev) => ({
      ...prev,
      hiddenTests: prev.hiddenTests.filter((_, i) => i !== index),
    }));
  };

  const editHiddenTestCase = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.hiddenTests];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, hiddenTests: updated };
    });
  };


 const handleSubmit = async () => {
  if (!formData.title.trim() || !formData.description.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields!",
      text: "Please provide both title and description.",
    });
    return;
  }

  if (!formData.difficulty) {
    Swal.fire({
      icon: "error",
      title: "Difficulty Required!",
      text: "Please select a difficulty level.",
    });
    return;
  }

  setLoading(true);
  try {
   
    const payload = {
      ...formData,
      hiddenTestCases: formData.hiddenTests,
    };

    delete payload.hiddenTests; 

    const res = await fetch("http://localhost:5000/api/problems/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      Swal.fire({
        icon: "success",
        title: "Problem Saved!",
        text: "✅ Problem added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        title: "",
        difficulty: "Easy",
        type: "DSA",
        description: "",
        inputFormat: "",
        outputFormat: "",
        sampleInput: "",
        sampleOutput: "",
        tags: "",
        hiddenTests: [],
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: data.message || "Save failed. Try again.",
      });
    }
  } catch (err) {
    console.error("Error saving problem:", err);
    Swal.fire({
      icon: "error",
      title: "Server Error!",
      text: "⚠️ Unable to connect to backend.",
    });
  } finally {
    setLoading(false);
  }
};
  // Generate problem using Gemini (AI)
  const generateProblem = async () => {
    if (!aiTopic.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Topic Missing!",
        text: "Please enter a topic before generating.",
      });
      return;
    }

    if (!aiDifficulty.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Difficulty Missing!",
        text: "Please select a difficulty level before generating.",
      });
      return;
    }

    setAiLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/gemini/generate-dsa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiTopic, difficulty: aiDifficulty }),
      });

      const data = await res.json();
    if (data.success && data.problem) {
  const aiProblem = data.problem;

  const hiddenFromAI =
    aiProblem.hiddenTestCases ||
    aiProblem.hiddenTests ||
    aiProblem.hidden ||
    [];

  setFormData({
    title: aiProblem.title || "",
    difficulty: aiProblem.difficulty || aiDifficulty,
    type: "DSA",
    description: aiProblem.description || "",
    inputFormat: aiProblem.inputFormat || "",
    outputFormat: aiProblem.outputFormat || "",
    sampleInput: aiProblem.sampleInput || "",
    sampleOutput: aiProblem.sampleOutput || "",
    tags: aiProblem.tags || "",
    hiddenTests: hiddenFromAI,
  });

  Swal.fire({
    icon: "success",
    title: "AI Problem Generated!",
    text: `A ${aiDifficulty} problem on "${aiTopic}" was created successfully.`,
    timer: 2500,
    showConfirmButton: false,
  });
}
 else {
        Swal.fire({
          icon: "error",
          title: "Generation Failed!",
          text: "❌ AI could not generate a problem. Try again.",
        });
      }
    } catch (error) {
      console.error("AI generation error:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Error!",
        text: "⚠️ Could not reach the Gemini API.",
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="add-problem-container-modern">
      <h1 className="page-title-modern">
        <span className="icon">📝</span>
        <span className="text">Add a New Problem</span>
      </h1>


      <div className="ai-section">
        <input
          type="text"
          placeholder="Enter DSA Topic (e.g. Arrays, Trees)"
          value={aiTopic}
          onChange={(e) => setAiTopic(e.target.value)}
          className="ai-input"
        />

        <select
          value={aiDifficulty}
          onChange={(e) => setAiDifficulty(e.target.value)}
          className="ai-select"
        >
          <option value="Easy">Easy 😎</option>
          <option value="Medium">Medium 😐</option>
          <option value="Hard">Hard 😰</option>
        </select>

        <button
          className="ai-generate-btn"
          onClick={generateProblem}
          disabled={aiLoading}
        >
          {aiLoading ? "Generating..." : "🤖 Generate DSA Problem"}
        </button>
      </div>

      <div className="cards-grid">
        <div className="card">
          <h2>🏷️ Title</h2>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter problem title..."
          />
        </div>

        <div className="card">
          <h2>🌟 Difficulty</h2>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">-- Select Difficulty --</option>
            <option value="Easy">Easy 😎</option>
            <option value="Medium">Medium 😐</option>
            <option value="Hard">Hard 😰</option>
          </select>
        </div>

        <div className="card">
          <h2>📚 Type</h2>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="DSA">DSA 💻</option>
            <option value="Aptitude">Aptitude 🧠</option>
          </select>
        </div>

        <div className="card-large">
          <h2>🖋️ Problem Description</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write the full problem statement..."
          />
        </div>

        <div className="card">
          <h2>📥 Input Format</h2>
          <textarea
            name="inputFormat"
            value={formData.inputFormat}
            onChange={handleChange}
            placeholder="Describe input format..."
          />
        </div>

        <div className="card">
          <h2>📤 Output Format</h2>
          <textarea
            name="outputFormat"
            value={formData.outputFormat}
            onChange={handleChange}
            placeholder="Describe output format..."
          />
        </div>

        <div className="card">
          <h2>💡 Sample Input</h2>
          <textarea
            name="sampleInput"
            value={formData.sampleInput}
            onChange={handleChange}
            placeholder="Provide sample input..."
          />
        </div>

        <div className="card">
          <h2>💡 Sample Output</h2>
          <textarea
            name="sampleOutput"
            value={formData.sampleOutput}
            onChange={handleChange}
            placeholder="Provide sample output..."
          />
        </div>

        <div className="card">
          <h2>🏷️ Tags</h2>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="comma,separated,tags"
          />
          <small className="hint">
            Separate tags with commas (e.g. arrays,recursion)
          </small>
        </div>

      
        <div className="card-large">
          <h2>🕵️ Hidden Test Cases (Not visible to students)</h2>

          <p style={{ marginBottom: 6, color: "#555" }}>
            Add hidden test cases to validate solutions (these won't be shown to students).
          </p>

          <textarea
            placeholder="Hidden Test Input (exact format as the program expects)"
            value={hiddenInputTemp}
            onChange={(e) => setHiddenInputTemp(e.target.value)}
            style={{ minHeight: 80, marginBottom: 8 }}
          />

          <textarea
            placeholder="Expected Output (exact expected output for the above input)"
            value={hiddenOutputTemp}
            onChange={(e) => setHiddenOutputTemp(e.target.value)}
            style={{ minHeight: 80, marginBottom: 8 }}
          />

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button onClick={addHiddenTestCase} className="ai-generate-btn">
              ➕ Add Hidden Test
            </button>

            <button
              onClick={() => {
                setHiddenInputTemp("");
                setHiddenOutputTemp("");
              }}
              className="cancel-btn"
            >
              Clear
            </button>
          </div>

          {formData.hiddenTests && formData.hiddenTests.length > 0 && (
            <div className="hidden-test-list">
              <h3>Added Hidden Tests</h3>
              {formData.hiddenTests.map((t, idx) => (
                <div
                  key={idx}
                  className="hidden-test-item"
                  style={{
                    border: "1px solid #eee",
                    padding: 10,
                    marginBottom: 8,
                    borderRadius: 6,
                    background: "#fff",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Test #{idx + 1}</strong>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => removeHiddenTestCase(idx)}
                        className="cancel-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 600 }}>Input:</label>
                    <textarea
                      value={t.input}
                      onChange={(e) => editHiddenTestCase(idx, "input", e.target.value)}
                      style={{ width: "100%", minHeight: 60, marginTop: 6 }}
                    />
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <label style={{ fontWeight: 600 }}>Expected Output:</label>
                    <textarea
                      value={t.output}
                      onChange={(e) => editHiddenTestCase(idx, "output", e.target.value)}
                      style={{ width: "100%", minHeight: 60, marginTop: 6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="actions-row">
        <button
          className="submit-btn-modern"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "➕ Add Problem"}
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            setFormData({
              title: "",
              difficulty: "Easy",
              type: "DSA",
              description: "",
              inputFormat: "",
              outputFormat: "",
              sampleInput: "",
              sampleOutput: "",
              tags: "",
              hiddenTests: [],
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AddProblem;
