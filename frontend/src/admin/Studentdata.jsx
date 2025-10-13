import React, { useEffect, useState } from "react";
import "../styles/studentdata.css"

function Studentdata() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the student data when component mounts
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");  // adjust URL based on your API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setStudents(data.students);
        } else {
          throw new Error(data.message || "Failed to fetch students");
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="student-data-container">
      <h2>All Students</h2>
      {students.length === 0 ? (
        <div>No students found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll Number</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stud) => (
              <tr key={stud._id}>
                <td>{stud.fullName}</td>
                <td>{stud.email}</td>
                <td>{stud.rollNumber}</td>
                <td>{stud.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Studentdata;
