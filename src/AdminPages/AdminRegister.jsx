import React, { useState, useEffect } from "react";
import Styles from "../Styling/AdminRegister.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    setFullName("");
    setEmail("");
    setPassword("");
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/register", {
        fullName,
        email,
        password,
      });
      alert("Registration Successful!");

       // Save to localStorage
    localStorage.setItem("adminInfo", JSON.stringify({
      name: fullName,
      email: email,
    }));

    // Clear fields
      setFullName("");
      setEmail("");
      setPassword("");

      navigate("/admin/dashboard"); //  Redirect to login page

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={Styles.page}>
      <form onSubmit={handleRegister} className={Styles.form} autoComplete="off">
        <h2>Admin Registration</h2>

        <label>User Name:</label>
        <input
          type="text"
          name="fullName_xyz"
          autoComplete="off"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email_xyz"
          autoComplete="off"
          placeholder="Enter your E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password_xyz"
          autoComplete="new-password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-outline-success w-100 mt-3">
          Register
        </button>

        <Link to="/" className="btn btn-outline-danger w-100 mt-3">
          Back to Home
        </Link>
      </form>
    </div>
  );
}

export default AdminRegister;
