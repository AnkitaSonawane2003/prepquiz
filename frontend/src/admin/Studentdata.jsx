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
    const response = await fetch("http://localhost:5000/api/student/students")
    console.log("Response object:", response);
    const data = await response.json();
    console.log("Parsed JSON data:", data);

    if (response.ok && data.success) {
      setStudents(data.students);
    } else {
      console.error("Backend returned error:", data);
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
    <div>  {/* This div gets the white background and shadow */}
      <h2>All Students</h2>
      {students.length === 0 ? (
        <div  className="table-wrapper">No students found.</div>
      ) : (
        <table >
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
  </div>
);

}

export default Studentdata;
