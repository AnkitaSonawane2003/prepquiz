import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/teacherprofile.css";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const fileInputRef = useRef(null);

  const API_BASE = "https://prepquiz.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("teacherToken");
    if (!token) return navigate("/teacherlogin");

    axios
      .get(`${API_BASE}/api/teacher/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setEditedProfile(res.data);
      })
      .catch(() => {
        localStorage.removeItem("teacherToken");
        navigate("/teacherlogin");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleEditChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setEditedProfile({ ...editedProfile, profileImage: file });
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("teacherToken");
    if (!token) return navigate("/teacherlogin");

    const formData = new FormData();
    formData.append("fullName", editedProfile.fullName);
    formData.append("department", editedProfile.department);
    formData.append("phone", editedProfile.phone || "");
    formData.append("email", editedProfile.email);

    if (editedProfile.profileImage instanceof File)
      formData.append("profileImage", editedProfile.profileImage);

    try {
      const res = await axios.put(`${API_BASE}/api/teacher/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setEditedProfile(res.data);
      setPreviewImage(null);
      setIsEditing(false);
      
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setPreviewImage(null);
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Teacher Profile</h2>

        <div
          className="profile-image-container image-upload-wrapper"
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
          onClick={() => isEditing && fileInputRef.current.click()}
        >
          <img
            src={
              previewImage ||
              (profile.profileImage
                ? `${API_BASE}${profile.profileImage}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
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
          <label>Full Name:</label>
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

          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedProfile.phone || ""}
              onChange={handleEditChange}
            />
          ) : (
            <p>{profile.phone}</p>
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

