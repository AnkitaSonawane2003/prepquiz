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

import Doubt from "./admin/Doubt";
import Studentdata from "./admin/Studentdata";
import Teacherdata from "./admin/Teacherdata";
import Addannouncement from "./admin/Addannouncement";

import Adminpage from "./components/Adminpage";
import Teacherpage from "./components/Teacherpage";
import AddProblem from "./components/AddProblem";
import AddTest from "./components/AddTest";
import StudentTests from "./components/StudentTests";
import StudentPractice from "./components/StudentPractice";

import Studentpage from "./components/Studentpage"; // ✅ correct import
import StudentProfile from "./components/studentprofile";
import TeacherProfile from "./components/teacherprofile";
import Dashboard from "./components/Dashboard";
import Compiler from "./components/Compiler";
import Evaluation from "./components/Evaluation"
import AllEvaluation from "./components/AllEvaluation"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 🌐 Public Routes */}
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

        {/* 🧑‍💻 Admin Dashboard */}
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/doubt" element={<Doubt />} />
        <Route path="/studdata" element={<Studentdata />} />
        <Route path="/teacherdata" element={<Teacherdata />} />
        <Route path="/announce" element={<Addannouncement />} />

        {/* 👩‍🏫 Teacher Dashboard */}
        <Route path="/teacherpage" element={<Teacherpage />} />
        <Route path="/teacher-dashboard" element={<Dashboard />} />
        <Route path="/add-aptitude" element={<AddProblem />} />
        <Route path="/teacherprofile" element={<TeacherProfile />} />
        <Route path="/add-test" element={<AddTest />} />

        {/* 🎓 Student Dashboard */}
        <Route path="/studentpage" element={<Studentpage />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/studenttests" element={<StudentTests />} />
        <Route path="/studentmodules" element={<StudentPractice />} />
        <Route path="/studentevaluation" element={<Evaluation/>}/>
        <Route path="allevaluation" element={<AllEvaluation/>}/>

         
          <Route path="/compiler" element={<Compiler />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
