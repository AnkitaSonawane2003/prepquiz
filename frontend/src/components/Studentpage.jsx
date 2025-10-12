<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [modules, setModules] = useState([]);
  const [quickStats, setQuickStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch profile
        const profileRes = await axios.get('/api/student/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data);

        // Fetch modules, stats, activity, and tests
        const [modulesRes, statsRes, activityRes, testsRes] = await Promise.all([
          axios.get('/api/student/modules', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/student/quick-stats', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/student/recent-activity', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/student/upcoming-tests', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Ensure all responses are arrays
        setModules(Array.isArray(modulesRes.data) ? modulesRes.data : []);
        setQuickStats(Array.isArray(statsRes.data) ? statsRes.data : []);
        setRecentActivity(Array.isArray(activityRes.data) ? activityRes.data : []);
        setUpcomingTests(Array.isArray(testsRes.data) ? testsRes.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={profile?.avatar || 'https://via.placeholder.com/150'}
            alt={profile?.name || 'Student'}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
          />
          <button
            onClick={() => navigate('/edit-profile')}
            className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full hover:bg-blue-600 transition"
          >
            <PencilSquareIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
          <p className="text-gray-500">{profile?.course || 'Computer Science Student'}</p>
          <div className="flex justify-center md:justify-start gap-6 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{profile?.questionsSolved || 0}</p>
              <p className="text-sm text-gray-500">Questions Solved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{profile?.accuracy || 0}%</p>
              <p className="text-sm text-gray-500">Accuracy Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{profile?.weeklyGoal || '0/7'}</p>
              <p className="text-sm text-gray-500">Weekly Goal</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/edit-profile')}
            className="mt-4 w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Practice Modules */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">Practice Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.isArray(modules) &&
          modules.map((mod, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              <img src={mod.image} alt={mod.title} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900 mb-1">{mod.title}</h4>
                <p className="text-gray-500 text-sm mb-3">{mod.description}</p>
                <div className="bg-gray-200 h-2 rounded-full mb-3">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${mod.progress || 0}%` }}
                  ></div>
                </div>
                <button
                  onClick={() => navigate(mod.route)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-md text-sm transition"
                >
                  Start Practice
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.isArray(quickStats) &&
          quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              {stat.change && (
                <p
                  className={`text-sm ${
                    stat.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change > 0 ? `+${stat.change}` : stat.change}
                </p>
              )}
            </div>
          ))}
      </div>

      {/* Recent Activity & Upcoming Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="font-bold text-gray-900 mb-3">Recent Activity</h4>
          <ul className="space-y-2">
            {Array.isArray(recentActivity) &&
              recentActivity.map((act, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-500 border-b last:border-0 pb-2"
                >
                  {act.title} - {act.progress}
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <h4 className="font-bold text-gray-900 mb-3">Upcoming Tests</h4>
          <ul className="space-y-2">
            {Array.isArray(upcomingTests) &&
              upcomingTests.map((test, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b last:border-0 pb-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{test.title}</p>
                    <p className="text-xs text-gray-500">
                      {test.date} • {test.duration} min
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(test.route)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Start Test
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
=======
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/student.css";

const StudentPage = () => {
  // Mocked data
  const testsAttempted = 5;
  const problemsSolved = 12;
  const modulesCompleted = 8;

  const recentPractice = [
    { id: 1, title: "Arrays and Loops", completed: true },
    { id: 2, title: "React Components", completed: false },
    { id: 3, title: "JavaScript Promises", completed: true },
  ];

  const upcomingTests = [
    { id: 1, title: "Midterm Exam", date: "2025-10-25" },
    { id: 2, title: "React Basics Quiz", date: "2025-10-30" },
  ];

  const latestTestResults = [
    { id: 1, title: "JavaScript Fundamentals", score: 88, status: "Passed" },
    { id: 2, title: "HTML & CSS", score: 92, status: "Passed" },
  ];

 

  const motivationalThought1 =
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
  const motivationalThought2 =
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

  const announcements = [
    { id: 1, message: "New coding challenges added for October!" },
    { id: 2, message: "Platform maintenance scheduled on Oct 20th." },
  ];

  return (
    <div className="student-page-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Student Portal</h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/modules" activeClassName="active-link">
              Coding Practice
            </NavLink>
          </li>
          <li>
            <NavLink to="/tests" activeClassName="active-link">
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active-link">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">Evaluation</NavLink>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {/* Performance Summary */}
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
            <div className="summary-item">
              <div className="summary-number">{modulesCompleted}</div>
              <div className="summary-label">Modules Completed</div>
            </div>
          </div>
        </div>

        {/* Recent Coding Practice */}
        <section className="dashboard-section">
          <h3>Recent Coding Practice</h3>
          <ul className="practice-list">
            {recentPractice.map((module) => (
              <li key={module.id} className={module.completed ? "completed" : ""}>
                {module.title} {module.completed ? "✓" : "⏳"}
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming Tests */}
        <section className="dashboard-section">
          <h3>Upcoming Tests</h3>
          <ul className="test-list">
            {upcomingTests.map((test) => (
              <li key={test.id}>
                {test.title} - <strong>{test.date}</strong>
              </li>
            ))}
          </ul>
        </section>

        {/* Latest Test Results */}
        <section className="dashboard-section">
          <h3>Latest Test Results</h3>
          <ul className="results-list">
            {latestTestResults.map((result) => (
              <li key={result.id}>
                {result.title}: <strong>{result.score}%</strong> ({result.status})
              </li>
            ))}
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
            {announcements.map((item) => (
              <li key={item.id}>{item.message}</li>
            ))}
          </ul>
        </section>

        <Outlet />
      </main>
>>>>>>> 2bef37c61c69164bc7c45c1db6e43b9946b05085
    </div>
  );
};

export default StudentPage;
