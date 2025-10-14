import React, { useState, useEffect } from "react";
import "../styles/studentprofile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null); // Start as null to indicate loading
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:5000/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
        setEditedProfile(data); // Initialize edited profile with fetched data
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProfile();
  }, []);

  const handleEditChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // For now, just update locally.
    // You can add API call here to update profile on backend.
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Student Profile</h2>
        <div className="profile-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
          />
        </div>

        <div className="profile-details">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={editedProfile.fullName || ""}
              onChange={handleEditChange}
            />
          ) : (
            <p>{profile.fullName}</p>
          )}

          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedProfile.email || ""}
              onChange={handleEditChange}
              disabled
              style={{ backgroundColor: "#eee" }}
              title="Email cannot be changed"
            />
          ) : (
            <p>{profile.email}</p>
          )}

          <label>Department:</label>
          {isEditing ? (
            <input
              type="text"
              name="department"
              value={editedProfile.department || ""}
              onChange={handleEditChange}
            />
          ) : (
            <p>{profile.department}</p>
          )}

          <label>Roll Number:</label>
          {isEditing ? (
            <input
              type="text"
              name="rollNumber"
              value={editedProfile.rollNumber || ""}
              onChange={handleEditChange}
              disabled
              style={{ backgroundColor: "#eee" }}
              title="Roll Number cannot be changed"
            />
          ) : (
            <p>{profile.rollNumber}</p>
          )}

          {/* You can add more fields here if needed */}
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

export default StudentProfile;
