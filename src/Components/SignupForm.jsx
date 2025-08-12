import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaBook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [subject, setSubject] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !dob || !subject) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const isoDob = new Date(dob).toISOString().split("T")[0];

    try {
      const res = await axios.post("http://localhost:5000/api/student/signup", {
        name,
        email,
        password,
        dob: isoDob,
        subject,
      });

      if (res.status === 201) {
        const { token, student } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("studentInfo", JSON.stringify(student));
        navigate(`/quiz/${student.selectedSubject}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#2e8b57" }} // Sea Green background
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-4 text-success">Student Signup</h3>

        <form onSubmit={handleSignup}>

          {/* Name */}
          <div className="mb-3 position-relative">
            <FaUser
              className="position-absolute top-50 translate-middle-y text-success"
              style={{ left: "12px", fontSize: "1.2rem" }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 position-relative">
            <FaEnvelope
              className="position-absolute top-50 translate-middle-y text-success"
              style={{ left: "12px", fontSize: "1.2rem" }}
            />
            <input
              type="email"
              className="form-control ps-5"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <FaLock
              className="position-absolute top-50 translate-middle-y text-success"
              style={{ left: "12px", fontSize: "1.2rem" }}
            />
            <input
              type={showPassword ? "text" : "password"}
              className="form-control ps-5"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#198754",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* DOB */}
          <div className="mb-3 position-relative">
            <FaCalendarAlt
              className="position-absolute top-50 translate-middle-y text-success"
              style={{ left: "12px", fontSize: "1.2rem" }}
            />
            <input
              type="date"
              className="form-control ps-5"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {/* Subject */}
          <div className="mb-3 position-relative">
            <FaBook
              className="position-absolute top-50 translate-middle-y text-success"
              style={{ left: "12px", fontSize: "1.2rem" }}
            />
            <select
              className="form-select ps-5 text-success"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="">Select Subject</option>
              <option value="ReactJS">React</option>
              <option value="MongoDB">MongoDB</option>
              <option value="ExpressJS">Express</option>
              <option value="NodeJS">Node</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="d-flex align-items-center my-3 text-success">
          <hr className="flex-grow-1" />
          <span className="mx-2 fw-bold">OR</span>
          <hr className="flex-grow-1" />
        </div>

        <Link
          to="/login-form"
          className="btn btn-outline-success w-100 fw-semibold"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
