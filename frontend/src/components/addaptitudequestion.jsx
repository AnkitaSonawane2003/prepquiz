import React, { useState } from "react";
import "../styles/addProblem.css";

const AddProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "",
    type: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    sampleInput: "",
    sampleOutput: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Problem added:", formData);
    alert("✅ Problem Added Successfully!");
    setFormData({
      title: "",
      difficulty: "",
      type: "",
      description: "",
      inputFormat: "",
      outputFormat: "",
      sampleInput: "",
      sampleOutput: "",
      tags: "",
    });
  };

  return (
    <div className="add-problem-container-modern">
      <h1 className="page-title-modern">
  <span className="icon">📝</span>
  <span className="text">Add a New Problem</span>
</h1>


      <div className="cards-grid">
        <div className="card">
          <h2>🏷️ Title</h2>
          <input
            type="text"
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
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy 😎</option>
            <option value="Medium">Medium 😐</option>
            <option value="Hard">Hard 😰</option>
          </select>
        </div>

        <div className="card">
          <h2>📚 Type</h2>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select Type</option>
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
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="arrays, recursion, probability..."
          />
        </div>
      </div>

      <button className="submit-btn-modern" onClick={handleSubmit}>
        ➕ Add Problem
      </button>
    </div>
  );
};

export default AddProblem;
