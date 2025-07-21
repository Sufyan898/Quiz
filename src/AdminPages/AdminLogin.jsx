import { Children, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login Successful!");

      // Redirect to the dashboard
      navigate("/adminDasboard")

        setEmail("");
        setPassword("");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
    } catch (err) {
      alert("Access Denied or Token Missing");
    }
  };

  return (
    <div className="container mt-5">
            <Link to={"/"} className="text-decoration-none btn btn-outline-dark">Go back to home page</Link>
            {/* <Link to={"/student"} className="text-decoration-none btn btn-outline-dark">Student</Link> */}
            {/* <Link to={"/adminRegister"} className="text-decoration-none btn btn-outline-dark">Admin Register</Link> */}
            {/* <Link to={"/adminLogin"} className="text-decoration-none btn btn-outline-dark">Admin Login</Link> */}
      <h3>Admin Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control"  autoComplete="new-password" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control"  autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>

      <button onClick={fetchDashboard} className="btn btn-info mt-3">
        Access Dashboard
      </button>
    </div>
  );
}

export default AdminLogin;