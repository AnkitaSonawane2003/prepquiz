// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import "../styles/student.css";
// import "../styles/sidebar.css"

// const StudentPage = () => {
//   // Mocked data
//   const testsAttempted = 5;
//   const problemsSolved = 12;
//   const modulesCompleted = 8;

//   const recentPractice = [
//     { id: 1, title: "Arrays and Loops", completed: true },
//     { id: 2, title: "React Components", completed: false },
//     { id: 3, title: "JavaScript Promises", completed: true },
//   ];

//   const upcomingTests = [
//     { id: 1, title: "Midterm Exam", date: "2025-10-25" },
//     { id: 2, title: "React Basics Quiz", date: "2025-10-30" },
//   ];

//   const latestTestResults = [
//     { id: 1, title: "JavaScript Fundamentals", score: 88, status: "Passed" },
//     { id: 2, title: "HTML & CSS", score: 92, status: "Passed" },
//   ];

//   const motivationalThought1 =
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
//   const motivationalThought2 =
//     "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

  
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     async function fetchAnnouncements() {
//       try {
//         const res = await fetch('http://localhost:5000/api/announcement?limit=3'); // Backend should support ?limit=3
//         const data = await res.json();
//         if (data.success) {
//           setAnnouncements(data.announcements);
//         } else {
//           console.error("Failed to fetch announcements");
//         }
//       } catch (err) {
//         console.error("Error fetching announcements:", err);
//       }
//     }

//     fetchAnnouncements();
//   }, []);

//   return (
//     <div className="student-page-container">
//       <nav className="unified-sidebar">
//         <h2 className="unified-sidebar-title">Student Portal</h2>
//         <ul className="unified-nav-links">
//           <li>
           
//             <NavLink
//               to="/studentpage"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               Dashboard
//             </NavLink>
//           </li>
//            <li>
//             <NavLink to="/studentprofile" activeClassName="active-link">
//               Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/studentmodules"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               Coding Practice
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/studenttests"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               Tests
//             </NavLink>
//           </li>
         
//           {/* <li>
//             <NavLink
//               to="/studentprofile"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               Profile
//             </NavLink>
//           </li> */}
       
//           <li>
//             <NavLink
//               to="/studentevaluation"
//               className={({ isActive }) => (isActive ? "active-link" : "")}
//             >
//               Evaluation
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       <main className="main-content">
//         {/* Performance Summary */}
//         <div className="summary-card">
//           <div className="summary-name">Performance Summary</div>
//           <div className="summary-stats">
//             <div className="summary-item">
//               <div className="summary-number">{testsAttempted}</div>
//               <div className="summary-label">Tests Attempted</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{problemsSolved}</div>
//               <div className="summary-label">Problems Solved</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{modulesCompleted}</div>
//               <div className="summary-label">Modules Completed</div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Coding Practice */}
//         <section className="dashboard-section">
//           <h3>Recent Coding Practice</h3>
//           <ul className="practice-list">
//             {recentPractice.map((module) => (
//               <li key={module.id} className={module.completed ? "completed" : ""}>
//                 {module.title} {module.completed ? "✓" : "⏳"}
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Upcoming Tests */}
//         <section className="dashboard-section">
//           <h3>Upcoming Tests</h3>
//           <ul className="test-list">
//             {upcomingTests.map((test) => (
//               <li key={test.id}>
//                 {test.title} - <strong>{test.date}</strong>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Latest Test Results */}
//         <section className="dashboard-section">
//           <h3>Latest Test Results</h3>
//           <ul className="results-list">
//             {latestTestResults.map((result) => (
//               <li key={result.id}>
//                 {result.title}: <strong>{result.score}%</strong> ({result.status})
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Motivational Cards */}
//         <div className="motivation-cards-container">
//           <div className="motivation-card" title={motivationalThought1}>
//             <p>{motivationalThought1}</p>
//           </div>
//           <div className="motivation-card" title={motivationalThought2}>
//             <p>{motivationalThought2}</p>
//           </div>
//         </div>

//         {/* Announcements */}
//         <section className="dashboard-section">
//       <h3>Announcements</h3>
//       <ul className="announcement-list">
//         {announcements.length > 0 ? (
//           announcements.map(item => (
//             <li key={item._id || item.id}>{item.message}</li>
//           ))
//         ) : (
//           <li>No announcements available</li>
//         )}
//       </ul>
//     </section>
//       </main>
//     </div>
//   );
// };

// export default StudentPage;
// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import "../styles/student.css";
// import "../styles/sidebar.css";

// const StudentPage = () => {
//   // Summary stats (can be dynamic later if needed)
//   const testsAttempted = 5;
//   const problemsSolved = 12;
//   const modulesCompleted = 8;

//   const latestTestResults = [
//     { id: 1, title: "JavaScript Fundamentals", score: 88, status: "Passed" },
//     { id: 2, title: "HTML & CSS", score: 92, status: "Passed" },
//   ];

//   const motivationalThought1 =
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
//   const motivationalThought2 =
//     "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

//   // ✅ Dynamic data from backend
//   const [recentTests, setRecentTests] = useState([]);
//   const [recentChallenges, setRecentChallenges] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     // Fetch recent tests and coding challenges
//     async function fetchStudentStats() {
//       try {
//         const res = await fetch("http://localhost:5000/api/student/stats?limit=3");
//         const data = await res.json();
//         if (data.success) {
//           setRecentTests(data.recentTests || []);
//           setRecentChallenges(data.recentChallenges || []);
//         } else {
//           console.error("Failed to fetch student stats");
//         }
//       } catch (err) {
//         console.error("Error fetching student stats:", err);
//       }
//     }

//     // Fetch announcements
//     async function fetchAnnouncements() {
//       try {
//         const res = await fetch("http://localhost:5000/api/announcement?limit=3");
//         const data = await res.json();
//         if (data.success) {
//           setAnnouncements(data.announcements);
//         } else {
//           console.error("Failed to fetch announcements");
//         }
//       } catch (err) {
//         console.error("Error fetching announcements:", err);
//       }
//     }

//     fetchStudentStats();
//     fetchAnnouncements();
//   }, []);

//   return (
//     <div className="student-page-container">
//       {/* Sidebar */}
//       <nav className="unified-sidebar">
//         <h2 className="unified-sidebar-title">Student Portal</h2>
//         <ul className="unified-nav-links">
//           <li>
//             <NavLink to="/studentpage" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentprofile" activeClassName="active-link">
//               Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentmodules" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Coding Practice
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studenttests" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Tests
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentevaluation" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Evaluation
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Performance Summary */}
//         <div className="summary-card">
//           <div className="summary-name">Performance Summary</div>
//           <div className="summary-stats">
//             <div className="summary-item">
//               <div className="summary-number">{testsAttempted}</div>
//               <div className="summary-label">Tests Attempted</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{problemsSolved}</div>
//               <div className="summary-label">Problems Solved</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{modulesCompleted}</div>
//               <div className="summary-label">Modules Completed</div>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Recent Coding Challenges (Dynamic) */}
//         <section className="dashboard-section">
//           <h3>Recent Coding Challenges</h3>
//           <ul className="practice-list">
//             {recentChallenges.length > 0 ? (
//               recentChallenges.map((ch) => (
//                 <li key={ch._id}>
//                   {ch.title} - <strong>{new Date(ch.createdAt).toLocaleDateString()}</strong>
//                 </li>
//               ))
//             ) : (
//               <li>No recent coding challenges available</li>
//             )}
//           </ul>
//         </section>

//         {/* ✅ Recent Tests (Dynamic) */}
//         <section className="dashboard-section">
//           <h3>Recent Tests</h3>
//           <ul className="test-list">
//             {recentTests.length > 0 ? (
//               recentTests.map((test) => (
//                 <li key={test._id}>
//                   {test.title} - <strong>{new Date(test.date).toLocaleDateString()}</strong>
//                 </li>
//               ))
//             ) : (
//               <li>No recent tests available</li>
//             )}
//           </ul>
//         </section>

//         {/* Latest Test Results */}
//         <section className="dashboard-section">
//           <h3>Latest Test Results</h3>
//           <ul className="results-list">
//             {latestTestResults.map((result) => (
//               <li key={result.id}>
//                 {result.title}: <strong>{result.score}%</strong> ({result.status})
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Motivational Cards */}
//         <div className="motivation-cards-container">
//           <div className="motivation-card" title={motivationalThought1}>
//             <p>{motivationalThought1}</p>
//           </div>
//           <div className="motivation-card" title={motivationalThought2}>
//             <p>{motivationalThought2}</p>
//           </div>
//         </div>

//         {/* Announcements */}
//         <section className="dashboard-section">
//           <h3>Announcements</h3>
//           <ul className="announcement-list">
//             {announcements.length > 0 ? (
//               announcements.map((item) => (
//                 <li key={item._id || item.id}>{item.message}</li>
//               ))
//             ) : (
//               <li>No announcements available</li>
//             )}
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StudentPage;
// frontend/pages/StudentPage.jsx


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/student.css";
// import "../styles/sidebar.css";

// const StudentPage = () => {
//   const studentEmail = localStorage.getItem("userEmail"); // example: "geeta@gmail.com"

//   const testsAttempted = 5;
//   const modulesCompleted = 8;

//   const latestTestResults = [
//     { id: 1, title: "JavaScript Fundamentals", score: 88, status: "Passed" },
//     { id: 2, title: "HTML & CSS", score: 92, status: "Passed" },
//   ];

//   const motivationalThought1 =
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
//   const motivationalThought2 =
//     "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

//   // ✅ Dynamic data
//   const [problemsSolved, setProblemsSolved] = useState(0);
//   const [recentTests, setRecentTests] = useState([]);
//   const [recentChallenges, setRecentChallenges] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     async function fetchProblemsSolved() {
//       if (!studentEmail) {
//         console.warn("⚠️ No email found in localStorage");
//         return;
//       }

//       try {
//         console.log("📡 Fetching problems solved for:", studentEmail);
//         const res = await fetch(
//           `http://localhost:5000/api/submissions/problems-solved/${studentEmail}`
//         );
//         const data = await res.json();
//         console.log("📦 Response:", data);
//         if (data.success) {
//           setProblemsSolved(data.solvedCount);
//         } else {
//           console.error("❌ Failed to fetch problems solved count");
//         }
//       } catch (err) {
//         console.error("🔥 Error fetching problems solved:", err);
//       }
//     }

//     async function fetchStudentStats() {
//       try {
//         const res = await fetch("http://localhost:5000/api/student/stats?limit=3");
//         const data = await res.json();
//         if (data.success) {
//           setRecentTests(data.recentTests || []);
//           setRecentChallenges(data.recentChallenges || []);
//         }
//       } catch (err) {
//         console.error("Error fetching student stats:", err);
//       }
//     }

//     async function fetchAnnouncements() {
//       try {
//         const res = await fetch("http://localhost:5000/api/announcement?limit=3");
//         const data = await res.json();
//         if (data.success) {
//           setAnnouncements(data.announcements);
//         }
//       } catch (err) {
//         console.error("Error fetching announcements:", err);
//       }
//     }

//     fetchProblemsSolved();
//     fetchStudentStats();
//     fetchAnnouncements();
//   }, [studentEmail]);

//   return (
//     <div className="student-page-container">
//       {/* Sidebar */}
//       <nav className="unified-sidebar">
//         <h2 className="unified-sidebar-title">Student Portal</h2>
//         <ul className="unified-nav-links">
//           <li>
//             <NavLink to="/studentpage" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentprofile" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentmodules" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Coding Practice
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studenttests" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Tests
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentevaluation" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Evaluation
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* ✅ Performance Summary */}
//         <div className="summary-card">
//           <div className="summary-name">Performance Summary</div>
//           <div className="summary-stats">
//             <div className="summary-item">
//               <div className="summary-number">{testsAttempted}</div>
//               <div className="summary-label">Tests Attempted</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{problemsSolved}</div>
//               <div className="summary-label">Problems Solved</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{modulesCompleted}</div>
//               <div className="summary-label">Modules Completed</div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Coding Challenges */}
//         <section className="dashboard-section">
//           <h3>Recent Coding Challenges</h3>
//           <ul className="practice-list">
//             {recentChallenges.length > 0 ? (
//               recentChallenges.map((ch) => (
//                 <li key={ch._id}>
//                   {ch.title} - <strong>{new Date(ch.createdAt).toLocaleDateString()}</strong>
//                 </li>
//               ))
//             ) : (
//               <li>No recent coding challenges available</li>
//             )}
//           </ul>
//         </section>

//         {/* Recent Tests */}
//         <section className="dashboard-section">
//           <h3>Recent Tests</h3>
//           <ul className="test-list">
//             {recentTests.length > 0 ? (
//               recentTests.map((test) => (
//                 <li key={test._id}>
//                   {test.title} - <strong>{new Date(test.date).toLocaleDateString()}</strong>
//                 </li>
//               ))
//             ) : (
//               <li>No recent tests available</li>
//             )}
//           </ul>
//         </section>

//         {/* Latest Test Results */}
//         <section className="dashboard-section">
//           <h3>Latest Test Results</h3>
//           <ul className="results-list">
//             {latestTestResults.map((result) => (
//               <li key={result.id}>
//                 {result.title}: <strong>{result.score}%</strong> ({result.status})
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Motivational Cards */}
//         <div className="motivation-cards-container">
//           <div className="motivation-card" title={motivationalThought1}>
//             <p>{motivationalThought1}</p>
//           </div>
//           <div className="motivation-card" title={motivationalThought2}>
//             <p>{motivationalThought2}</p>
//           </div>
//         </div>

//         {/* Announcements */}
//         <section className="dashboard-section">
//           <h3>Announcements</h3>
//           <ul className="announcement-list">
//             {announcements.length > 0 ? (
//               announcements.map((item) => (
//                 <li key={item._id || item.id}>{item.message}</li>
//               ))
//             ) : (
//               <li>No announcements available</li>
//             )}
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StudentPage;


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/student.css";
import "../styles/sidebar.css";

const StudentPage = () => {
  const studentEmail = localStorage.getItem("userEmail"); 
  const token = localStorage.getItem("studentToken"); // use token for authenticated requests

  const [testsAttempted, setTestsAttempted] = useState(0); // ✅ dynamic
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [recentTests, setRecentTests] = useState([]);
  const [recentChallenges, setRecentChallenges] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const motivationalThought1 =
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
  const motivationalThought2 =
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

  useEffect(() => {
    if (!studentEmail) return;

    async function fetchTestsAttempted() {
      try {
        const res = await fetch("http://localhost:5000/api/testattempts/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.attempts)) {
          setTestsAttempted(data.attempts.length); // ✅ dynamically set count
        }
      } catch (err) {
        console.error("Error fetching test attempts:", err);
      }
    }

    async function fetchProblemsSolved() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/submissions/problems-solved/${studentEmail}`
        );
        const data = await res.json();
        if (data.success) setProblemsSolved(data.solvedCount);
      } catch (err) {
        console.error("Error fetching problems solved:", err);
      }
    }

    async function fetchStudentStats() {
      try {
        const res = await fetch("http://localhost:5000/api/student/stats?limit=3");
        const data = await res.json();
        if (data.success) {
          setRecentTests(data.recentTests || []);
          setRecentChallenges(data.recentChallenges || []);
        }
      } catch (err) {
        console.error("Error fetching student stats:", err);
      }
    }

    async function fetchAnnouncements() {
      try {
        const res = await fetch("http://localhost:5000/api/announcement?limit=3");
        const data = await res.json();
        if (data.success) setAnnouncements(data.announcements || []);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    }

    fetchTestsAttempted();
    fetchProblemsSolved();
    fetchStudentStats();
    fetchAnnouncements();
  }, [studentEmail, token]);

  return (
    <div className="student-page-container">
      {/* Sidebar */}
      <nav className="unified-sidebar">
        <h2 className="unified-sidebar-title">Student Portal</h2>
        <ul className="unified-nav-links">
          <li>
            <NavLink to="/studentpage" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentprofile" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentmodules" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Coding Practice
            </NavLink>
          </li>
          <li>
            <NavLink to="/studenttests" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentevaluation" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Evaluation
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* ✅ Performance Summary */}
        <div className="summary-card">
          <div className="summary-name">Performance Summary</div>
          <div className="summary-stats">
            <div className="summary-item">
              <div className="summary-number">{testsAttempted}</div>
              <div className="summary-label">Tests Attempted</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{problemsSolved}</div>
              <div className="summary-label">Problems Solved</div>
            </div>
           
          </div>
        </div>

        {/* Recent Coding Challenges */}
        <section className="dashboard-section">
          <h3>Recent Coding Challenges</h3>
          <ul className="practice-list">
            {recentChallenges.length > 0 ? (
              recentChallenges.map((ch) => (
                <li key={ch._id}>
                  {ch.title} - <strong>{new Date(ch.createdAt).toLocaleDateString()}</strong>
                </li>
              ))
            ) : (
              <li>No recent coding challenges available</li>
            )}
          </ul>
        </section>

        {/* Recent Tests */}
        <section className="dashboard-section">
          <h3>Recent Tests</h3>
          <ul className="test-list">
            {recentTests.length > 0 ? (
              recentTests.map((test) => (
                <li key={test._id}>
                  {test.title} - <strong>{new Date(test.date).toLocaleDateString()}</strong>
                </li>
              ))
            ) : (
              <li>No recent tests available</li>
            )}
          </ul>
        </section>

       

        {/* Motivational Cards */}
        <div className="motivation-cards-container">
          <div className="motivation-card" title={motivationalThought1}>
            <p>{motivationalThought1}</p>
          </div>
          <div className="motivation-card" title={motivationalThought2}>
            <p>{motivationalThought2}</p>
          </div>
        </div>

        {/* Announcements */}
        <section className="dashboard-section">
          <h3>Announcements</h3>
          <ul className="announcement-list">
            {announcements.length > 0 ? (
              announcements.map((item) => (
                <li key={item._id || item.id}>{item.message}</li>
              ))
            ) : (
              <li>No announcements available</li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StudentPage;


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/student.css";
// import "../styles/sidebar.css";

// const StudentPage = () => {
//   // Get token and email from localStorage
//   const studentToken = localStorage.getItem("studentToken");
//   const userEmail = localStorage.getItem("userEmail");

//   // Static placeholders
//   const testsAttempted = 5;
//   const modulesCompleted = 8;

//   const latestTestResults = [
//     { id: 1, title: "JavaScript Fundamentals", score: 88, status: "Passed" },
//     { id: 2, title: "HTML & CSS", score: 92, status: "Passed" },
//   ];

//   const motivationalThought1 =
//     "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
//   const motivationalThought2 =
//     "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

//   // Dynamic data
//   const [problemsSolved, setProblemsSolved] = useState(0);
//   const [recentTests, setRecentTests] = useState([]);
//   const [recentChallenges, setRecentChallenges] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);

//   // ✅ Fetch problems solved from localStorage
//   const fetchProblemsSolvedFromLocal = () => {
//     const stored = localStorage.getItem("currentProblem");

//     if (!stored) return setProblemsSolved(0);

//     let problems;
//     try {
//       problems = JSON.parse(stored);
//       if (!Array.isArray(problems)) problems = [problems];
//     } catch (err) {
//       console.error("Error parsing localStorage problems:", err);
//       return setProblemsSolved(0);
//     }

//     const solvedCount = problems.reduce((count, problem) => {
//       if (
//         problem.status === "solved" &&
//         Array.isArray(problem.solvedBy) &&
//         problem.solvedBy.includes(userEmail)
//       ) {
//         return count + 1;
//       }
//       return count;
//     }, 0);

//     setProblemsSolved(solvedCount);
//   };

//   // Fetch recent tests, challenges, and announcements
//   useEffect(() => {
//     if (!studentToken || !userEmail) return;

//     fetchProblemsSolvedFromLocal();

//     const fetchStudentStats = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/student/stats?limit=3", {
//           headers: { "Authorization": `Bearer ${studentToken}` },
//         });
//         const data = await res.json();
//         if (data.success) {
//           setRecentTests(data.recentTests || []);
//           setRecentChallenges(data.recentChallenges || []);
//         }
//       } catch (err) {
//         console.error("Error fetching student stats:", err);
//       }
//     };

//     const fetchAnnouncements = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/announcement?limit=3");
//         const data = await res.json();
//         if (data.success) setAnnouncements(data.announcements || []);
//       } catch (err) {
//         console.error("Error fetching announcements:", err);
//       }
//     };

//     fetchStudentStats();
//     fetchAnnouncements();
//   }, [studentToken, userEmail]);

//   return (
//     <div className="student-page-container">
//       {/* Sidebar */}
//       <nav className="unified-sidebar">
//         <h2 className="unified-sidebar-title">Student Portal</h2>
//         <ul className="unified-nav-links">
//           <li>
//             <NavLink to="/studentpage" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentprofile" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentmodules" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Coding Practice
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studenttests" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Tests
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/studentevaluation" className={({ isActive }) => (isActive ? "active-link" : "")}>
//               Evaluation
//             </NavLink>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Performance Summary */}
//         <div className="summary-card">
//           <div className="summary-name">Performance Summary</div>
//           <div className="summary-stats">
//             <div className="summary-item">
//               <div className="summary-number">{testsAttempted}</div>
//               <div className="summary-label">Tests Attempted</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{problemsSolved}</div>
//               <div className="summary-label">Problems Solved</div>
//             </div>
//             <div className="summary-item">
//               <div className="summary-number">{modulesCompleted}</div>
//               <div className="summary-label">Modules Completed</div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Coding Challenges */}
//         <section className="dashboard-section">
//           <h3>Recent Coding Challenges</h3>
//           <ul className="practice-list">
//             {recentChallenges.length > 0 ? (
//               recentChallenges.map((ch) => (
//                 <li key={ch._id}>
//                   {ch.title} - <strong>{new Date(ch.createdAt).toLocaleDateString()}</strong>
//                 </li>
//               ))
//             ) : (
//               <li>No recent coding challenges available</li>
//             )}
//           </ul>
//         </section>

//         {/* Recent Tests */}
//         <section className="dashboard-section">
//           <h3>Recent Tests</h3>
//           <ul className="test-list">
//             {recentTests.length > 0 ? (
//               recentTests.map((test) => (
//                 <li key={test._id}>
//                   {test.title} - <strong>{new Date(test.date).toLocaleDateString()}</strong>
//                 </li>
//               ))
//             ) : (
//               <li>No recent tests available</li>
//             )}
//           </ul>
//         </section>

//         {/* Latest Test Results */}
//         <section className="dashboard-section">
//           <h3>Latest Test Results</h3>
//           <ul className="results-list">
//             {latestTestResults.map((result) => (
//               <li key={result.id}>
//                 {result.title}: <strong>{result.score}%</strong> ({result.status})
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Motivational Cards */}
//         <div className="motivation-cards-container">
//           <div className="motivation-card" title={motivationalThought1}>
//             <p>{motivationalThought1}</p>
//           </div>
//           <div className="motivation-card" title={motivationalThought2}>
//             <p>{motivationalThought2}</p>
//           </div>
//         </div>

//         {/* Announcements */}
//         <section className="dashboard-section">
//           <h3>Announcements</h3>
//           <ul className="announcement-list">
//             {announcements.length > 0 ? (
//               announcements.map((item) => (
//                 <li key={item._id || item.id}>{item.message}</li>
//               ))
//             ) : (
//               <li>No announcements available</li>
//             )}
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StudentPage;
