// // import React, { useState } from "react";
// // import "../styles/addTest.css";

// // const AddTest = () => {
// //   const [testDetails, setTestDetails] = useState({
// //     title: "",
// //     subject: "",
// //     type: "",
// //     totalMarks: "",
// //     duration: "",
// //     date: "",
// //     instructions: "",
// //   });

// //   const [questions, setQuestions] = useState([]);
// //   const [newQuestion, setNewQuestion] = useState({
// //     text: "",
// //     options: ["", "", "", ""],
// //     correctAnswer: "",
// //     marks: "",
// //   });

// //   const [loading, setLoading] = useState(false);

// //   // Handle test details change
// //   const handleDetailChange = (e) => {
// //     const { name, value } = e.target;
// //     setTestDetails((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Handle question change
// //   const handleQuestionChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewQuestion((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleOptionChange = (index, value) => {
// //     const updated = [...newQuestion.options];
// //     updated[index] = value;
// //     setNewQuestion({ ...newQuestion, options: updated });
// //   };

// //   // Add Question
// //   const handleAddQuestion = () => {
// //     if (!newQuestion.text || !newQuestion.correctAnswer || !newQuestion.marks) {
// //       alert("⚠️ Please fill all question fields before adding!");
// //       return;
// //     }

// //     setQuestions([...questions, newQuestion]);
// //     setNewQuestion({
// //       text: "",
// //       options: ["", "", "", ""],
// //       correctAnswer: "",
// //       marks: "",
// //     });
// //   };

// //   const handleDeleteQuestion = (index) => {
// //     const updated = [...questions];
// //     updated.splice(index, 1);
// //     setQuestions(updated);
// //   };

// //   // Publish Test
// //   const handleSubmit = async () => {
// //     if (!testDetails.title || questions.length === 0) {
// //       alert("⚠️ Please fill test details and add at least one question.");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await fetch("http://localhost:5000/api/tests/add", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           ...testDetails,
// //           questions,
// //         }),
// //       });

// //       const data = await res.json();
// //       console.log("Server Response:", data);

// //       if (res.ok && data.success) {
// //         alert("✅ Test Published Successfully!");
// //         handleReset(false);
// //       } else {
// //         alert("❌ Failed to publish test. " + (data.message || "Try again."));
// //       }
// //     } catch (error) {
// //       console.error("❌ Error publishing test:", error);
// //       alert("⚠️ Server error. Please check your backend connection.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Reset form
// //   const handleReset = (showAlert = true) => {
// //     setTestDetails({
// //       title: "",
// //       subject: "",
// //       type: "",
// //       totalMarks: "",
// //       duration: "",
// //       date: "",
// //       instructions: "",
// //     });
// //     setQuestions([]);
// //     setNewQuestion({
// //       text: "",
// //       options: ["", "", "", ""],
// //       correctAnswer: "",
// //       marks: "",
// //     });

// //     if (showAlert) alert("🔄 Test form has been reset.");
// //   };

// //   return (
// //     <div className="add-test-container">
// //       <h1 className="add-test-title">🧩 Create New Test</h1>
// //       <p className="add-test-subtitle">Fill details and add questions for students.</p>

// //       {/* Test Details */}
// //       <section className="test-details-card">
// //         <h2>📋 Test Details</h2>
// //         <div className="form-grid">
// //           <input type="text" name="title" value={testDetails.title} onChange={handleDetailChange} placeholder="Enter test title" />
// //           <input type="text" name="subject" value={testDetails.subject} onChange={handleDetailChange} placeholder="Enter subject" />
// //           <select name="type" value={testDetails.type} onChange={handleDetailChange}>
// //             <option value="">Select Test Type</option>
// //             <option value="MCQ">MCQ</option>
// //             <option value="Aptitude">Aptitude</option>
// //             <option value="Coding">Coding</option>
// //           </select>
// //           <input type="number" name="totalMarks" value={testDetails.totalMarks} onChange={handleDetailChange} placeholder="Total Marks" />
// //           <input type="number" name="duration" value={testDetails.duration} onChange={handleDetailChange} placeholder="Duration (minutes)" />
// //           <input type="datetime-local" name="date" value={testDetails.date} onChange={handleDetailChange} />
// //         </div>
// //         <textarea
// //           name="instructions"
// //           value={testDetails.instructions}
// //           onChange={handleDetailChange}
// //           placeholder="Write important instructions..."
// //           className="instructions-box"
// //         />
// //       </section>

// //       {/* Add Question Section */}
// //       <section className="add-question-card">
// //         <h2>➕ Add Questions</h2>
// //         <textarea name="text" value={newQuestion.text} onChange={handleQuestionChange} placeholder="Enter question..." />
// //         <div className="options-grid">
// //           {newQuestion.options.map((opt, i) => (
// //             <input key={i} type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
// //           ))}
// //         </div>
// //         <div className="question-meta">
// //           <select name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleQuestionChange}>
// //             <option value="">Select Correct Answer</option>
// //             <option value="A">Option A</option>
// //             <option value="B">Option B</option>
// //             <option value="C">Option C</option>
// //             <option value="D">Option D</option>
// //           </select>
// //           <input type="number" name="marks" value={newQuestion.marks} onChange={handleQuestionChange} placeholder="Marks" />
// //         </div>

// //         <button className="btn add-question-btn" onClick={handleAddQuestion}>
// //           ➕ Add Question
// //         </button>

// //         {questions.length > 0 && (
// //           <div className="question-list">
// //             <h3>🧾 Added Questions ({questions.length})</h3>
// //             {questions.map((q, index) => (
// //               <div className="question-item" key={index}>
// //                 <p>
// //                   <strong>Q{index + 1}:</strong> {q.text}
// //                 </p>
// //                 <ul>
// //                   {q.options.map((opt, i) => (
// //                     <li key={i}>{String.fromCharCode(65 + i)}. {opt}</li>
// //                   ))}
// //                 </ul>
// //                 <p>✅ <strong>Correct:</strong> {q.correctAnswer} | 💯 <strong>Marks:</strong> {q.marks}</p>
// //                 <button className="btn delete-btn" onClick={() => handleDeleteQuestion(index)}>❌ Delete</button>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* Submit Section */}
// //       <div className="submit-section">
// //         <button
// //           type="button"
// //           className="btn save-btn"
// //           onClick={handleSubmit}
// //           disabled={loading}
// //         >
// //           {loading ? "Publishing..." : "🚀 Publish Test"}
// //         </button>
// //         <button className="btn reset-btn" onClick={() => handleReset(true)}>🔄 Reset</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddTest;
// // import React, { useState } from "react";
// // import "../styles/addTest.css";

// // const AddTest = () => {
// //   const [testDetails, setTestDetails] = useState({
// //     title: "",
// //     subject: "",
// //     type: "",
// //     totalMarks: "",
// //     duration: "",
// //     date: "",
// //     instructions: "",
// //   });

// //   const [questions, setQuestions] = useState([]);
// //   const [newQuestion, setNewQuestion] = useState({
// //     text: "",
// //     options: ["", "", "", ""],
// //     correctAnswer: "",
// //     marks: "",
// //   });

// //   const [loading, setLoading] = useState(false);

// //   // Handle test details change
// //   const handleDetailChange = (e) => {
// //     const { name, value } = e.target;
// //     setTestDetails((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Handle question change
// //   const handleQuestionChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewQuestion((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleOptionChange = (index, value) => {
// //     const updated = [...newQuestion.options];
// //     updated[index] = value;
// //     setNewQuestion({ ...newQuestion, options: updated });
// //   };

// //   // Add Question
// //   const handleAddQuestion = () => {
// //     if (!newQuestion.text || !newQuestion.correctAnswer || !newQuestion.marks) {
// //       alert("⚠️ Please fill all question fields before adding!");
// //       return;
// //     }

// //     // basic option check
// //     if (newQuestion.options.some((opt) => !opt)) {
// //       if (!window.confirm("Some options are empty. Do you still want to add?")) return;
// //     }

// //     setQuestions((prev) => [...prev, newQuestion]);
// //     setNewQuestion({
// //       text: "",
// //       options: ["", "", "", ""],
// //       correctAnswer: "",
// //       marks: "",
// //     });
// //   };

// //   const handleDeleteQuestion = (index) => {
// //     const updated = [...questions];
// //     updated.splice(index, 1);
// //     setQuestions(updated);
// //   };

// //   // Publish Test (improved error handling)
// // const handleSubmit = async () => {
// //   // --- Immediate debug so we know the handler ran ---
// //   console.log("DEBUG: handleSubmit invoked");
// //   console.log("DEBUG testDetails (raw):", testDetails);
// //   console.log("DEBUG questions (raw):", questions);

// //   // Trim title to avoid whitespace-only titles causing the guard to trigger unexpectedly
// //   const trimmedTitle = (testDetails.title || "").toString().trim();

// //   if (!trimmedTitle || !Array.isArray(questions) || questions.length === 0) {
// //     alert("⚠️ Please fill test title and add at least one question.");
// //     console.warn("Validation failed:", { trimmedTitle, questionsLength: (questions || []).length });
// //     return;
// //   }

// //   setLoading(true);

// //   try {
// //     // Build payload (convert date to ISO if present)
// //     const payload = {
// //       ...testDetails,
// //       title: trimmedTitle,
// //       date: testDetails.date ? new Date(testDetails.date).toISOString() : undefined,
// //       questions,
// //     };

// //     console.log("DEBUG sending payload:", payload);

// //     const res = await fetch("http://localhost:5000/api/tests/add", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     // show HTTP status & headers for debugging
// //     console.log("DEBUG response status:", res.status, res.statusText);
// //     console.log("DEBUG response headers:", Array.from(res.headers.entries()));

// //     const raw = await res.text();
// //     console.log("DEBUG raw response body:", raw);

// //     // Try parse JSON, but if server returned HTML/error page, show it to help debugging
// //     let data;
// //     try {
// //       data = raw ? JSON.parse(raw) : {};
// //     } catch (err) {
// //       console.warn("Server returned non-JSON response:", raw);
// //       // Surface non-JSON body and status to the user for debugging
// //       alert("❌ Server returned non-JSON response. Check console. Response preview:\n\n" + raw.slice(0, 1000));
// //       throw new Error("Server returned non-JSON response: " + raw);
// //     }

// //     console.log("Server parsed response:", data);

// //     if (res.ok && data && data.success) {
// //       alert("✅ Test Published Successfully!");
// //       handleReset(false);
// //     } else {
// //       // show detailed message if available
// //       const serverMsg = (data && (data.message || JSON.stringify(data))) || "Unknown error";
// //       alert(`❌ Failed to publish test. HTTP ${res.status}. Server says: ${serverMsg}`);
// //       console.error("Publish failed:", { status: res.status, data });
// //     }
// //   } catch (error) {
// //     console.error("Error publishing test:", error);
// //     // Provide more informative alert so you know where to look
// //     alert("⚠️ Error publishing test. Check console (F12) and server logs. " + (error.message || ""));
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// //   // Reset form
// //   const handleReset = (showAlert = true) => {
// //     setTestDetails({
// //       title: "",
// //       subject: "",
// //       type: "",
// //       totalMarks: "",
// //       duration: "",
// //       date: "",
// //       instructions: "",
// //     });
// //     setQuestions([]);
// //     setNewQuestion({
// //       text: "",
// //       options: ["", "", "", ""],
// //       correctAnswer: "",
// //       marks: "",
// //     });

// //     if (showAlert) alert("🔄 Test form has been reset.");
// //   };

// //   return (
// //     <div className="add-test-container">
// //       <h1 className="add-test-title">🧩 Create New Test</h1>
// //       <p className="add-test-subtitle">Fill details and add questions for students.</p>

// //       {/* Test Details */}
// //       <section className="test-details-card">
// //         <h2>📋 Test Details</h2>
// //         <div className="form-grid">
// //           <input type="text" name="title" value={testDetails.title} onChange={handleDetailChange} placeholder="Enter test title" />
// //           <input type="text" name="subject" value={testDetails.subject} onChange={handleDetailChange} placeholder="Enter subject" />
// //           <select name="type" value={testDetails.type} onChange={handleDetailChange}>
// //             <option value="">Select Test Type</option>
// //             <option value="MCQ">MCQ</option>
// //             <option value="Aptitude">Aptitude</option>
// //             <option value="Coding">Coding</option>
// //           </select>
// //           <input type="number" name="totalMarks" value={testDetails.totalMarks} onChange={handleDetailChange} placeholder="Total Marks" />
// //           <input type="number" name="duration" value={testDetails.duration} onChange={handleDetailChange} placeholder="Duration (minutes)" />
// //           <input type="datetime-local" name="date" value={testDetails.date} onChange={handleDetailChange} />
// //         </div>
// //         <textarea
// //           name="instructions"
// //           value={testDetails.instructions}
// //           onChange={handleDetailChange}
// //           placeholder="Write important instructions..."
// //           className="instructions-box"
// //         />
// //       </section>

// //       {/* Add Question Section */}
// //       <section className="add-question-card">
// //         <h2>➕ Add Questions</h2>
// //         <textarea name="text" value={newQuestion.text} onChange={handleQuestionChange} placeholder="Enter question..." />
// //         <div className="options-grid">
// //           {newQuestion.options.map((opt, i) => (
// //             <input key={i} type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${String.fromCharCode(65 + i)}`} />
// //           ))}
// //         </div>
// //         <div className="question-meta">
// //           <select name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleQuestionChange}>
// //             <option value="">Select Correct Answer</option>
// //             <option value="A">Option A</option>
// //             <option value="B">Option B</option>
// //             <option value="C">Option C</option>
// //             <option value="D">Option D</option>
// //           </select>
// //           <input type="number" name="marks" value={newQuestion.marks} onChange={handleQuestionChange} placeholder="Marks" />
// //         </div>

// //         <button className="btn add-question-btn" type="button" onClick={handleAddQuestion}>
// //           ➕ Add Question
// //         </button>

// //         {questions.length > 0 && (
// //           <div className="question-list">
// //             <h3>🧾 Added Questions ({questions.length})</h3>
// //             {questions.map((q, index) => (
// //               <div className="question-item" key={index}>
// //                 <p>
// //                   <strong>Q{index + 1}:</strong> {q.text}
// //                 </p>
// //                 <ul>
// //                   {q.options.map((opt, i) => (
// //                     <li key={i}>{String.fromCharCode(65 + i)}. {opt}</li>
// //                   ))}
// //                 </ul>
// //                 <p>✅ <strong>Correct:</strong> {q.correctAnswer} | 💯 <strong>Marks:</strong> {q.marks}</p>
// //                 <button className="btn delete-btn" type="button" onClick={() => handleDeleteQuestion(index)}>❌ Delete</button>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* Submit Section */}
// //       {/* Submit Section — debug version */}
// // <div className="submit-section">
// //   <button
// //     type="button"
// //     className="btn save-btn"
// //     onClick={() => {
// //       console.log("DEBUG: Publish button clicked");
// //       alert("DEBUG: Publish clicked");
// //       handleSubmit();
// //     }}
// //     disabled={loading}
// //   >
// //     {loading ? "Publishing..." : "🚀 Publish Test"}
// //   </button>
// //   <button className="btn reset-btn" type="button" onClick={() => handleReset(true)}>🔄 Reset</button>
// // </div>

// //     </div>
// //   );
// // };

// // export default AddTest;
// // src/components/AddTest.jsx
// import React, { useState } from "react";
// import "../styles/addTest.css";

// const AddTest = () => {
//   // Test details
//   const [testDetails, setTestDetails] = useState({
//     title: "",
//     subject: "",
//     type: "",
//     totalMarks: "",
//     duration: "",
//     date: "",
//     instructions: "",
//   });

//   // Questions state
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctAnswer: "",
//     marks: "",
//   });

//   // Loading states
//   const [loading, setLoading] = useState(false);
//   const [generating, setGenerating] = useState(false);

//   // Gemini generate inputs
//   const [genTopic, setGenTopic] = useState("");
//   const [genCount, setGenCount] = useState(5); // default 5
//   const MAX_GEN = 30;

//   // --- Handlers for test details ---
//   const handleDetailChange = (e) => {
//     const { name, value } = e.target;
//     setTestDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   // --- Handlers for creating a single question manually ---
//   const handleQuestionChange = (e) => {
//     const { name, value } = e.target;
//     setNewQuestion((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOptionChange = (index, value) => {
//     const updated = [...newQuestion.options];
//     updated[index] = value;
//     setNewQuestion({ ...newQuestion, options: updated });
//   };

//   const handleAddQuestion = () => {
//     if (!newQuestion.text || !newQuestion.correctAnswer || !newQuestion.marks) {
//       alert("⚠️ Please fill question text, correct answer, and marks.");
//       return;
//     }

//     // Basic option completeness check (optional)
//     if (newQuestion.options.some((opt) => !opt)) {
//       if (!window.confirm("Some options are empty. Do you want to add the question anyway?")) return;
//     }

//     setQuestions((prev) => [...prev, newQuestion]);
//     setNewQuestion({
//       text: "",
//       options: ["", "", "", ""],
//       correctAnswer: "",
//       marks: "",
//     });
//   };

//   const handleDeleteQuestion = (index) => {
//     const updated = [...questions];
//     updated.splice(index, 1);
//     setQuestions(updated);
//   };

//   // --- Gemini generation handler (calls your backend) ---
//   const handleGenerateWithGemini = async () => {
//     const topic = (genTopic || "").toString().trim();
//     const count = Number(genCount);

//     if (!topic) {
//       alert("Please enter a topic for the AI to generate questions.");
//       return;
//     }
//     if (!count || count <= 0) {
//       alert("Please enter a valid number of questions.");
//       return;
//     }
//     if (count > MAX_GEN) {
//       if (!window.confirm(`You requested ${count} questions. This may cost more. Continue?`)) return;
//     }

//     setGenerating(true);
//     try {
//      const resp = await fetch("http://localhost:5000/api/generate-questions", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ topic, count }),
// });

//       const text = await resp.text();
//       // Try parse JSON safely
//       let parsed;
//       try {
//         parsed = text ? JSON.parse(text) : {};
//       } catch (err) {
//         console.error("AI returned non-JSON:", text);
//         alert("❌ AI returned invalid response. Check server logs.");
//         return;
//       }

//       if (!resp.ok || !parsed.success || !Array.isArray(parsed.questions)) {
//         console.error("Generate error:", parsed);
//         alert("❌ Failed to generate questions. See console for details.");
//         return;
//       }

//       // Map/validate each AI question into our shape
//       const mapped = parsed.questions.map((q, i) => {
//         const opts = Array.isArray(q.options) && q.options.length >= 4
//           ? q.options.slice(0, 4)
//           : ["", "", "", ""];
//         // Ensure correctAnswer is A/B/C/D (if model returned index or text, try to normalize)
//         let correct = (q.correctAnswer || "").toString().trim();
//         // If correct is a number like 0/1/2/3 -> convert to letter
//         if (/^\d+$/.test(correct)) {
//           const idx = Number(correct);
//           if (idx >= 0 && idx < 4) correct = String.fromCharCode(65 + idx);
//         } else if (/^[a-d]$/i.test(correct)) {
//           correct = correct.toUpperCase();
//         } else if (typeof correct === "string" && correct.length > 1) {
//           // try to match option text to determine letter
//           const matchIdx = opts.findIndex(opt => opt && correct.toLowerCase() === opt.toLowerCase());
//           if (matchIdx >= 0) correct = String.fromCharCode(65 + matchIdx);
//         }
//         // Ensure marks is a number
//         const marks = Number(q.marks) || (q.difficulty === "hard" ? 4 : q.difficulty === "medium" ? 2 : 1);

//         // final shape
//         return {
//           text: q.text || `Question ${i + 1}`,
//           options: opts,
//           correctAnswer: ["A","B","C","D"].includes(correct) ? correct : "A",
//           marks,
//           difficulty: q.difficulty || "medium",
//         };
//       });

//       // Mix / shuffle result so difficulties are interleaved
//       const shuffled = mapped
//         .map((it) => ({ ...it, _r: Math.random() }))
//         .sort((a, b) => a._r - b._r)
//         .map(({ _r, ...rest }) => rest);

//       // Append to existing questions
//       setQuestions((prev) => [...prev, ...shuffled]);
//       alert(`✅ ${shuffled.length} questions generated and added.`);
//     } catch (err) {
//       console.error("Error generating questions:", err);
//       alert("❌ Error generating questions. Check console and server logs.");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   // --- Publish Test (improved error handling) ---
//   const handleSubmit = async () => {
//     console.log("DEBUG: handleSubmit invoked");
//     console.log("DEBUG testDetails (raw):", testDetails);
//     console.log("DEBUG questions (raw):", questions);

//     const trimmedTitle = (testDetails.title || "").toString().trim();
//     if (!trimmedTitle || !Array.isArray(questions) || questions.length === 0) {
//       alert("⚠️ Please fill test title and add at least one question.");
//       console.warn("Validation failed:", { trimmedTitle, questionsLength: (questions || []).length });
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         ...testDetails,
//         title: trimmedTitle,
//         date: testDetails.date ? new Date(testDetails.date).toISOString() : undefined,
//         questions,
//       };

//       console.log("DEBUG sending payload:", payload);

//       const res = await fetch("http://localhost:5000/api/tests/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       console.log("DEBUG response status:", res.status, res.statusText);
//       const raw = await res.text();
//       console.log("DEBUG raw response body:", raw);

//       let data;
//       try {
//         data = raw ? JSON.parse(raw) : {};
//       } catch (err) {
//         console.warn("Server returned non-JSON response:", raw);
//         alert("❌ Server returned non-JSON response. Check console. Response preview:\n\n" + raw.slice(0, 1000));
//         throw new Error("Server returned non-JSON response: " + raw);
//       }

//       console.log("Server parsed response:", data);

//       if (res.ok && data && data.success) {
//         alert("✅ Test Published Successfully!");
//         handleReset(false);
//       } else {
//         const serverMsg = (data && (data.message || JSON.stringify(data))) || "Unknown error";
//         alert(`❌ Failed to publish test. HTTP ${res.status}. Server says: ${serverMsg}`);
//         console.error("Publish failed:", { status: res.status, data });
//       }
//     } catch (error) {
//       console.error("Error publishing test:", error);
//       alert("⚠️ Error publishing test. Check console (F12) and server logs. " + (error.message || ""));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Reset form ---
//   const handleReset = (showAlert = true) => {
//     setTestDetails({
//       title: "",
//       subject: "",
//       type: "",
//       totalMarks: "",
//       duration: "",
//       date: "",
//       instructions: "",
//     });
//     setQuestions([]);
//     setNewQuestion({
//       text: "",
//       options: ["", "", "", ""],
//       correctAnswer: "",
//       marks: "",
//     });
//     if (showAlert) alert("🔄 Test form has been reset.");
//   };

//   // --- JSX render ---
//   return (
//     <div className="add-test-container">
//       <h1 className="add-test-title">🧩 Create New Test</h1>
//       <p className="add-test-subtitle">Fill details and add questions for students.</p>

//       {/* ===== Gemini Generate Panel ===== */}
//       {/* ===== Gemini Generate Panel (editable fix) ===== */}
// <section className="ai-generate-panel" style={{ position: "relative", zIndex: 20 }}>
//   <h3>Generate Questions (Gemini)</h3>

//   <div className="ai-row" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
//     {/* Topic input */}
//     <input
//       type="text"
//       placeholder="Enter topic (e.g., Arrays in JavaScript)"
//       value={genTopic}
//       onChange={(e) => setGenTopic(e.target.value)}
//       className="ai-input"
//       style={{ flex: 1, minWidth: 180 }}
//       autoComplete="off"
//       aria-label="AI Topic"
//     />

//     {/* Number input */}
//     <input
//       type="number"
//       placeholder="Count"
//       value={genCount}
//       onChange={(e) => {
//         // keep only numeric value; convert empty -> ""
//         const v = e.target.value;
//         // allow empty string so user can clear field
//         if (v === "") return setGenCount("");
//         // parse to integer and clamp to [1, MAX_GEN]
//         const parsed = parseInt(v, 10);
//         if (isNaN(parsed)) return setGenCount("");
//         setGenCount(Math.max(1, parsed));
//       }}
//       min="1"
//       max={MAX_GEN}
//       className="ai-input small"
//       style={{ width: 90 }}
//       aria-label="Number of questions"
//     />

//     {/* Generate button */}
//     <button
//       type="button"
//       onClick={handleGenerateWithGemini}
//       disabled={generating}
//       className="btn gen-btn"
//       style={{ whiteSpace: "nowrap" }}
//     >
//       {generating ? "Generating..." : "Generate with Gemini"}
//     </button>
//   </div>

//   <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//     <small style={{ color: "#555" }}>Tip: request 5–15 for reliable results; max {MAX_GEN}.</small>
//     <button
//       type="button"
//       onClick={() => { setGenTopic(""); setGenCount(5); }}
//       className="btn"
//       style={{ padding: "4px 8px" }}
//     >
//       Clear
//     </button>
//   </div>
// </section>

//       {/* ===== Test Details ===== */}
//       <section className="test-details-card">
//         <h2>📋 Test Details</h2>
//         <div className="form-grid">
//           <input type="text" name="title" value={testDetails.title} onChange={handleDetailChange} placeholder="Enter test title" />
//           <input type="text" name="subject" value={testDetails.subject} onChange={handleDetailChange} placeholder="Enter subject" />
//           <select name="type" value={testDetails.type} onChange={handleDetailChange}>
//             <option value="">Select Test Type</option>
//             <option value="MCQ">MCQ</option>
//             <option value="Aptitude">Aptitude</option>
//             <option value="Coding">Coding</option>
//           </select>
//           <input type="number" name="totalMarks" value={testDetails.totalMarks} onChange={handleDetailChange} placeholder="Total Marks" />
//           <input type="number" name="duration" value={testDetails.duration} onChange={handleDetailChange} placeholder="Duration (minutes)" />
//           <input type="datetime-local" name="date" value={testDetails.date} onChange={handleDetailChange} />
//         </div>
//         <textarea
//           name="instructions"
//           value={testDetails.instructions}
//           onChange={handleDetailChange}
//           placeholder="Write important instructions..."
//           className="instructions-box"
//         />
//       </section>

//       {/* ===== Add Question Section (manual) ===== */}
//       <section className="add-question-card">
//         <h2>➕ Add Questions</h2>
//         <textarea name="text" value={newQuestion.text} onChange={handleQuestionChange} placeholder="Enter question..." />
//         <div className="options-grid">
//           {newQuestion.options.map((opt, i) => (
//             <input
//               key={i}
//               type="text"
//               value={opt}
//               onChange={(e) => handleOptionChange(i, e.target.value)}
//               placeholder={`Option ${String.fromCharCode(65 + i)}`}
//             />
//           ))}
//         </div>
//         <div className="question-meta">
//           <select name="correctAnswer" value={newQuestion.correctAnswer} onChange={handleQuestionChange}>
//             <option value="">Select Correct Answer</option>
//             <option value="A">Option A</option>
//             <option value="B">Option B</option>
//             <option value="C">Option C</option>
//             <option value="D">Option D</option>
//           </select>
//           <input type="number" name="marks" value={newQuestion.marks} onChange={handleQuestionChange} placeholder="Marks" />
//         </div>

//         <button className="btn add-question-btn" type="button" onClick={handleAddQuestion}>
//           ➕ Add Question
//         </button>

//         {questions.length > 0 && (
//           <div className="question-list">
//             <h3>🧾 Added Questions ({questions.length})</h3>
//             {questions.map((q, index) => (
//               <div className="question-item" key={index}>
//                 <p><strong>Q{index + 1}:</strong> {q.text}</p>
//                 <ul>
//                   {q.options.map((opt, i) => (
//                     <li key={i}>{String.fromCharCode(65 + i)}. {opt}</li>
//                   ))}
//                 </ul>
//                 <p>✅ <strong>Correct:</strong> {q.correctAnswer} | 💯 <strong>Marks:</strong> {q.marks} {q.difficulty ? `| ♟ ${q.difficulty}` : null}</p>
//                 <button className="btn delete-btn" type="button" onClick={() => handleDeleteQuestion(index)}>❌ Delete</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ===== Submit Section ===== */}
//       <div className="submit-section">
//         <button
//           type="button"
//           className="btn save-btn"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Publishing..." : "🚀 Publish Test"}
//         </button>
//         <button className="btn reset-btn" type="button" onClick={() => handleReset(true)}>🔄 Reset</button>
//       </div>
//     </div>
//   );
// };

// export default AddTest;
// src/components/AddTest.jsx
import React, { useState,useEffect } from "react";
import "../styles/addTest.css";

const AddTest = () => {
  // --- STATES ---
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
  const [generating, setGenerating] = useState(false);
  const [genTopic, setGenTopic] = useState("");
  const [genCount, setGenCount] = useState(5);
  const MAX_GEN = 30;

  // --- HANDLERS ---
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
    setNewQuestion({ ...newQuestion, options: updated });
  };



  // --- Auto-update total marks when questions change ---
useEffect(() => {
  if (questions.length > 0) {
    const total = questions.reduce((sum, q) => sum + Number(q.marks || 0), 0);
    setTestDetails((prev) => ({ ...prev, totalMarks: total }));
  } else {
    setTestDetails((prev) => ({ ...prev, totalMarks: 0 }));
  }
}, [questions]);

  // --- ADD QUESTION ---
  const handleAddQuestion = () => {
    if (!newQuestion.text || !newQuestion.correctAnswer || !newQuestion.marks) {
      alert("⚠️ Please fill question text, correct answer, and marks.");
      return;
    }

    if (newQuestion.options.some((opt) => !opt)) {
      if (!window.confirm("Some options are empty. Do you still want to add?")) return;
    }

    setQuestions((prev) => [...prev, newQuestion]);
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

  // --- AI (Gemini) Question Generation ---
const handleGenerateWithGemini = async () => {
  const topic = (genTopic || "").trim();
  const count = Number(genCount);

  if (!topic) {
    alert("Please enter a topic for the AI to generate questions.");
    return;
  }
  if (!count || count <= 0) {
    alert("Please enter a valid number of questions.");
    return;
  }
  if (count > MAX_GEN && !window.confirm(`You requested ${count} questions. Continue?`)) return;

  setGenerating(true);
  try {
    const resp = await fetch("http://localhost:5000/api/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // ✅ send topics as an array (backend expects this)
      body: JSON.stringify({
        topics: [topic],        // wrap single topic in array
        countPerTopic: count,   // backend expects this key name
      }),
    });

    const text = await resp.text();
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch {
      console.error("AI returned invalid JSON:", text);
      alert("❌ AI returned invalid response. Check server logs.");
      return;
    }

    if (!resp.ok || !parsed.success || !Array.isArray(parsed.questions)) {
      console.error("Generate error:", parsed);
      alert("❌ Failed to generate questions. See console for details.");
      return;
    }

    const mapped = parsed.questions.map((q, i) => {
      const opts = Array.isArray(q.options) && q.options.length >= 4
        ? q.options.slice(0, 4)
        : ["", "", "", ""];
      let correct = (q.correctAnswer || "").trim();

      if (/^\d+$/.test(correct)) correct = String.fromCharCode(65 + Number(correct));
      else if (/^[a-d]$/i.test(correct)) correct = correct.toUpperCase();
      else {
        const idx = opts.findIndex(opt => opt && opt.toLowerCase() === correct.toLowerCase());
        if (idx >= 0) correct = String.fromCharCode(65 + idx);
      }

      const marks = Number(q.marks) || (q.difficulty === "hard" ? 4 : q.difficulty === "medium" ? 2 : 1);

      return {
        text: q.text || `Question ${i + 1}`,
        options: opts,
        correctAnswer: ["A", "B", "C", "D"].includes(correct) ? correct : "A",
        marks,
        difficulty: q.difficulty || "medium",
      };
    });

    setQuestions((prev) => [...prev, ...mapped]);
    alert(`✅ ${mapped.length} AI questions added successfully.`);
  } catch (err) {
    console.error("Error generating AI questions:", err);
    alert("❌ Error generating questions. Check console and backend logs.");
  } finally {
    setGenerating(false);
  }
};


  // --- SUBMIT TEST ---
  const handleSubmit = async () => {
    const trimmedTitle = (testDetails.title || "").trim();
    if (!trimmedTitle || !Array.isArray(questions) || questions.length === 0) {
      alert("⚠️ Please fill test title and add at least one question.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...testDetails,
        title: trimmedTitle,
        date: testDetails.date ? new Date(testDetails.date).toISOString() : undefined,
        questions,
      };

      const res = await fetch("http://localhost:5000/api/tests/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        alert("❌ Server returned non-JSON response. Check console.");
        console.log("Server raw response:", raw);
        return;
      }

      if (res.ok && data.success) {
        alert("✅ Test Published Successfully!");
        handleReset(false);
      } else {
        alert(`❌ Failed to publish test. Server says: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error publishing test:", err);
      alert("⚠️ Error publishing test. Check console and server logs.");
    } finally {
      setLoading(false);
    }
  };

  // --- RESET ---
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
    if (showAlert) alert("🔄 Form reset successfully.");
  };

  // --- JSX ---
  return (
    <div className="add-test-container">
      <h1 className="add-test-title">🧩 Create New Test</h1>
      <p className="add-test-subtitle">Fill details and add questions for students.</p>

      {/* ===== AI Question Generator ===== */}
      <section className="ai-generate-panel" style={{ position: "relative", zIndex: 20 }}>
        <h3>🤖 Generate Questions (Gemini)</h3>
        <div className="ai-row" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Enter topic (e.g. Arrays in JavaScript)"
            value={genTopic}
            onChange={(e) => setGenTopic(e.target.value)}
            className="ai-input"
            style={{ flex: 1 }}
          />
          <input
            type="number"
            min="1"
            max={MAX_GEN}
            placeholder="Count"
            value={genCount}
            onChange={(e) => setGenCount(e.target.value)}
            className="ai-input small"
            style={{ width: 90 }}
          />
          <button
            type="button"
            onClick={handleGenerateWithGemini}
            disabled={generating}
            className="btn gen-btn"
          >
            {generating ? "Generating..." : "✨ Generate"}
          </button>
        </div>
      </section>

      {/* ===== Test Details ===== */}
      <section className="test-details-card">
        <h2>📋 Test Details</h2>
        <div className="form-grid">
          <input type="text" name="title" value={testDetails.title} onChange={handleDetailChange} placeholder="Test Title" />
          <input type="text" name="subject" value={testDetails.subject} onChange={handleDetailChange} placeholder="Subject" />
          <select name="type" value={testDetails.type} onChange={handleDetailChange}>
            <option value="">Select Type</option>
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
          placeholder="Write test instructions..."
          className="instructions-box"
        />
      </section>

      {/* ===== Manual Question Add ===== */}
      <section className="add-question-card">
        <h2>➕ Add Question</h2>
        <textarea
          name="text"
          value={newQuestion.text}
          onChange={handleQuestionChange}
          placeholder="Enter question text..."
        />
        <div className="options-grid">
          {newQuestion.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(i, e.target.value)}
              placeholder={`Option ${String.fromCharCode(65 + i)}`}
            />
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
        <button className="btn add-question-btn" onClick={handleAddQuestion}>➕ Add Question</button>

        {questions.length > 0 && (
          <div className="question-list">
            <h3>🧾 Added Questions ({questions.length})</h3>
            {questions.map((q, index) => (
              <div className="question-item" key={index}>
                <p><strong>Q{index + 1}:</strong> {q.text}</p>
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

      {/* ===== Submit Section ===== */}
      <div className="submit-section">
        <button type="button" className="btn save-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Publishing..." : "🚀 Publish Test"}
        </button>
        <button className="btn reset-btn" onClick={() => handleReset(true)}>🔄 Reset</button>
      </div>
    </div>
  );
};

export default AddTest;
