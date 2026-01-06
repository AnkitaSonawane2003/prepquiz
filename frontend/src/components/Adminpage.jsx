
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "../styles/admin.css";
import "../styles/sidebar.css";
const Adminpage = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [totalDoubts, setTotalDoubts] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [showAll, setShowAll] = useState(false); 

 
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentRes, teacherRes, contactRes] = await Promise.all([
          fetch('https://prepquiz.onrender.com/api/student/count'),
          fetch('https://prepquiz.onrender.com/api/teacher/count'),
          fetch('https://prepquiz.onrender.com/api/contact/count')
        ]);

        const studentData = await studentRes.json();
        const teacherData = await teacherRes.json();
        const contactData = await contactRes.json();

        setStudentCount(studentData.count || 0);
        setTeacherCount(teacherData.count || 0);
        setTotalDoubts(contactData.count || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

 
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`https://prepquiz.onrender.com/api/announcement${showAll ? '' : '?limit=3'}`);
        const data = await res.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        } else {
          console.error("Failed to fetch announcements");
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, [showAll]); 

  return (
    <div className="student-page-container">
      <nav className="unified-sidebar">
        <h2 className="unified-sidebar-title">Admin Portal</h2>
        <ul className="unified-nav-links">
          
          <li><NavLink to="/studdata">Student Data</NavLink></li>
          <li><NavLink to="/teacherdata">Teacher Data</NavLink></li>
          <li><NavLink to="/doubt">Doubts Section</NavLink></li>
          <li><NavLink to="/allevaluation">Student Evaluation</NavLink></li>
          <li><NavLink to="/announce">Add Alert</NavLink></li>
        </ul>
      </nav>

      <main className="admin-main-content">
        <div className="summary-card">
          <div className="summary-name">Overview</div>
          <div className="summary-stats">
            <div className="summary-item">
              <div className="summary-number">{studentCount}</div>
              <div className="summary-label">Students</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{teacherCount}</div>
              <div className="summary-label">Teachers</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{totalDoubts}</div>
              <div className="summary-label">Doubts Raised</div>
            </div>
          </div>
        </div>

        <section className="dashboard-section">
          <h3>Announcements</h3>
          <ul className="announcement-list">
            {announcements.length > 0 ? (
              announcements.map(item => (
                <li key={item._id || item.id}>{item.message}</li>
              ))
            ) : (
              <li>No announcements available</li>
            )}
          </ul>

     
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="toggle-announcement-btn"
          >
            {showAll ? 'Show Less' : 'View All Announcements'}
          </button>
        </section>

        <Outlet />
      </main>
    </div>
  );
};
export default Adminpage;
