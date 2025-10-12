import React, { useState } from "react";

const questionsData = {
  aptitude: [
    { id: 1, question: "What is the next number in the series: 2, 4, 8, 16, ?" },
    { id: 2, question: "If a train travels at 60km/h for 2 hours, how far does it go?" },
  ],
  dsa: [
    { id: 1, question: "Explain the difference between an array and linked list." },
    { id: 2, question: "Implement a function to reverse a string." },
  ],
  gd: [
    { id: 1, question: "Discuss the impact of social media on youth." },
    { id: 2, question: "Is online education better than traditional classrooms?" },
  ],
};

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("aptitude");

  const studentProfile = {
    name: "John Doe",
    rollNo: "12345",
    course: "B.Tech Computer Science",
    email: "john.doe@studentmail.com",
  };

  const performanceData = {
    aptitudeScore: 75,
    dsaScore: 60,
    gdScore: 80,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 font-sans text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between bg-teal-700 rounded-lg shadow-lg p-4 mb-8">
        <div className="flex items-center gap-3">
          <img src="/logo192.png" alt="PrepQuiz Logo" className="w-12 h-12 rounded-full shadow" />
          <h1 className="text-yellow-400 font-extrabold text-2xl select-none">PrepQuiz</h1>
        </div>
        <nav className="space-x-6 text-white font-semibold text-lg">
          <a href="#" className="hover:text-yellow-300 transition-colors">Home</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">About</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Features</a>
          <a href="#" className="hover:text-yellow-300 transition-colors">Logout</a>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Profile Card */}
        <aside className="bg-gradient-to-br from-cyan-200 to-teal-300 rounded-xl p-6 shadow-md text-center transition-transform hover:scale-105 duration-300">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow"
          />
          <h2 className="text-2xl font-bold text-teal-900 mb-1">{studentProfile.name}</h2>
          <p className="text-teal-800 my-1">
            <span className="font-semibold">Roll No:</span> {studentProfile.rollNo}
          </p>
          <p className="text-teal-700 my-1">
            <span className="font-semibold">Course:</span> {studentProfile.course}
          </p>
          <p className="text-teal-700 my-3 break-words">
            <span className="font-semibold">Email:</span>{" "}
            <a href={`mailto:${studentProfile.email}`} className="text-blue-700 hover:underline">
              {studentProfile.email}
            </a>
          </p>
        </aside>

        {/* Main content area */}
        <main className="md:col-span-3 flex flex-col gap-10">
          {/* Tabs */}
          <div className="border-b border-gray-300 flex justify-center md:justify-start gap-6 mb-6">
            {["aptitude", "dsa", "gd"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`uppercase font-semibold text-lg px-5 py-2 rounded-md transition duration-300 ${
                  activeTab === tab
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-400/40"
                    : "bg-gray-100 text-gray-600 hover:bg-teal-200 hover:text-teal-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Questions section */}
          <section className="bg-gradient-to-tr from-white to-teal-50 rounded-lg p-6 shadow-md max-h-[400px] overflow-y-auto">
            <h3 className="text-xl font-bold text-teal-700 mb-4">{activeTab.toUpperCase()} Questions</h3>
            <ul className="list-disc list-inside space-y-3 text-teal-600">
              {questionsData[activeTab].map((q) => (
                <li key={q.id} className="hover:text-teal-800 transition-colors cursor-pointer">
                  {q.question}
                </li>
              ))}
            </ul>
          </section>

          {/* Performance analysis */}
          <section className="bg-white rounded-xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-teal-900 mb-6 border-b border-teal-200 pb-2 select-none">
              Performance Analysis
            </h3>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="bg-teal-100 rounded-xl p-6 shadow-inner">
                <h4 className="font-semibold text-teal-800 mb-2">Aptitude</h4>
                <p className="text-3xl font-extrabold text-teal-700">{performanceData.aptitudeScore}%</p>
                <div className="mt-3 h-3 bg-teal-300 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${performanceData.aptitudeScore}%` }}
                    className="h-full bg-teal-600 rounded-full transition-width duration-700 ease-in-out"
                  ></div>
                </div>
              </div>
              <div className="bg-green-100 rounded-xl p-6 shadow-inner">
                <h4 className="font-semibold text-green-700 mb-2">DSA</h4>
                <p className="text-3xl font-extrabold text-green-700">{performanceData.dsaScore}%</p>
                <div className="mt-3 h-3 bg-green-300 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${performanceData.dsaScore}%` }}
                    className="h-full bg-green-600 rounded-full transition-width duration-700 ease-in-out"
                  ></div>
                </div>
              </div>
              <div className="bg-purple-100 rounded-xl p-6 shadow-inner">
                <h4 className="font-semibold text-purple-700 mb-2">GD</h4>
                <p className="text-3xl font-extrabold text-purple-700">{performanceData.gdScore}%</p>
                <div className="mt-3 h-3 bg-purple-300 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${performanceData.gdScore}%` }}
                    className="h-full bg-purple-600 rounded-full transition-width duration-700 ease-in-out"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
