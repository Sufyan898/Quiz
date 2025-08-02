import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "../Styling/AdminLogin.module.css"; // custom CSS

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
      setEmail("");
      setPassword("");
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={`${Styles.bg} d-flex align-items-center justify-content-center min-vh-100`}>
      <div className={`${Styles.card} p-4 shadow`}>
        <h3 className="text-center mb-4 text-white fw-bold">Admin Login</h3>
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="mb-3">
              <label className="form-label text-white fw-semibold">Email</label>
              <div className="input-group">
                <span className={`${Styles.icon} input-group-text`}>
                  <FaEnvelope />
                </span>
                <input type="email" className="form-control" name="email_fake" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="new-email" required/>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-semibold">Password</label>
              <div className="input-group">
                <span className={`${Styles.icon} input-group-text`}><FaLock /></span>
                <input type="password" className="form-control" name="password_fake" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
              </div>
            </div>

            <button type="submit" className={`btn ${Styles.loginBtn} w-100 mt-3`}>Login</button>
          <Link to="/" className={`btn btn-outline-light w-100 mt-2`}>Back to Home</Link>
        </form>
  </div>
</div>
  );
}

export default AdminLogin;
