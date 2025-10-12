import React, { useState } from "react";
import "../styles/studentprofile.css";


const StudentProfile = () => {
const [profile, setProfile] = useState({
name: "John Doe",
email: "john@example.com",
course: "B.Tech CSE",
rollNo: "CS2021001",
phone: "9876543210"
});


const [isEditing, setIsEditing] = useState(false);
const [editedProfile, setEditedProfile] = useState({ ...profile });


const handleEditChange = (e) => {
setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
};


const handleSave = () => {
setProfile(editedProfile);
setIsEditing(false);
};


const handleCancel = () => {
setEditedProfile(profile);
setIsEditing(false);
};


return (
<div className="profile-container">
<div className="profile-card">
<h2>Student Profile</h2>
<div className="profile-image">
<img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" />
</div>


<div className="profile-details">
<label>Name:</label>
{isEditing ? (
<input type="text" name="name" value={editedProfile.name} onChange={handleEditChange} />
) : (
<p>{profile.name}</p>
)}


<label>Email:</label>
{isEditing ? (
<input type="email" name="email" value={editedProfile.email} onChange={handleEditChange} />
) : (
<p>{profile.email}</p>
)}


<label>Course:</label>
{isEditing ? (
<input type="text" name="course" value={editedProfile.course} onChange={handleEditChange} />
) : (
<p>{profile.course}</p>
)}


<label>Roll No:</label>
{isEditing ? (
<input type="text" name="rollNo" value={editedProfile.rollNo} onChange={handleEditChange} />
) : (
<p>{profile.rollNo}</p>
)}


<label>Phone:</label>
{isEditing ? (
<input type="text" name="phone" value={editedProfile.phone} onChange={handleEditChange} />
) : (
<p>{profile.phone}</p>
)}
</div>


<div className="profile-buttons">
{isEditing ? (
<>
<button className="save-btn" onClick={handleSave}>Save</button>
<button className="cancel-btn" onClick={handleCancel}>Cancel</button>
</>
) : (
<button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
)}
</div>
</div>
</div>
);
};


export default StudentProfile;