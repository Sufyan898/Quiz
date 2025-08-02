import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Styles from '../Styling/AdminDashboard.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { MdUploadFile } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import profile from '../Images/profile.jpg';

function AdminDashboard() {
  const [admin, setAdmin] = useState({ fullName: "", email: "" });
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [origin, setOrigin] = useState("");
  const [education, setEducation] = useState("");
  const [about, setAbout] = useState("");

 useEffect(() => {
  const fetchProfile = async () => {
    try { 
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.admin;

      setAdmin({ fullName: data.fullName, email: data.email }); 
      setFullName(data.fullName || "");
      setOrigin(data.origin || "");
      setEducation(data.education || "");
      setAbout(data.about || "");
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  fetchProfile();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/admin/update-profile",
        { fullName, origin, education, about },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar Section Start */}
      <div className={`${Styles.sidebar} d-flex flex-column p-4 justify-content-between`}>
        <div>
          <h2 className="text-white fw-bold mb-5">Admin Panel</h2>

          <Link to="/admin/profile" className="nav-item mb-3 text-decoration-none text-white">
            <div className={`${Styles.nav_link_custom} active`}>
              <FaUserCircle className="me-2" /> Admin Profile
            </div>
          </Link>

          <Link to="/admin/mcqs" className="nav-item mb-3 text-decoration-none text-white">
            <div className={Styles.nav_link_custom}>
              <MdUploadFile className="me-2" /> MCQs Upload
            </div>
          </Link>

          <Link to="/admin/statistics" className="nav-item text-decoration-none text-white">
            <div className={Styles.nav_link_custom}>
              <PiStudentBold className="me-2" /> Student Statistics
            </div>
          </Link>
        </div>

        <div>
          <hr className="bg-light" />
          <p className=" text-center text-white fw-light">admin email</p>
        </div>
      </div>
      {/* Sidebar Section End */}

      {/* Main Content Start */}
      <div className="flex-grow-1 p-4">
        <h1>Admin Profile</h1>

        <div className="container mt-3 shadow p-4 mb-4 bg-white d-flex flex-column align-items-center">
          <img src={profile} alt="admin profile" className={`${Styles.profile_img} rounded-circle`} />

          <div className="container mt-4 text-center">
            <h2>Welcome, {admin.fullName} 👋</h2>
            <p>Email: {admin.email}</p>
          </div>

          <form className="w-100 mt-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Name</label>
              <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)}  name="name" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Origin</label>
              <input type="text" className="form-control" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Enter your origin" name="origin" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Education</label>
              <input type="text" className="form-control" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Enter your education" name="education" />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-dark">About Me</label>
              <textarea className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} rows="3" placeholder="Write something about yourself..." name="about" />
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className={`btn btn-outline-success`}>Update Profile</button>
            </div>
          </form>
          <div className="container mt-4 d-flex justify-content-end">
            <button onClick={handleLogout} className={`btn btn-outline-danger`}>Logout</button>
          </div>
        </div>
      </div>
      
      {/* Main Content End */}
    </div>
  );
}

export default AdminDashboard;
