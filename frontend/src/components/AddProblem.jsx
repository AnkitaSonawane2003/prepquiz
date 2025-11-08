// // src/components/AddProblem.jsx
// import React, { useState } from "react";
// import "../styles/addProblem.css";

// const AddProblem = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     difficulty: "Easy",  // ✅ default value
//     type: "DSA",
//     description: "",
//     inputFormat: "",
//     outputFormat: "",
//     sampleInput: "",
//     sampleOutput: "",
//     tags: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     // Basic validation
//     if (!formData.title.trim() || !formData.description.trim()) {
//       alert("Please provide title and description.");
//       return;
//     }
//     if (!formData.difficulty) {
//       alert("Please select a difficulty level.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/problems/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("AddProblem response:", data);

//       if (res.ok && data.success) {
//         alert("✅ Problem saved successfully");

//         // ✅ reset form but keep valid defaults
//         setFormData({
//           title: "",
//           difficulty: "Easy", // ✅ default restored correctly
//           type: "DSA",
//           description: "",
//           inputFormat: "",
//           outputFormat: "",
//           sampleInput: "",
//           sampleOutput: "",
//           tags: "",
//         });
//       } else {
//         alert("❌ Save failed: " + (data.message || "Try again"));
//       }
//     } catch (err) {
//       console.error("Error saving problem:", err);
//       alert("⚠️ Server error. Check backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-problem-container-modern">
//       <h1 className="page-title-modern">
//         <span className="icon">📝</span>
//         <span className="text">Add a New Problem</span>
//       </h1>

//       <div className="cards-grid">
//         <div className="card">
//           <h2>🏷️ Title</h2>
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter problem title..."
//           />
//         </div>

//         <div className="card">
//           <h2>🌟 Difficulty</h2>
//           <select
//             name="difficulty"
//             value={formData.difficulty}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Difficulty --</option>
//             <option value="Easy">Easy 😎</option>
//             <option value="Medium">Medium 😐</option>
//             <option value="Hard">Hard 😰</option>
//           </select>
//         </div>

//         <div className="card">
//           <h2>📚 Type</h2>
//           <select name="type" value={formData.type} onChange={handleChange}>
//             <option value="DSA">DSA 💻</option>
//             <option value="Aptitude">Aptitude 🧠</option>
//           </select>
//         </div>

//         <div className="card-large">
//           <h2>🖋️ Problem Description</h2>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Write the full problem statement..."
//           />
//         </div>

//         <div className="card">
//           <h2>📥 Input Format</h2>
//           <textarea
//             name="inputFormat"
//             value={formData.inputFormat}
//             onChange={handleChange}
//             placeholder="Describe input format..."
//           />
//         </div>

//         <div className="card">
//           <h2>📤 Output Format</h2>
//           <textarea
//             name="outputFormat"
//             value={formData.outputFormat}
//             onChange={handleChange}
//             placeholder="Describe output format..."
//           />
//         </div>

//         <div className="card">
//           <h2>💡 Sample Input</h2>
//           <textarea
//             name="sampleInput"
//             value={formData.sampleInput}
//             onChange={handleChange}
//             placeholder="Provide sample input..."
//           />
//         </div>

//         <div className="card">
//           <h2>💡 Sample Output</h2>
//           <textarea
//             name="sampleOutput"
//             value={formData.sampleOutput}
//             onChange={handleChange}
//             placeholder="Provide sample output..."
//           />
//         </div>

//         <div className="card">
//           <h2>🏷️ Tags</h2>
//           <input
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             placeholder="comma,separated,tags"
//           />
//           <small className="hint">
//             Separate tags with commas (e.g. arrays,recursion)
//           </small>
//         </div>
//       </div>

//       <div className="actions-row">
//         <button
//           className="submit-btn-modern"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "➕ Add Problem"}
//         </button>

//         <button
//           className="cancel-btn"
//           onClick={() =>
//             setFormData({
//               title: "",
//               difficulty: "Easy", // ✅ same default here
//               type: "DSA",
//               description: "",
//               inputFormat: "",
//               outputFormat: "",
//               sampleInput: "",
//               sampleOutput: "",
//               tags: "",
//             })
//           }
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddProblem;
// import React, { useState } from "react";
// import "../styles/addProblem.css";

// const AddProblem = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     difficulty: "Easy", // default value
//     type: "DSA",
//     description: "",
//     inputFormat: "",
//     outputFormat: "",
//     sampleInput: "",
//     sampleOutput: "",
//     tags: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.description.trim()) {
//       alert("Please provide title and description.");
//       return;
//     }
//     if (!formData.difficulty) {
//       alert("Please select a difficulty level.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/problems/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("AddProblem response:", data);

//       if (res.ok && data.success) {
//         alert("✅ Problem saved successfully");
//         setFormData({
//           title: "",
//           difficulty: "Easy",
//           type: "DSA",
//           description: "",
//           inputFormat: "",
//           outputFormat: "",
//           sampleInput: "",
//           sampleOutput: "",
//           tags: "",
//         });
//       } else {
//         alert("❌ Save failed: " + (data.message || "Try again"));
//       }
//     } catch (err) {
//       console.error("Error saving problem:", err);
//       alert("⚠️ Server error. Check backend.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Generate DSA Problem using Gemini (Free)
//   const generateProblem = async () => {
//     const topic = prompt("Enter DSA topic (e.g., arrays, recursion, trees):");
//     if (!topic) return;

//     setAiLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/gemini/generate-dsa", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ topic }),
//       });

//       const data = await res.json();
//       if (data.success && data.problem) {
//         setFormData((prev) => ({
//           ...prev,
//           ...data.problem,
//         }));
//         alert("✅ Problem generated using Gemini!");
//       } else {
//         alert("❌ Failed to generate problem. Try again.");
//       }
//     } catch (error) {
//       console.error("AI generation error:", error);
//       alert("⚠️ Error connecting to Gemini API.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   return (
//     <div className="add-problem-container-modern">
//       <h1 className="page-title-modern">
//         <span className="icon">📝</span>
//         <span className="text">Add a New Problem</span>
//       </h1>

//       {/* 🧠 AI Generate Button */}
//       <div className="ai-section">
//         <button
//           className="ai-generate-btn"
//           onClick={generateProblem}
//           disabled={aiLoading}
//         >
//           {aiLoading ? "Generating..." : "🤖 Generate DSA Problem using AI"}
//         </button>
//       </div>

//       <div className="cards-grid">
//         <div className="card">
//           <h2>🏷️ Title</h2>
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter problem title..."
//           />
//         </div>

//         <div className="card">
//           <h2>🌟 Difficulty</h2>
//           <select
//             name="difficulty"
//             value={formData.difficulty}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Difficulty --</option>
//             <option value="Easy">Easy 😎</option>
//             <option value="Medium">Medium 😐</option>
//             <option value="Hard">Hard 😰</option>
//           </select>
//         </div>

//         <div className="card">
//           <h2>📚 Type</h2>
//           <select name="type" value={formData.type} onChange={handleChange}>
//             <option value="DSA">DSA 💻</option>
//             <option value="Aptitude">Aptitude 🧠</option>
//           </select>
//         </div>

//         <div className="card-large">
//           <h2>🖋️ Problem Description</h2>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Write the full problem statement..."
//           />
//         </div>

//         <div className="card">
//           <h2>📥 Input Format</h2>
//           <textarea
//             name="inputFormat"
//             value={formData.inputFormat}
//             onChange={handleChange}
//             placeholder="Describe input format..."
//           />
//         </div>

//         <div className="card">
//           <h2>📤 Output Format</h2>
//           <textarea
//             name="outputFormat"
//             value={formData.outputFormat}
//             onChange={handleChange}
//             placeholder="Describe output format..."
//           />
//         </div>

//         <div className="card">
//           <h2>💡 Sample Input</h2>
//           <textarea
//             name="sampleInput"
//             value={formData.sampleInput}
//             onChange={handleChange}
//             placeholder="Provide sample input..."
//           />
//         </div>

//         <div className="card">
//           <h2>💡 Sample Output</h2>
//           <textarea
//             name="sampleOutput"
//             value={formData.sampleOutput}
//             onChange={handleChange}
//             placeholder="Provide sample output..."
//           />
//         </div>

//         <div className="card">
//           <h2>🏷️ Tags</h2>
//           <input
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             placeholder="comma,separated,tags"
//           />
//           <small className="hint">
//             Separate tags with commas (e.g. arrays,recursion)
//           </small>
//         </div>
//       </div>

//       <div className="actions-row">
//         <button
//           className="submit-btn-modern"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "➕ Add Problem"}
//         </button>

//         <button
//           className="cancel-btn"
//           onClick={() =>
//             setFormData({
//               title: "",
//               difficulty: "Easy",
//               type: "DSA",
//               description: "",
//               inputFormat: "",
//               outputFormat: "",
//               sampleInput: "",
//               sampleOutput: "",
//               tags: "",
//             })
//           }
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddProblem;
// import React, { useState } from "react";
// import "../styles/addProblem.css";
// import Swal from "sweetalert2"; // 🧩 install via: npm install sweetalert2

// const AddProblem = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     difficulty: "Easy", // default value
//     type: "DSA",
//     description: "",
//     inputFormat: "",
//     outputFormat: "",
//     sampleInput: "",
//     sampleOutput: "",
//     tags: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Save problem manually
//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.description.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Fields!",
//         text: "Please provide both title and description.",
//       });
//       return;
//     }

//     if (!formData.difficulty) {
//       Swal.fire({
//         icon: "error",
//         title: "Difficulty Required!",
//         text: "Please select a difficulty level.",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/problems/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("AddProblem response:", data);

//       if (res.ok && data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Problem Saved!",
//           text: "✅ Problem added successfully!",
//           timer: 2000,
//           showConfirmButton: false,
//         });

//         setFormData({
//           title: "",
//           difficulty: "Easy",
//           type: "DSA",
//           description: "",
//           inputFormat: "",
//           outputFormat: "",
//           sampleInput: "",
//           sampleOutput: "",
//           tags: "",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed!",
//           text: data.message || "Save failed. Try again.",
//         });
//       }
//     } catch (err) {
//       console.error("Error saving problem:", err);
//       Swal.fire({
//         icon: "error",
//         title: "Server Error!",
//         text: "⚠️ Unable to connect to backend.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🤖 Generate DSA Problem using Gemini (with topic + difficulty)
// const generateProblem = async () => {
//   const topic = prompt("Enter DSA topic (e.g., arrays, recursion, trees):");
//   if (!topic) return;

//   const difficulty = prompt("Enter difficulty (Easy / Medium / Hard):");
//   if (!difficulty) return;

//   setAiLoading(true);
//   try {
//     const res = await fetch("http://localhost:5000/api/gemini/generate-dsa", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ topic, difficulty }), // ✅ both sent
//     });

//       const data = await res.json();
//       if (data.success && data.problem) {
//         setFormData((prev) => ({
//           ...prev,
//           ...data.problem,
//           difficulty: difficulty, // keep selected difficulty
//         }));

//         Swal.fire({
//           icon: "success",
//           title: "AI Problem Generated!",
//           text: `A ${difficulty} problem on "${topic}" was created successfully.`,
//           timer: 2500,
//           showConfirmButton: false,
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Generation Failed!",
//           text: "❌ AI could not generate a problem. Try again.",
//         });
//       }
//     } catch (error) {
//       console.error("AI generation error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Connection Error!",
//         text: "⚠️ Could not reach the Gemini API.",
//       });
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   return (
//     <div className="add-problem-container-modern">
//       <h1 className="page-title-modern">
//         <span className="icon">📝</span>
//         <span className="text">Add a New Problem</span>
//       </h1>

//       {/* 🤖 AI Generate Button */}
//       <div className="ai-section">
//         <button
//           className="ai-generate-btn"
//           onClick={generateProblem}
//           disabled={aiLoading}
//         >
//           {aiLoading ? "Generating..." : "🤖 Generate DSA Problem using AI"}
//         </button>
//       </div>

//       <div className="cards-grid">
//         <div className="card">
//           <h2>🏷️ Title</h2>
//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter problem title..."
//           />
//         </div>

//         <div className="card">
//           <h2>🌟 Difficulty</h2>
//           <select
//             name="difficulty"
//             value={formData.difficulty}
//             onChange={handleChange}
//           >
//             <option value="">-- Select Difficulty --</option>
//             <option value="Easy">Easy 😎</option>
//             <option value="Medium">Medium 😐</option>
//             <option value="Hard">Hard 😰</option>
//           </select>
//         </div>

//         <div className="card">
//           <h2>📚 Type</h2>
//           <select name="type" value={formData.type} onChange={handleChange}>
//             <option value="DSA">DSA 💻</option>
//             <option value="Aptitude">Aptitude 🧠</option>
//           </select>
//         </div>

//         <div className="card-large">
//           <h2>🖋️ Problem Description</h2>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Write the full problem statement..."
//           />
//         </div>

//         <div className="card">
//           <h2>📥 Input Format</h2>
//           <textarea
//             name="inputFormat"
//             value={formData.inputFormat}
//             onChange={handleChange}
//             placeholder="Describe input format..."
//           />
//         </div>

//         <div className="card">
//           <h2>📤 Output Format</h2>
//           <textarea
//             name="outputFormat"
//             value={formData.outputFormat}
//             onChange={handleChange}
//             placeholder="Describe output format..."
//           />
//         </div>

//         <div className="card">
//           <h2>💡 Sample Input</h2>
//           <textarea
//             name="sampleInput"
//             value={formData.sampleInput}
//             onChange={handleChange}
//             placeholder="Provide sample input..."
//           />
//         </div>

//         <div className="card">
//           <h2>💡 Sample Output</h2>
//           <textarea
//             name="sampleOutput"
//             value={formData.sampleOutput}
//             onChange={handleChange}
//             placeholder="Provide sample output..."
//           />
//         </div>

//         <div className="card">
//           <h2>🏷️ Tags</h2>
//           <input
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             placeholder="comma,separated,tags"
//           />
//           <small className="hint">
//             Separate tags with commas (e.g. arrays,recursion)
//           </small>
//         </div>
//       </div>

//       <div className="actions-row">
//         <button
//           className="submit-btn-modern"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "➕ Add Problem"}
//         </button>

//         <button
//           className="cancel-btn"
//           onClick={() =>
//             setFormData({
//               title: "",
//               difficulty: "Easy",
//               type: "DSA",
//               description: "",
//               inputFormat: "",
//               outputFormat: "",
//               sampleInput: "",
//               sampleOutput: "",
//               tags: "",
//             })
//           }
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddProblem;
import React, { useState } from "react";
import "../styles/addProblem.css";
import Swal from "sweetalert2"; // npm install sweetalert2

const AddProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    difficulty: "Easy", // default value
    type: "DSA",
    description: "",
    inputFormat: "",
    outputFormat: "",
    sampleInput: "",
    sampleOutput: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // For AI input fields
  const [aiTopic, setAiTopic] = useState("");
  const [aiDifficulty, setAiDifficulty] = useState("Easy");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save problem manually
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
      const res = await fetch("http://localhost:5000/api/problems/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  // 🤖 Generate DSA Problem using Gemini (topic + difficulty fields)
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
        setFormData((prev) => ({
          ...prev,
          ...data.problem,
          difficulty: aiDifficulty,
        }));

        Swal.fire({
          icon: "success",
          title: "AI Problem Generated!",
          text: `A ${aiDifficulty} problem on "${aiTopic}" was created successfully.`,
          timer: 2500,
          showConfirmButton: false,
        });
      } else {
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

      {/* 🤖 AI Generate Section */}
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