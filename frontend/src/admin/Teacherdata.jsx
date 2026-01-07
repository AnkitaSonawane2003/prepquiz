import React, { useEffect, useState } from "react";
import "../styles/teacherdata.css";

function Teacherdata() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("https://prepquiz.onrender.com/api/teacher/all");
        const data = await response.json();

        if (response.ok && data.success) {
          setTeachers(data.teachers);
        } else {
          throw new Error(data.message || "Failed to fetch teachers");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading teachers...</div>;
  if (error) return <div style={{ padding: "20px", textAlign: "center", color: "red" }}>Error: {error}</div>;

  return (
    <div className="teacher-data-container">
      <div>
        <h2>All Teachers</h2>
        {teachers.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center" }}>No teachers found.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher.fullName}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teacherdata;
