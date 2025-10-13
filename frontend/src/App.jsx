import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

// Pages
import Home from "./pages/Home";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Adminpage from "./components/Adminpage";
import Teacherpage from "./components/Teacherpage";

// Auth Pages
import Register from "./pages/Register";
import RegisterTeacher from "./pages/RegisterTeacher";
import TeacherLogin from "./pages/TeacherLogin";
import Selection from "./pages/Selection";
import StudentLogin from "./pages/Studentlogin";
import RegisterStudent from "./pages/Registerstudent";
import AdminLogin from "./pages/Adminlogin";
import Doubt from "./admin/Doubt";
import Studentpage from "./components/Studentpage"
import Studentdata from "./admin/Studentdata";

function App() {
  return (
    <>
      {/* Common Header */}
      <Navbar />

      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Authentication & User Routes */}
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/teacherregister" element={<RegisterTeacher />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Corrected Path */}
        <Route path="/selection" element={<Selection />} />

        {/* Student Routes */}
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/regstud" element={<RegisterStudent />} />

        {/* Admin & Dashboard Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/teacherpage" element={<Teacherpage />} />
        <Route path="/studentpage" element={<Studentpage />} />
        <Route path="doubt" element={<Doubt />}/>
         <Route path="studdata" element={<Studentdata />}/>
      </Routes>

      {/* Common Footer */}
      <Footer />
    </>
  );
}

export default App;
