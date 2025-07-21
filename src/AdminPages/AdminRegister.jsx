import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function AdminRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/register", {
        fullName,
        email,
        password,
      });
      alert("Registration Successful!");
      console.log(response.data);

        setFullName("");
        setEmail("");
        setPassword("");
        
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
            {/* <Link to={"/student"} className="text-decoration-none btn btn-outline-dark">Student</Link> */}
            {/* <Link to={"/adminRegister"} className="text-decoration-none btn btn-outline-dark">Admin Register</Link> */}
            {/* <Link to={"/adminLogin"} className="text-decoration-none btn btn-outline-dark">Admin Login</Link> */}
      <h3>Admin Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Full Name:</label>
          <input type="text" className="form-control"  autoComplete="new-password" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control"  autoComplete="new-password" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control"  autoComplete="new-password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      <Link to={"/"} className="text-decoration-none btn btn-outline-danger">Go back to home page</Link>
      </form>
    </div>
  );
}

export default AdminRegister;
