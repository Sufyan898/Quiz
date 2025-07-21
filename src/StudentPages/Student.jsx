import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Student() {
  //  States for form inputs
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [lastMarks, setLastMarks] = useState("");

  //  State for button disable during submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  Form Submit Handler
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await axios.post("http://localhost:5000/api/student", {
      name,
      cnic,
      fName: fatherName,
      dob,
      lastMarks,
    });

    if (res.status === 201) {
      alert("Form submitted successfully!");
      setName(""); setCnic(""); setFatherName(""); setDob(""); setLastMarks("");
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert("❗ User with this CNIC already exists.");
    } else {
      console.error("Error:", error.message);
      alert("Network error. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="container mt-5">
      {/* <Link to={"/adminRegister"} className="text-decoration-none btn btn-outline-dark">Admin Register</Link> */}
      {/* <Link to={"/adminLogin"} className="text-decoration-none btn btn-outline-dark">Admin Login</Link> */}
      <h1 className="display-5">Login / Sign Up</h1>
      
      {/* 🔹 Form Element */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Candidate Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter your CNIC"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            required 
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Father Name"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required 
          />
          <input
            type="dob"
            className="form-control mb-2"
            placeholder="Enter DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required 
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Enter Last Marks"
            value={lastMarks}
            onChange={(e) => setLastMarks(e.target.value)}
            required 
          />
        </div>

        
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={isSubmitting} //  disable during submission
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <Link to={"/"} className="text-decoration-none btn btn-outline-danger">Go back to home page</Link>
      </form>
    </div>
  );
}

export default Student;
