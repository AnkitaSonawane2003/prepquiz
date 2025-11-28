import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import "../styles/compiler.css";

const Compiler = () => {
  const { problemId } = useParams();
  const token = localStorage.getItem("studentToken");
  const userEmail = localStorage.getItem("userEmail");

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);


  // Map language to Judge0 ID
  const mapLanguage = (lang) => {
    switch (lang) {
      case "javascript": return 63; 
      case "python": return 71;     
      case "cpp": return 54;        
      case "c": return 50;        
      default: return 63;
    }
  };

  useEffect(() => {
    if (!problemId) return;

    const fetchProblem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/problems/${problemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setProblem(data.problem);
        else Swal.fire("Error", data.message || "Problem not found", "error");
      } catch (err) {
        console.error("Error fetching problem:", err);
        Swal.fire("Error", "Failed to fetch problem", "error");
      }
    };

    fetchProblem();
  }, [problemId, token]);

  const handleRun = async () => {
    if (!code.trim()) {
      Swal.fire("Empty Code!", "Please write some code first.", "warning");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const stdin = problem?.sampleInput.replace(/\\n/g, "\n") || "";

      const res = await fetch("http://localhost:5000/api/compiler/run", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          language_id: mapLanguage(language),
          stdin,
        }),
      });

      const data = await res.json();
      console.log("Compiler API response:", data);

      setOutput(data.stdout || data.stderr || data.compile_output || "No output from compiler.");
    } catch (err) {
      console.error("Compiler API error:", err);
      setOutput("Error connecting to compiler API.");
    } finally {
      setLoading(false);
    }
  };

const handleSubmit = async () => {
  if (!code.trim()) {
    Swal.fire("Empty Code!", "Please write some code first.", "warning");
    return;
  }

  if (!output.trim()) {
    Swal.fire("Run Code First", "Please run your code before submitting.", "warning");
    return;
  }

  const sampleOut = problem?.sampleOutput.replace(/\\n/g, "\n").trim();
  const userOut = output.trim();

  if (sampleOut !== userOut) {
    Swal.fire(
      "Wrong Output!",
      "Your output does not match the sample output.",
      "error"
    );
    return;
  }

  const hiddenCases = problem?.hiddenTestCases || [];

  if (hiddenCases.length > 0) {
    let allHiddenPassed = true;

    for (let test of hiddenCases) {
      const hiddenRes = await fetch("http://localhost:5000/api/compiler/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code,
          language_id: mapLanguage(language),
          stdin: test.input.replace(/\\n/g, "\n"),
        }),
      });

      const hiddenData = await hiddenRes.json();
      const hiddenOutput =
        hiddenData.stdout ||
        hiddenData.stderr ||
        hiddenData.compile_output ||
        "";

      if (hiddenOutput.trim() !== test.output.trim()) {
        allHiddenPassed = false;
        break;
      }
    }

    if (!allHiddenPassed) {
      Swal.fire(
        "Hidden Test Cases Failed!",
        "Your code passed sample tests but failed hidden tests.",
        "error"
      );
      return;
    }
  }

  setLoading(true);

  try {
    const inputForCompiler = problem?.sampleInput.replace(/\\n/g, "\n") || "";

    const res = await fetch("http://localhost:5000/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        problemId,
        code,
        language,
        output,
        user: userEmail,
        input: inputForCompiler,
      }),
    });

    const data = await res.json();

    if (data.success) {
  Swal.fire("Success", "Code submitted successfully!", "success");

  // Update localStorage (optional, used by StudentPractice)
  const currentProblem = JSON.parse(localStorage.getItem("currentProblem")) || {};
  localStorage.setItem(
    "currentProblem",
    JSON.stringify({ ...currentProblem, status: "solved" })
  );

  // Trigger a custom event so StudentPractice updates its state
  window.dispatchEvent(new Event("submissionUpdated"));
}
else {
      Swal.fire("Error", data.message || "Submission failed", "error");
    }
  } catch (err) {
    console.error("Submit API error:", err);
    Swal.fire("Error", "Failed to submit code", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="compiler-page">
      {problem ? (
        <div className="compiler-container">
         
          <div className="problem-details">
            <h2>{problem.title}</h2>
            <p><strong>Difficulty:</strong> {problem.difficulty}</p>
            <p><strong>Type:</strong> {problem.type}</p>
            <p><strong>Description:</strong> {problem.description}</p>
            {problem.inputFormat && <p><strong>Input Format:</strong> {problem.inputFormat}</p>}
            {problem.outputFormat && <p><strong>Output Format:</strong> {problem.outputFormat}</p>}
            {problem.sampleInput && (
              <p>
                <strong>Sample Input:</strong>
                <pre>{problem.sampleInput.replace(/\\n/g, "\n")}</pre>
              </p>
            )}
            {problem.sampleOutput && (
              <p>
                <strong>Sample Output:</strong>
                <pre>{problem.sampleOutput.replace(/\\n/g, "\n")}</pre>
              </p>
            )}
            {problem.tags?.length > 0 && <p><strong>Tags:</strong> {problem.tags.join(", ")}</p>}

            {problem.hiddenTestCases?.length > 0 && (
  <p><strong>Hidden Test Cases:</strong> {problem.hiddenTestCases.length}</p>
)}

          </div>

         
          <div className="editor-section">
            <div className="editor-controls">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
              </select>

              <button className="btn btn-run" onClick={handleRun} disabled={loading}>
                {loading ? "Running..." : "Run Code"}
              </button>

              <button className="btn btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Code"}
              </button>
            </div>

            <div className="monaco-editor-wrapper">
              <Editor
                height="50vh"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={setCode}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
              />
            </div>

            <div className="output-section">
              <h3>Output:</h3>
              <pre>{output}</pre>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Loading problem...</div>
      )}
    </div>
  );
};

export default Compiler;
