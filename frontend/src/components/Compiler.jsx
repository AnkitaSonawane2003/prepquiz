// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Editor from "@monaco-editor/react";
// import Swal from "sweetalert2";

// const Compiler = () => {
//   const { id } = useParams();
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("cpp");
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch problem details
//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/problems/${id}`);
//         const data = await res.json();
//         if (data.success) {
//           setProblem(data.problem);
//           setInput(data.problem.sampleInput || "");
//         } else {
//           Swal.fire("Error", "Problem not found!", "error");
//         }
//       } catch (err) {
//         console.error(err);
//         Swal.fire("Error", "Failed to load problem", "error");
//       }
//     };
//     fetchProblem();
//   }, [id]);

//   // ✅ Run Code via Judge0
//   const handleRun = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//           "x-rapidapi-key": "YOUR_RAPIDAPI_KEY_HERE" // 🔑 Replace with your Judge0 RapidAPI key
//         },
//         body: JSON.stringify({
//           language_id: getLanguageId(language),
//           source_code: code,
//           stdin: input,
//         }),
//       });

//       const data = await res.json();
//       setOutput(data.stdout || data.stderr || data.compile_output || "No output");
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to run code", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Submit Code (Save in Backend)
//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/submissions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           problemId: id,
//           code,
//           language,
//           output,
//           user: "student1" // replace with actual logged-in user later
//         }),
//       });
//       const data = await res.json();

//       if (data.success)
//         Swal.fire("✅ Submitted!", "Your code was saved successfully.", "success");
//       else
//         Swal.fire("⚠️ Error", data.message || "Failed to submit", "error");
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to submit solution", "error");
//     }
//   };

//   const getLanguageId = (lang) => {
//     const map = { c: 50, cpp: 54, java: 62, python: 71, javascript: 63 };
//     return map[lang] || 54;
//   };

//   if (!problem)
//     return <div className="compiler-loading">Loading problem...</div>;

//   return (
//     <div className="compiler-container">
//       <h1>{problem.title}</h1>
//       <p>{problem.description}</p>

//       <div className="compiler-controls">
//         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//           <option value="cpp">C++</option>
//           <option value="c">C</option>
//           <option value="java">Java</option>
//           <option value="python">Python</option>
//           <option value="javascript">JavaScript</option>
//         </select>

//         <button onClick={handleRun} disabled={loading}>
//           {loading ? "Running..." : "▶ Run"}
//         </button>
//         <button onClick={handleSubmit}>💾 Submit</button>
//       </div>

//       <Editor
//         height="45vh"
//         theme="vs-dark"
//         language={language}
//         value={code}
//         onChange={(v) => setCode(v || "")}
//       />

//       <div className="io-section">
//         <div>
//           <h3>Input</h3>
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             rows="5"
//           />
//         </div>
//         <div>
//           <h3>Output</h3>
//           <textarea value={output} readOnly rows="5" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Compiler;
// import React, { useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import Swal from "sweetalert2";

// const StudentCompiler = () => {
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("cpp");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const user = "student@example.com"; // Replace with actual logged-in user

//   useEffect(() => {
//     const p = JSON.parse(localStorage.getItem("currentProblem"));
//     if (p) setProblem(p);

//     // Load previous submission if exists
//     const fetchSubmission = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/submissions/${user}/${p._id}`);
//         const data = await res.json();
//         if (data.success && data.submission) setCode(data.submission.code);
//       } catch (err) {
//         console.error("Error loading previous submission:", err);
//       }
//     };
//     if (p) fetchSubmission();
//   }, []);

//   const runCode = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // 🔒 Replace with your key
//         },
//         body: JSON.stringify({
//           source_code: code,
//           language_id: language === "cpp" ? 54 : language === "python" ? 71 : 63,
//           stdin: problem.sampleInput || "",
//         }),
//       });
//       const result = await response.json();
//       setOutput(result.stdout || result.stderr || result.compile_output || "No output");
//     } catch (err) {
//       console.error("Error running code:", err);
//       setOutput("Error running code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/submissions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           problemId: problem._id,
//           code,
//           language,
//           output,
//           user,
//         }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         Swal.fire("🎉 Submitted!", "Your solution has been saved successfully.", "success").then(
//           () => (window.location.href = "/student/practice")
//         );
//       }
//     } catch (err) {
//       Swal.fire("Error", "Failed to submit code.", "error");
//     }
//   };

//   return (
//     <div className="compiler-page">
//       {!problem ? (
//         <h2>No problem selected.</h2>
//       ) : (
//         <>
//           <div className="problem-section">
//             <h2>{problem.title}</h2>
//             <p><b>Description:</b> {problem.description}</p>
//             <p><b>Input Format:</b> {problem.inputFormat}</p>
//             <p><b>Output Format:</b> {problem.outputFormat}</p>
//             <p><b>Sample Input:</b> {problem.sampleInput}</p>
//             <p><b>Sample Output:</b> {problem.sampleOutput}</p>
//           </div>

//           <div className="editor-section">
//             <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//               <option value="cpp">C++</option>
//               <option value="python">Python</option>
//               <option value="java">Java</option>
//             </select>

//             <Editor
//               height="400px"
//               theme="vs-dark"
//               language={language}
//               value={code}
//               onChange={(value) => setCode(value)}
//             />

//             <div className="btns">
//               <button onClick={runCode} disabled={loading}>
//                 {loading ? "Running..." : "Run Code"}
//               </button>
//               <button onClick={handleSubmit}>Submit</button>
//             </div>

//             <div className="output-section">
//               <h3>Output:</h3>
//               <pre>{output}</pre>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentCompiler;
// import React, { useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import "../styles/compiler.css";
// import Swal from "sweetalert2";

// const Compiler = () => {
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [language, setLanguage] = useState("cpp");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const user = "student@example.com"; // Replace later with logged-in user

//   // ✅ Load current problem
//   useEffect(() => {
//     const p = JSON.parse(localStorage.getItem("currentProblem"));
//     if (p) setProblem(p);
//   }, []);

//   // ✅ Judge0 language ID mapping
//   const getLanguageId = (lang) => {
//     const map = {
//       c: 50,
//       cpp: 54,
//       java: 62,
//       python: 71,
//       javascript: 63,
//     };
//     return map[lang] || 54;
//   };

//   // ✅ Run code using Judge0 (RapidAPI)
// const runCode = async () => {
//   if (!problem) {
//     alert("Please open a problem first!");
//     return;
//   }

//   setLoading(true);
//   setOutput("⏳ Running...");

//   try {
//     const response = await fetch("http://localhost:5000/api/compiler/run", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         code,
//         language_id: getLanguageId(language),
//         stdin: problem?.sampleInput
//           ? problem.sampleInput.replace(/[\[\]]/g, "").replace(/,/g, " ")
//           : "",
//       }),
//     });

//     const result = await response.json();
//     console.log("Judge0 Result:", result); // 🧠 Debug

//     if (result.stdout) setOutput(result.stdout);
//     else if (result.stderr) setOutput("❌ Runtime Error:\n" + result.stderr);
//     else if (result.compile_output)
//       setOutput("⚙️ Compilation Error:\n" + result.compile_output);
//     else if (result.message)
//       setOutput("⚠️ " + result.message);
//     else setOutput("⚠️ No output returned");
//   } catch (error) {
//     console.error("Error running code:", error);
//     setOutput("🚫 Error running code. Check console for details.");
//   } finally {
//     setLoading(false);
//   }
// };




//   // ✅ Submit solution
//   const handleSubmit = async () => {
//     if (!problem) {
//       Swal.fire("Error", "No problem loaded.", "error");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/submissions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           problemId: problem._id,
//           code,
//           language,
//           output,
//           user,
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         Swal.fire("🎉 Submitted!", "Your solution has been saved successfully.", "success").then(
//           () => (window.location.href = "/student/practice")
//         );
//       } else {
//         Swal.fire("Error", data.message || "Failed to save submission.", "error");
//       }
//     } catch (err) {
//       console.error("Submission Error:", err);
//       Swal.fire("Error", "Failed to submit your code.", "error");
//     }
//   };

//   return (
//     <div className="compiler-page" style={{ padding: "20px" }}>
//       {!problem ? (
//         <h2>No problem selected.</h2>
//       ) : (
//         <div className="compiler-container">
//           {/* ✅ Problem Section */}
//           <div className="problem-section" style={{ marginBottom: "20px" }}>
//             <h2>{problem.title}</h2>
//             <p><b>Description:</b> {problem.description}</p>
//             <p><b>Input Format:</b> {problem.inputFormat}</p>
//             <p><b>Output Format:</b> {problem.outputFormat}</p>
//             <p><b>Sample Input:</b> {problem.sampleInput}</p>
//             <p><b>Sample Output:</b> {problem.sampleOutput}</p>
//           </div>

//           {/* ✅ Editor Section */}
//           <div className="editor-section">
//             <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 style={{ padding: "6px", borderRadius: "5px" }}
//               >
//                 <option value="c">C</option>
//                 <option value="cpp">C++</option>
//                 <option value="java">Java</option>
//                 <option value="python">Python</option>
//                 <option value="javascript">JavaScript</option>
//               </select>

//               <div>
//                 <button
//                   onClick={runCode}
//                   disabled={loading}
//                   style={{
//                     background: "#007bff",
//                     color: "white",
//                     border: "none",
//                     padding: "8px 15px",
//                     borderRadius: "5px",
//                     marginRight: "10px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {loading ? "Running..." : "▶ Run"}
//                 </button>

//                 <button
//                   onClick={handleSubmit}
//                   style={{
//                     background: "#28a745",
//                     color: "white",
//                     border: "none",
//                     padding: "8px 15px",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   💾 Submit
//                 </button>
//               </div>
//             </div>

//             {/* ✅ Monaco Editor */}
//             <Editor
//               height="400px"
//               theme="vs-dark"
//               language={language}
//               value={code}
//               onChange={(value) => setCode(value)}
//             />

//             {/* ✅ Output Section */}
//             <div className="output-section" style={{ marginTop: "20px" }}>
//               <h3>🧾 Output:</h3>
//               <pre
//                 style={{
//                   background: "#000",
//                   color: "#0f0",
//                   padding: "10px",
//                   borderRadius: "6px",
//                   minHeight: "100px",
//                   overflowX: "auto",
//                   whiteSpace: "pre-wrap",
//                 }}
//               >
//                 {output}
//               </pre>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Compiler;
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/compiler.css";
import Swal from "sweetalert2";

const Compiler = () => {
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("userEmail") || "guest@example.com"; // ✅ Logged-in user

  // ✅ Load current problem
  useEffect(() => {
    const storedProblem = JSON.parse(localStorage.getItem("currentProblem"));
    if (storedProblem) setProblem(storedProblem);
  }, []);

  // ✅ Judge0 language mapping
  const getLanguageId = (lang) => {
    const map = {
      c: 50,
      cpp: 54,
      java: 62,
      python: 71,
      javascript: 63,
    };
    return map[lang] || 54;
  };

  // ✅ Run code using backend (which uses ce.judge0.com)
  const runCode = async () => {
    if (!problem) {
      Swal.fire("Error", "Please open a problem first!", "error");
      return;
    }

    setLoading(true);
    setOutput("⏳ Running...");

    try {
      const response = await fetch("http://localhost:5000/api/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language_id: getLanguageId(language),
          stdin: problem?.sampleInput
            ? problem.sampleInput.replace(/[\[\]]/g, "").replace(/,/g, " ")
            : "",
        }),
      });

      const result = await response.json();
      console.log("Judge0 Result:", result);

      if (result.success) {
        if (result.stdout) setOutput(result.stdout);
        else if (result.stderr) setOutput("❌ Runtime Error:\n" + result.stderr);
        else if (result.compile_output)
          setOutput("⚙️ Compilation Error:\n" + result.compile_output);
        else setOutput("⚠️ No output returned");
      } else {
        setOutput("❌ Error: " + (result.message || "Unknown issue"));
      }
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("🚫 Error running code. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit code (save submission to DB)
const handleSubmit = async () => {
  if (!problem) {
    Swal.fire("Error", "No problem loaded.", "error");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: problem._id,
        code,
        language,
        output,
        user, // logged-in email
      }),
    });

    const data = await res.json();
    if (data.success) {
      // ✅ Update localStorage so the problem shows as solved
      const updatedProblem = {
        ...problem,
        status: "solved",
        solvedBy: problem.solvedBy
          ? [...problem.solvedBy, user]
          : [user],
      };
      localStorage.setItem("currentProblem", JSON.stringify(updatedProblem));

      Swal.fire(
        "🎉 Submitted!",
        "Your solution has been saved successfully.",
        "success"
      ).then(() => {
        // redirect to practice page
        window.location.href = "/student/practice";
      });
    } else {
      Swal.fire("Error", data.message || "Failed to save submission.", "error");
    }
  } catch (err) {
    console.error("Submission Error:", err);
    Swal.fire("Error", "Failed to submit your code.", "error");
  }
};


  return (
    <div className="compiler-page" style={{ padding: "20px" }}>
      {!problem ? (
        <h2>No problem selected.</h2>
      ) : (
        <div className="compiler-container">
          {/* ✅ Problem Section */}
          <div className="problem-section" style={{ marginBottom: "20px" }}>
            <h2>{problem.title}</h2>
            <p>
              <b>Description:</b> {problem.description}
            </p>
            <p>
              <b>Input Format:</b> {problem.inputFormat}
            </p>
            <p>
              <b>Output Format:</b> {problem.outputFormat}
            </p>
            <p>
              <b>Sample Input:</b> {problem.sampleInput}
            </p>
            <p>
              <b>Sample Output:</b> {problem.sampleOutput}
            </p>
          </div>

          {/* ✅ Editor Section */}
          <div className="editor-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ padding: "6px", borderRadius: "5px" }}
              >
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
              </select>

              <div>
                <button
                  onClick={runCode}
                  disabled={loading}
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  {loading ? "Running..." : "▶ Run"}
                </button>

                <button
                  onClick={handleSubmit}
                  style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  💾 Submit
                </button>
              </div>
            </div>

            {/* ✅ Monaco Editor */}
            <Editor
              height="400px"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
            />

            {/* ✅ Output Section */}
            <div className="output-section" style={{ marginTop: "20px" }}>
              <h3>🧾 Output:</h3>
              <pre
                style={{
                  background: "#000",
                  color: "#0f0",
                  padding: "10px",
                  borderRadius: "6px",
                  minHeight: "100px",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {output}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compiler;
