import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fromConfirmation = localStorage.getItem("fromConfirmation");
    if (fromConfirmation === "true") {
      const saved = JSON.parse(localStorage.getItem("studentInfo"));
      if (saved) {
        setEmail(saved.email || "");
        setSelectedSubject(saved.selectedSubject || "");
      }
      localStorage.removeItem("fromConfirmation");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !selectedSubject) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/student/login", {
        email,
        password,
        subject: selectedSubject
      });

      if (res.status === 200) {
        const studentData = { email, name: res.data.student.name, selectedSubject };
        localStorage.setItem("studentInfo", JSON.stringify(studentData));
        localStorage.setItem("fromStudentForm", "true");

        navigate(`/quiz/${selectedSubject}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-success bg-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Student Login</h3>
        <form onSubmit={handleLogin} autoComplete="off">
          
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email:</label>
            <div className="input-group">
              <span className="input-group-text bg-success text-white">
                <FaEnvelope />
              </span>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="new-email" 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password:</label>
            <div className="input-group">
              <span className="input-group-text bg-success text-white">
                <FaLock />
              </span>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="new-password" 
                required 
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Subject:</label>
            <select 
              className="form-select" 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)} 
              required
            >
              <option value="">Select Subject</option>
              <option value="MongoDB">MongoDB</option>
              <option value="ExpressJS">Express</option>
              <option value="ReactJS">React</option>
              <option value="NodeJS">Node</option>
            </select>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-success w-100 mt-2">
            Login
          </button>
          <Link to="/" className="btn btn-outline-success w-100 mt-2">
            Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
