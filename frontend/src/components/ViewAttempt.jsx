// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axiosConfig";
// import "../styles/testTake.css"; // reuse same styles

// const ViewAttempt = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [attempt, setAttempt] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadAttempt = async () => {
//       try {
//         setLoading(true);
//         const token =
//           localStorage.getItem("token") ||
//           localStorage.getItem("studentToken") ||
//           localStorage.getItem("jwt");
//         if (!token) {
//           alert("Session expired. Please log in again.");
//           navigate("/studentlogin");
//           return;
//         }

//         // ✅ Fetch the student's submitted attempt for this test
//         const { data } = await API.get(`/api/testattempts/${testId}/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setAttempt(data.attempt || data);
//       } catch (err) {
//         console.error("❌ Error loading attempt:", err);
//         setError(
//           err?.response?.data?.message ||
//             "Failed to load your submission details."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAttempt();
//   }, [testId]);

//   if (loading) return <div className="tt-loading">Loading submission...</div>;
//   if (error)
//     return (
//       <div className="test-take-container">
//         <h2>Error</h2>
//         <p>{error}</p>
//         <button onClick={() => navigate("/student/tests")} className="btn">
//           Back
//         </button>
//       </div>
//     );

//   if (!attempt) return <div>No attempt found for this test.</div>;

//   const { test, answers, totalObtained, totalMarks } = attempt;

//   return (
//     <div className="test-take-container">
//       <header className="tt-header">
//         <h1>{test?.title} — Your Submission</h1>
//         <h3>
//           Score: {totalObtained}/{totalMarks}
//         </h3>
//       </header>

//       <ol className="tt-questions">
//         {test?.questions?.map((q, idx) => {
//           const key = q._id || `q_${idx}`;
//           const selected = answers?.[key];
//           const correct = q.correctAnswer;

//           return (
//             <li key={key}>
//               <div className="q-text">
//                 <strong>{idx + 1}.</strong> {q.text}
//               </div>
//               <div className="options">
//                 {q.options.map((opt, i) => {
//                   const letter = String.fromCharCode(65 + i);
//                   const isSelected = selected === letter;
//                   const isCorrect = correct === letter;
//                   return (
//                     <div
//                       key={i}
//                       className={`option-label view-mode ${
//                         isCorrect
//                           ? "correct"
//                           : isSelected && !isCorrect
//                           ? "incorrect"
//                           : ""
//                       }`}
//                     >
//                       <span>
//                         {letter}. {opt}
//                       </span>
//                       {isCorrect && <span> ✅</span>}
//                       {isSelected && !isCorrect && <span> ❌</span>}
//                     </div>
//                   );
//                 })}
//               </div>
//             </li>
//           );
//         })}
//       </ol>

//       <button className="btn" onClick={() => navigate("/student/tests")}>
//         Back to Tests
//       </button>
//     </div>
//   );
// };

// export default ViewAttempt;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axiosConfig";
// import "../styles/testTake.css"; // reuse your existing styles

// const ViewAttempt = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [attempt, setAttempt] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadAttempt = async () => {
//       try {
//         setLoading(true);
//         const token =
//           localStorage.getItem("token") ||
//           localStorage.getItem("studentToken") ||
//           localStorage.getItem("jwt");
//         if (!token) {
//           alert("Session expired. Please log in again.");
//           navigate("/studentlogin");
//           return;
//         }

//         // Fetch the student's submitted attempt for this test
//         const { data } = await API.get(`/api/testAttempts/${testId}/my`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setAttempt(data.attempt || data);
//       } catch (err) {
//         console.error("Error loading attempt:", err);
//         setError(
//           err?.response?.data?.message || "Failed to load your submission details."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAttempt();
//   }, [testId, navigate]);

//   if (loading) return <div className="tt-loading">Loading submission...</div>;
//   if (error)
//     return (
//       <div className="test-take-container">
//         <h2>Error</h2>
//         <p>{error}</p>
//         <button onClick={() => navigate("/student/tests")} className="btn">
//           Back
//         </button>
//       </div>
//     );

//   if (!attempt) return <div>No attempt found for this test.</div>;

//   const { test, answers = [], totalObtained, totalMarks } = attempt;

//   return (
//     <div className="test-take-container">
//       <header className="tt-header">
//         <h1>{test?.title} — Your Submission</h1>
//         <h3>
//           Score: {totalObtained}/{totalMarks}
//         </h3>
//       </header>

//       <ol className="tt-questions">
//         {test?.questions?.map((q, idx) => {
//           // Find student's answer for this question
//           const ansObj = answers.find(
//             (a) => a.question.toString() === q._id.toString()
//           );

//           return (
//             <li key={q._id || idx}>
//               <div className="q-text">
//                 <strong>{idx + 1}.</strong> {q.text}
//               </div>
//               <div className="options">
//                 {q.options.map((opt, i) => {
//                   const letter = String.fromCharCode(65 + i);
//                   const selected = ansObj?.selectedOption?.toUpperCase() || "";
//                   const correct = ansObj?.correctAnswer?.toUpperCase() || "";

//                   const isSelected = selected === letter;
//                   const isCorrect = correct === letter;

//                   return (
//                     <div
//                       key={i}
//                       className={`option-label view-mode ${
//                         isCorrect
//                           ? "correct"
//                           : isSelected && !isCorrect
//                           ? "incorrect"
//                           : ""
//                       }`}
//                     >
//                       <span>
//                         {letter}. {opt}
//                       </span>
//                       {isSelected && isCorrect && <span> ✅</span>}
//                       {isSelected && !isCorrect && <span> ❌</span>}
//                       {!isSelected && isCorrect && <span> ✅</span>}{" "}
//                       {/* show correct even if not selected */}
//                     </div>
//                   );
//                 })}
//               </div>
//             </li>
//           );
//         })}
//       </ol>

//       <button className="btn" onClick={() => navigate("/student/tests")}>
//         Back to Tests
//       </button>
//     </div>
//   );
// };

// export default ViewAttempt;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/axiosConfig";
// import "../styles/testTake.css";

// const ViewAttempt = () => {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [attempt, setAttempt] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadAttempt = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token") || localStorage.getItem("studentToken") || localStorage.getItem("jwt");
//         if (!token) { alert("Session expired. Please log in again."); navigate("/studentlogin"); return; }

//         const { data } = await API.get(`/api/testAttempts/${testId}/my`, { headers: { Authorization: `Bearer ${token}` }});
//         setAttempt(data.attempt || data);
//       } catch (err) {
//         console.error("Error loading attempt:", err);
//         setError(err?.response?.data?.message || "Failed to load your submission.");
//       } finally { setLoading(false); }
//     };
//     loadAttempt();
//   }, [testId, navigate]);

//   if (loading) return <div>Loading submission...</div>;
//   if (error) return <div><h2>Error</h2><p>{error}</p><button onClick={() => navigate("/student/tests")}>Back</button></div>;
//   if (!attempt) return <div>No attempt found for this test.</div>;

//   const { test, answers = [], totalObtained, totalMarks } = attempt;

//   return (
//     <div className="test-take-container">
//       <header>
//         <h1>{test?.title} — Your Submission</h1>
//         <h3>Score: {totalObtained}/{totalMarks}</h3>
//       </header>

//       <ol>
//         {test?.questions?.map((q, idx) => {
//           const ansObj = answers.find((a) => a.question.toString() === q._id.toString());
//           const selected = ansObj?.selectedOption?.toUpperCase() || "";
//           const correct = ansObj?.correctAnswer?.toUpperCase() || "";

//           return (
//             <li key={q._id || idx}>
//               <div><strong>{idx + 1}.</strong> {q.text}</div>
//               <div><strong>Topic:</strong> {q.topic || "N/A"}</div>
//               <div>
//                 {q.options.map((opt, i) => {
//                   const letter = String.fromCharCode(65 + i);
//                   const isSelected = selected === letter;
//                   const isCorrect = correct === letter;
//                   return (
//                     <div key={i} className={`option ${isCorrect ? "correct" : isSelected && !isCorrect ? "incorrect" : ""}`}>
//                       {letter}. {opt} {isSelected && isCorrect && "✅"} {isSelected && !isCorrect && "❌"} {!isSelected && isCorrect && "✅"}
//                     </div>
//                   );
//                 })}
//               </div>
//             </li>
//           );
//         })}
//       </ol>

//       <button onClick={() => navigate("/student/tests")}>Back to Tests</button>
//     </div>
//   );
// };

// export default ViewAttempt;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/attempt.css";

const ViewAttempt = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAttempt = async () => {
      try {
        setLoading(true);
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("studentToken") ||
          localStorage.getItem("jwt");

        if (!token) {
          alert("Session expired. Please log in again.");
          navigate("/studentlogin");
          return;
        }

        const { data } = await API.get(
          `/api/testAttempts/${testId}/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAttempt(data.attempt || data);
      } catch (err) {
        console.error("Error loading attempt:", err);
        setError(
          err?.response?.data?.message || "Failed to load your submission."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [testId, navigate]);

  if (loading) return <div>Loading submission...</div>;
  if (error)
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/student/tests")}>Back</button>
      </div>
    );
  if (!attempt) return <div>No attempt found for this test.</div>;

  const { test, answers = [], totalObtained, totalMarks } = attempt;

  return (
    <div className="test-take-container">
      <header>
        <h1>{test?.title} — Your Submission</h1>
        <h3>
          Score: {totalObtained}/{totalMarks}
        </h3>
      </header>

      <ol>
        {test?.questions?.map((q, idx) => {
          const ansObj = answers.find(
            (a) => a.question.toString() === q._id.toString()
          );

          const selected = ansObj?.selectedOption?.toUpperCase() || "";
          const correct = ansObj?.correctAnswer?.toUpperCase() || "";
          const marksObtained = ansObj?.marksObtained ?? 0;

          return (
            <li key={q._id || idx}>
              <div>
                 {q.text}
              </div>
              <div>
                <strong>Topic:</strong> {q.topic || "N/A"}
                <strong>  (Marks : {q.marks} ) </strong></div>
              <div>
                {q.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isSelected = selected === letter;
                  const isCorrect = correct === letter;
                  return (
                    <div
                      key={i}
                      className={`option ${
                        isCorrect
                          ? "correct"
                          : isSelected && !isCorrect
                          ? "incorrect"
                          : ""
                      }`}
                    >
                      {letter}. {opt}{" "}
                      {isSelected && isCorrect && "✅"}{" "}
                      {isSelected && !isCorrect && "❌"}{" "}
                      {!isSelected && isCorrect && "✅"}
                    </div>
                  );
                })}
              </div>
              <p>
                Your Answer: {selected || "Not Answered"} | Correct Answer: {correct} | Obtained Marks: {marksObtained} 
              </p>
            </li>
          );
        })}
      </ol>

      <button onClick={() => navigate("/student/tests")}>Back to Tests</button>
    </div>
  );
};

export default ViewAttempt;
