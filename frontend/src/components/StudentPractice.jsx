// // src/components/StudentPractice.jsx
// import React, { useEffect, useState } from "react";
// import "../styles/studentPractice.css";

// const StudentPractice = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/problems");
//         const data = await res.json();
//         if (data.success) setProblems(data.problems || []);
//         else setProblems([]);
//       } catch (err) {
//         console.error("Failed to load problems:", err);
//         setProblems([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProblems();
//   }, []);

//   return (
//     <div className="student-practice-wrapper">
//       <div className="student-practice-container">
//         <header className="sp-header">
//           <h1>💻 Coding Practice</h1>
//           <p>Browse problems added by your instructor — filter by difficulty & tags.</p>
//         </header>

//         {loading ? (
//           <div className="sp-loader">Loading problems...</div>
//         ) : problems.length === 0 ? (
//           <div className="sp-empty">No problems available yet. Check back later.</div>
//         ) : (
//           <div className="sp-grid">
//             {problems.map((p) => (
//               <article key={p._id} className="sp-card">
//                 <div className="sp-card-header">
//                   <h2>{p.title}</h2>
//                   <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
//                 </div>
//                 <p className="sp-meta">{p.type} • {p.tags && p.tags.join(", ")}</p>
//                 <p className="sp-desc">{p.description.slice(0, 220)}{p.description.length>220?"...":""}</p>
//                 <div className="sp-footer">
//                   <button className="btn view-btn" onClick={() => window.location.href = `/practice/${p._id}`}
// >Open</button>
//                   <span className="created">Added {new Date(p.createdAt).toLocaleDateString()}</span>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentPractice;
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import "../styles/studentPractice.css";

// const StudentPractice = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [solvedProblems, setSolvedProblems] = useState({});
//   const [submissions, setSubmissions] = useState({});
//   const navigate = useNavigate();

//   const user = "student@example.com"; // Replace later with actual logged-in user

//   // Fetch all problems
//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/problems");
//         const data = await res.json();
//         if (data.success) setProblems(data.problems || []);
//         else setProblems([]);
//       } catch (err) {
//         console.error("Failed to load problems:", err);
//         setProblems([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProblems();
//   }, []);

//   // Check which problems are solved
//   useEffect(() => {
//     const fetchSolved = async () => {
//       try {
//         const responses = await Promise.all(
//           problems.map((p) =>
//             fetch(`http://localhost:5000/api/submissions/${user}/${p._id}`)
//           )
//         );
//         const data = await Promise.all(responses.map((r) => r.json()));
//         const solved = {};
//         const subs = {};
//         data.forEach((d, i) => {
//           if (d.success && d.submission) {
//             solved[problems[i]._id] = true;
//             subs[problems[i]._id] = d.submission;
//           }
//         });
//         setSolvedProblems(solved);
//         setSubmissions(subs);
//       } catch (err) {
//         console.error("Error fetching solved problems:", err);
//       }
//     };
//     if (problems.length > 0) fetchSolved();
//   }, [problems]);

//   const handleOpen = (problem) => {
//     const isSolved = solvedProblems[problem._id];
//     const submission = submissions[problem._id];

//     if (isSolved && submission) {
//       // If already solved, show submitted solution
//       Swal.fire({
//         title: `${problem.title} — Solved ✅`,
//         html: `
//           <pre style="text-align:left;background:#f7f7f7;padding:10px;border-radius:6px;overflow:auto;">
// ${submission.code}
//           </pre>
//         `,
//         width: "60%",
//         confirmButtonText: "Close",
//       });
//     } else {
//       // If not solved, confirm before opening compiler
//       Swal.fire({
//         title: `Open "${problem.title}"?`,
//         text: "This will open the compiler with this problem.",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: "Open",
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           localStorage.setItem("currentProblem", JSON.stringify(problem));
//           navigate("/compiler"); // ✅ React Router navigation
//         }
//       });
//     }
//   };

//   return (
//     <div className="student-practice-wrapper">
//       <div className="student-practice-container">
//         <header className="sp-header">
//           <h1>💻 Coding Practice</h1>
//           <p>
//             Browse problems added by your instructor — solve them and view your submissions.
//           </p>
//         </header>

//         {loading ? (
//           <div className="sp-loader">Loading problems...</div>
//         ) : problems.length === 0 ? (
//           <div className="sp-empty">No problems available yet. Check back later.</div>
//         ) : (
//           <div className="sp-grid">
//             {problems.map((p) => (
//               <article key={p._id} className="sp-card">
//                 <div className="sp-card-header">
//                   <h2>{p.title}</h2>
//                   <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>
//                     {p.difficulty}
//                   </span>
//                 </div>
//                 <p className="sp-meta">
//                   {p.type} • {p.tags && p.tags.join(", ")}
//                 </p>
//                 <p className="sp-desc">
//                   {p.description.slice(0, 220)}
//                   {p.description.length > 220 ? "..." : ""}
//                 </p>
//                 <div className="sp-footer">
//                   <button
//                     className={`btn ${
//                       solvedProblems[p._id] ? "solved" : "view-btn"
//                     }`}
//                     onClick={() => handleOpen(p)}
//                   >
//                     {solvedProblems[p._id] ? "✅ Solved" : "Open"}
//                   </button>
//                   <span className="created">
//                     Added {new Date(p.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentPractice;
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import "../styles/studentPractice.css";

// const StudentPractice = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [solvedProblems, setSolvedProblems] = useState({});
//   const [submissions, setSubmissions] = useState({});
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("userEmail"); // ← use stored email

//   // ✅ Fetch all problems
//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/problems");
//         const data = await res.json();
//         if (data.success) setProblems(data.problems || []);
//         else setProblems([]);
//       } catch (err) {
//         console.error("Failed to load problems:", err);
//         setProblems([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProblems();
//   }, []);

//   // ✅ Fetch solved problems
//   useEffect(() => {
//     const fetchSolved = async () => {
//       try {
//         const responses = await Promise.all(
//           problems.map((p) =>
//             fetch(`http://localhost:5000/api/submissions/${user}/${p._id}`)
//           )
//         );
//         const data = await Promise.all(responses.map((r) => r.json()));
//         const solved = {};
//         const subs = {};
//         data.forEach((d, i) => {
//           if (d.success && d.submission) {
//             solved[problems[i]._id] = true;
//             subs[problems[i]._id] = d.submission;
//           }
//         });
//         setSolvedProblems(solved);
//         setSubmissions(subs);
//       } catch (err) {
//         console.error("Error fetching solved problems:", err);
//       }
//     };
//     if (problems.length > 0) fetchSolved();
//   }, [problems]);

//   // ✅ Handle "Open" click
//   const handleOpen = (problem) => {
//     console.log("Open button clicked for:", problem.title);

//     if (!problem || !problem._id) {
//       console.warn("Problem data missing");
//       return;
//     }

//     const isSolved = solvedProblems[problem._id];
//     const submission = submissions[problem._id];

//     // ✅ Just to confirm click works
//     Swal.fire({
//       title: `Opening "${problem.title}"`,
//       text: "Click OK to continue.",
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonText: "OK",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (isSolved && submission) {
//           Swal.fire({
//             title: `${problem.title} — Solved ✅`,
//             html: `
//               <pre style="text-align:left;background:#f7f7f7;padding:10px;border-radius:6px;overflow:auto;">
// ${submission.code}
//               </pre>
//             `,
//             width: "60%",
//             confirmButtonText: "Close",
//           });
//         } else {
//           localStorage.setItem("currentProblem", JSON.stringify(problem));
//           navigate("/compiler");
//         }
//       }
//     });
//   };

//   return (
//     <div className="student-practice-wrapper">
//       <div className="student-practice-container">
//         <header className="sp-header">
//           <h1>💻 Coding Practice</h1>
//           <p>
//             Browse problems added by your instructor — solve them and view your submissions.
//           </p>
//         </header>

//         {loading ? (
//           <div className="sp-loader">Loading problems...</div>
//         ) : problems.length === 0 ? (
//           <div className="sp-empty">No problems available yet. Check back later.</div>
//         ) : (
//           <div className="sp-grid">
//             {problems.map((p) => (
//               <article key={p._id} className="sp-card">
//                 <div className="sp-card-header">
//                   <h2>{p.title}</h2>
//                   <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>
//                     {p.difficulty}
//                   </span>
//                 </div>
//                 <p className="sp-meta">
//                   {p.type} • {p.tags && p.tags.join(", ")}
//                 </p>
//                 <p className="sp-desc">
//                   {p.description.slice(0, 220)}
//                   {p.description.length > 220 ? "..." : ""}
//                 </p>
//                 <div className="sp-footer">
//                   <button
//                     className={`btn ${solvedProblems[p._id] ? "solved" : "view-btn"}`}
//                     onClick={(e) => {
//                       e.stopPropagation(); // 🧩 Prevent overlay click
//                       handleOpen(p);
//                     }}
//                   >
//                     {solvedProblems[p._id] ? "✅ Solved" : "Open"}
//                   </button>
//                   <span className="created">
//                     Added {new Date(p.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentPractice;
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import "../styles/studentPractice.css";

// const StudentPractice = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [solvedProblems, setSolvedProblems] = useState({});
//   const [submissions, setSubmissions] = useState({});
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("userEmail"); // ✅ store logged-in user email

//   // ✅ Fetch all problems
//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/problems");
//         const data = await res.json();
//         if (data.success) setProblems(data.problems || []);
//         else setProblems([]);
//       } catch (err) {
//         console.error("Failed to load problems:", err);
//         setProblems([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProblems();
//   }, []);

//   // ✅ Fetch solved problems for this specific user
//   useEffect(() => {
//     const fetchSolved = async () => {
//       try {
//         const responses = await Promise.all(
//           problems.map((p) =>
//             fetch(`http://localhost:5000/api/submissions/${userEmail}/${p._id}`)
//           )
//         );

//         const data = await Promise.all(responses.map((r) => r.json()));
//         const solved = {};
//         const subs = {};

//         data.forEach((d, i) => {
//           if (d.success && d.submission) {
//             solved[problems[i]._id] = true;
//             subs[problems[i]._id] = d.submission;
//           }
//         });

//         setSolvedProblems(solved);
//         setSubmissions(subs);
//       } catch (err) {
//         console.error("Error fetching solved problems:", err);
//       }
//     };

//     if (userEmail && problems.length > 0) fetchSolved();
//   }, [problems, userEmail]);

//   // ✅ Handle "Open" click
//   const handleOpen = (problem) => {
//     console.log("Open button clicked for:", problem.title);

//     if (!problem || !problem._id) {
//       console.warn("Problem data missing");
//       return;
//     }

//     const isSolved = solvedProblems[problem._id];
//     const submission = submissions[problem._id];

//     Swal.fire({
//       title: `Opening "${problem.title}"`,
//       text: "Click OK to continue.",
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonText: "OK",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (isSolved && submission) {
//           Swal.fire({
//             title: `${problem.title} — Solved ✅`,
//             html: `
//               <pre style="text-align:left;background:#f7f7f7;padding:10px;border-radius:6px;overflow:auto;">
// ${submission.code}
//               </pre>
//             `,
//             width: "60%",
//             confirmButtonText: "Close",
//           });
//         } else {
//           localStorage.setItem("currentProblem", JSON.stringify(problem));
//           navigate("/compiler");
//         }
//       }
//     });
//   };

//   return (
//     <div className="student-practice-wrapper">
//       <div className="student-practice-container">
//         <header className="sp-header">
//           <h1>💻 Coding Practice</h1>
//           <p>
//             Browse problems added by your instructor — solve them and view your submissions.
//           </p>
//         </header>

//         {loading ? (
//           <div className="sp-loader">Loading problems...</div>
//         ) : problems.length === 0 ? (
//           <div className="sp-empty">No problems available yet. Check back later.</div>
//         ) : (
//           <div className="sp-grid">
//             {problems.map((p) => (
//               <article key={p._id} className="sp-card">
//                 <div className="sp-card-header">
//                   <h2>{p.title}</h2>
//                   <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>
//                     {p.difficulty}
//                   </span>
//                 </div>
//                 <p className="sp-meta">
//                   {p.type} • {p.tags && p.tags.join(", ")}
//                 </p>
//                 <p className="sp-desc">
//                   {p.description.slice(0, 220)}
//                   {p.description.length > 220 ? "..." : ""}
//                 </p>
//                 <div className="sp-footer">
//                   <button
//                     className={`btn ${solvedProblems[p._id] ? "solved" : "view-btn"}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleOpen(p);
//                     }}
//                   >
//                     {solvedProblems[p._id] ? "✅ Solved" : "Open"}
//                   </button>
//                   <span className="created">
//                     Added {new Date(p.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentPractice;



import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/studentPractice.css";

const StudentPractice = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [submissions, setSubmissions] = useState({});
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const currentProblemLS = JSON.parse(localStorage.getItem("currentProblem"));

  // Fetch all problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/problems");
        const data = await res.json();
        if (data.success) setProblems(data.problems || []);
        else setProblems([]);
      } catch (err) {
        console.error("Failed to load problems:", err);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  // Fetch solved problems & submissions for the logged-in user
  useEffect(() => {
    const fetchSolved = async () => {
      try {
        const responses = await Promise.all(
          problems.map((p) =>
            fetch(`http://localhost:5000/api/submissions/${userEmail}/${p._id}`)
          )
        );

        const data = await Promise.all(responses.map((r) => r.json()));
        const solved = {};
        const subs = {};

        data.forEach((d, i) => {
          if (d.success && d.submission) {
            solved[problems[i]._id] = true;
            subs[problems[i]._id] = d.submission;
          }
        });

        setSolvedProblems(solved);
        setSubmissions(subs);
      } catch (err) {
        console.error("Error fetching solved problems:", err);
      }
    };

    if (userEmail && problems.length > 0) fetchSolved();
  }, [problems, userEmail]);

  // Handle "Open" button click
  const handleOpen = (problem) => {
    if (!problem || !problem._id) return;

    const isSolved =
      solvedProblems[problem._id] ||
      (currentProblemLS?.status === "solved" &&
        currentProblemLS._id === problem._id);
    const submission = submissions[problem._id];

    if (isSolved && submission) {
      Swal.fire({
        title: `${problem.title} — Solved ✅`,
        html: `<pre style="text-align:left;background:#f7f7f7;padding:10px;border-radius:6px;overflow:auto;">
${submission.code}
        </pre>`,
        width: "60%",
        confirmButtonText: "Close",
      });
    } else {
      localStorage.setItem("currentProblem", JSON.stringify({ ...problem, status: "open" }));
      navigate("/compiler");
    }
  };

  return (
    <div className="student-practice-wrapper">
      <div className="student-practice-container">
        <header className="sp-header">
          <h1>💻 Coding Practice</h1>
          <p>
            Browse problems added by your instructor — solve them and view your submissions.
          </p>
        </header>

        {loading ? (
          <div className="sp-loader">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="sp-empty">No problems available yet. Check back later.</div>
        ) : (
          <div className="sp-grid">
            {problems.map((p) => {
              const isSolved =
                solvedProblems[p._id] ||
                (currentProblemLS?.status === "solved" &&
                  currentProblemLS._id === p._id);
              return (
                <article key={p._id} className="sp-card">
                  <div className="sp-card-header">
                    <h2>{p.title}</h2>
                    <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <p className="sp-meta">
                    {p.type} • {p.tags && p.tags.join(", ")}
                  </p>
                  <p className="sp-desc">
                    {p.description.slice(0, 220)}
                    {p.description.length > 220 ? "..." : ""}
                  </p>
                  <div className="sp-footer">
                    <button
                      className={`btn ${isSolved ? "solved" : "view-btn"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(p);
                      }}
                    >
                      {isSolved ? "✅ Solved" : "Open"}
                    </button>
                    <span className="created">
                      Added {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPractice;



