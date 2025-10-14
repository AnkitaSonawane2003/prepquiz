import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages & Components
import Home from "./pages/Home";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Register from "./pages/Register";
import RegisterTeacher from "./pages/RegisterTeacher";
import TeacherLogin from "./pages/TeacherLogin";
import Selection from "./pages/Selection";
import StudentLogin from "./pages/Studentlogin";
import RegisterStudent from "./pages/Registerstudent";
import AdminLogin from "./pages/Adminlogin";

import Adminpage from "./components/Adminpage";
import Teacherpage from "./components/Teacherpage";
import AddProblem from "./components/addaptitudequestion";

import StudentPage from "./components/Studentpage";
import StudentProfile from "./components/studentprofile";
import TeacherProfile from "./components/teacherprofile";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/teacherregister" element={<RegisterTeacher />} />
        <Route path="/register" element={<Register />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/regstud" element={<RegisterStudent />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Dashboards */}
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/studentpage" element={<StudentPage />} />

        {/* Teacher Dashboard with Nested Routes */}
        <Route path="/teacherpage" element={<Teacherpage />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* Default dashboard content */}
          {/* <Route
            index
            element={<h2 style={{ padding: "20px" }}>Welcome to Teacher Dashboard</h2>}
          /> */}
          {/* Nested routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-aptitude" element={<AddProblem />} />
          <Route path="teacherprofile" element={<TeacherProfile />} />
        </Route>

        {/* Profile Pages */}
        <Route path="/studentprofile" element={<StudentProfile />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
