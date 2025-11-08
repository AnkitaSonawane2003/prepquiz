// src/components/Compiler.jsx
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Swal from "sweetalert2";
import "../styles/compiler.css";

const Compiler = () => {
  // --------------------
  // State variables
  // --------------------
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------
  // Language mapping to Judge0 IDs
  // --------------------
  const mapLanguage = (lang) => {
    switch (lang) {
      case "javascript":
        return 63; // Node.js 18
      case "python":
        return 71; // Python 3
      case "cpp":
        return 54; // C++17
      default:
        return 63;
    }
  };

  // --------------------
  // Run code via backend
  // --------------------
  const handleRun = async () => {
    if (!code.trim()) {
      Swal.fire("Empty Code!", "Please write some code first.", "warning");
      return;
    }

    setLoading(true);
    setOutput(""); // Clear previous output

    try {
      const res = await fetch("http://localhost:5000/api/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language_id: mapLanguage(language),
        }),
      });

      const data = await res.json();

      // Display compiler output
      setOutput(
        data.stdout || data.stderr || data.compile_output || "No output from compiler."
      );
    } catch (err) {
      console.error("Compiler API error:", err);
      setOutput("Error connecting to compiler API.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------
  // JSX Render
  // --------------------
  return (
    <div className="compiler-page">
      <div className="compiler-container">
        {/* Editor + Controls */}
        <div className="editor-section">
          <div className="editor-controls">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>

            <button
              className="btn btn-run"
              onClick={handleRun}
              disabled={loading}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </div>

          <div className="monaco-editor-wrapper">
            <Editor
              height="50vh"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
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
    </div>
  );
};

export default Compiler;
