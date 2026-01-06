import React, { useState, useEffect, useRef } from "react";
import "../styles/studentprofile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const API_BASE = "http://localhost:5000"; 

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE}/api/student/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setProfile(data);
        setEditedProfile(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setEditedProfile({ ...editedProfile, profileImage: file });
    }
  };

  const handleEditChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("studentToken");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      const formData = new FormData();
      formData.append("fullName", editedProfile.fullName);
      formData.append("department", editedProfile.department);
      formData.append("rollNumber", editedProfile.rollNumber);
      formData.append("email", editedProfile.email);


      if (editedProfile.profileImage instanceof File) {
        formData.append("profileImage", editedProfile.profileImage);
      }

      const res = await fetch(`${API_BASE}/api/student/profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setProfile(data);
      setEditedProfile(data);
      setPreviewImage(null);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setPreviewImage(null);
    setIsEditing(false);
  };

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Student Profile</h2>

        <div
          className="profile-image-container"
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #4a90e2",
            cursor: isEditing ? "pointer" : "default",
            margin: "auto",
          }}
          onClick={() => isEditing && fileInputRef.current && fileInputRef.current.click()}
        >
          <img
            src={
              previewImage ||
              (profile.profileImage ? `${API_BASE}${profile.profileImage}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
            }
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          {isEditing && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                height: "35%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontSize: "14px",
              }}
            >
              📷 Change
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

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
            />
          ) : (
            <p>{profile.rollNumber}</p>
          )}
        </div>

        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
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
