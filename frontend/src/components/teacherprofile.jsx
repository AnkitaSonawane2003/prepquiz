import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/studentprofile.css"; // reuse your existing styles

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch teacher profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("teacherToken");
    if (!token) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    axios
      .get("http://localhost:5000/api/teachers/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setEditedProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("teacherToken");
        navigate("/login"); // redirect if token invalid
      });
  }, [navigate]);

  const handleEditChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const token = localStorage.getItem("teacherToken");
    axios
      .put("http://localhost:5000/api/teachers/profile", editedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setEditedProfile(res.data);
        setIsEditing(false);
        alert("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Failed to update profile.");
      });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Teacher Profile</h2>

        <div className="profile-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
          />
        </div>

        <div className="profile-details">
          <label>Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={editedProfile.fullName}
              onChange={handleEditChange}
            />
          ) : (
            <p>{profile.fullName}</p>
          )}

          <label>Email:</label>
          <p>{profile.email}</p> {/* Email usually not editable */}

          <label>Department:</label>
          {isEditing ? (
            <input
              type="text"
              name="department"
              value={editedProfile.department}
              onChange={handleEditChange}
            />
          ) : (
            <p>{profile.department}</p>
          )}

          <label>Employee ID:</label>
          <p>{profile.employeeId || "Not assigned"}</p>

          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedProfile.phone || ""}
              onChange={handleEditChange}
            />
          ) : (
            <p>{profile.phone || "Not provided"}</p>
          )}
        </div>

        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
