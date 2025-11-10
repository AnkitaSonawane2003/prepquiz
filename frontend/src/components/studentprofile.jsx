// import React, { useState, useEffect } from "react";
// import "../styles/studentprofile.css";

// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null); // Start as null to indicate loading
//   const [editedProfile, setEditedProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("studentToken");
//     if (!token) {
//       setError("No token found. Please login.");
//       return;
//     }

//     async function fetchProfile() {
//       try {
//         const res = await fetch("http://localhost:5000/api/student/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(data.message || "Failed to fetch profile");
//         }

//         const data = await res.json();
//         setProfile(data);
//         setEditedProfile(data); // Initialize edited profile with fetched data
//       } catch (err) {
//         setError(err.message);
//       }
//     }

//     fetchProfile();
//   }, []);

//   const handleEditChange = (e) => {
//     setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     // For now, just update locally.
//     // You can add API call here to update profile on backend.
//     setProfile(editedProfile);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditedProfile(profile);
//     setIsEditing(false);
//   };

//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h2>Student Profile</h2>
//         <div className="profile-image">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="Profile"
//           />
//         </div>

//         <div className="profile-details">
//           <label>Name:</label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="fullName"
//               value={editedProfile.fullName || ""}
//               onChange={handleEditChange}
//             />
//           ) : (
//             <p>{profile.fullName}</p>
//           )}

//           <label>Email:</label>
//           {isEditing ? (
//             <input
//               type="email"
//               name="email"
//               value={editedProfile.email || ""}
//               onChange={handleEditChange}
//               disabled
//               style={{ backgroundColor: "#eee" }}
//               title="Email cannot be changed"
//             />
//           ) : (
//             <p>{profile.email}</p>
//           )}

//           <label>Department:</label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="department"
//               value={editedProfile.department || ""}
//               onChange={handleEditChange}
//             />
//           ) : (
//             <p>{profile.department}</p>
//           )}

//           <label>Roll Number:</label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="rollNumber"
//               value={editedProfile.rollNumber || ""}
//               onChange={handleEditChange}
//               disabled
//               style={{ backgroundColor: "#eee" }}
//               title="Roll Number cannot be changed"
//             />
//           ) : (
//             <p>{profile.rollNumber}</p>
//           )}

//           {/* You can add more fields here if needed */}
//         </div>

//         <div className="profile-buttons">
//           {isEditing ? (
//             <>
//               <button className="save-btn" onClick={handleSave}>
//                 Save
//               </button>
//               <button className="cancel-btn" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button className="edit-btn" onClick={() => setIsEditing(true)}>
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;
// import React, { useState, useEffect, useRef } from "react";
// import "../styles/studentprofile.css";

// const StudentProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [editedProfile, setEditedProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem("studentToken");
//     if (!token) {
//       setError("No token found. Please login.");
//       return;
//     }

//     async function fetchProfile() {
//       try {
//         const res = await fetch("http://localhost:5000/api/student/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

//         setProfile(data);
//         setEditedProfile(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     }

//     fetchProfile();
//   }, []);

//   // 🖼️ Handle image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setPreviewImage(previewURL);
//       setEditedProfile({ ...editedProfile, profileImage: file });
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setProfile({
//       ...editedProfile,
//       profileImage: previewImage || profile.profileImage,
//     });
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditedProfile(profile);
//     setPreviewImage(null);
//     setIsEditing(false);
//   };

//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h2>Student Profile</h2>

//         {/* 🖼️ Profile Image */}
//         <div
//           className="image-upload-wrapper"
//           style={{ position: "relative", display: "inline-block" }}
//         >
//           <img
//             src={
//               previewImage ||
//               profile.profileImage ||
//               "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             }
//             alt="Profile"
//             className={`clickable-image ${isEditing ? "editable" : ""}`}
//             style={{
//               width: "120px",
//               height: "120px",
//               borderRadius: "50%",
//               cursor: isEditing ? "pointer" : "default",
//               border: "3px solid #4a90e2",
//               objectFit: "cover",
//             }}
//             onClick={() => {
//               if (isEditing && fileInputRef.current) {
//                 fileInputRef.current.click(); // ✅ Guaranteed to trigger file input
//               }
//             }}
//           />
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ display: "none" }}
//           />
//         </div>

//         {/* Profile Details */}
//         <div className="profile-details">
//           <label>Name:</label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="fullName"
//               value={editedProfile.fullName || ""}
//               onChange={handleEditChange}
//             />
//           ) : (
//             <p>{profile.fullName}</p>
//           )}

//           <label>Email:</label>
//           <p>{profile.email}</p>

//           <label>Department:</label>
//           {isEditing ? (
//             <input
//               type="text"
//               name="department"
//               value={editedProfile.department || ""}
//               onChange={handleEditChange}
//             />
//           ) : (
//             <p>{profile.department}</p>
//           )}

//           <label>Roll Number:</label>
//           <p>{profile.rollNumber}</p>
//         </div>

//         {/* Buttons */}
//         <div className="profile-buttons">
//           {isEditing ? (
//             <>
//               <button className="save-btn" onClick={handleSave}>
//                 Save
//               </button>
//               <button className="cancel-btn" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button className="edit-btn" onClick={() => setIsEditing(true)}>
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;
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

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:5000/api/student/profile", {
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

  // 🖼️ Handle image change (preview only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setEditedProfile({ ...editedProfile, profileImage: file });
    }
  };

  // ✏️ Handle text input changes
  const handleEditChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  // 💾 Save changes (send to backend)
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("studentToken");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      // Prepare form data for sending file + text
      const formData = new FormData();
      formData.append("fullName", editedProfile.fullName);
      formData.append("department", editedProfile.department);
      formData.append("rollNumber", editedProfile.rollNumber);

      if (editedProfile.profileImage instanceof File) {
        formData.append("profileImage", editedProfile.profileImage);
      }

      const res = await fetch("http://localhost:5000/api/student/profile", {
        method: "PUT", // or PATCH depending on backend
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

        {/* 🖼️ Profile Image */}
       {/* 🖼️ Profile Image Upload */}
<div className="image-upload-wrapper" style={{ position: "relative", display: "inline-block" }}>
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
    }}
    onClick={() => {
      if (isEditing && fileInputRef.current) {
        fileInputRef.current.click();
      }
    }}
  >
    <img
      src={
        previewImage ||
        profile.profileImage ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt="Profile"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "50%",
        pointerEvents: "none", // ✅ ensures clicks go to parent div
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

  {/* Hidden File Input */}
  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    style={{ display: "none" }}
  />
</div>


        {/* 🧾 Profile Details */}
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
          <p>{profile.email}</p>

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

        {/* Buttons */}
        <div className="profile-buttons">
          {isEditing ? (
            <>
              <button
                className="save-btn"
                onClick={handleSave}
                disabled={loading}
              >
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
