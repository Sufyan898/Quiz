import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Styles from '../Styling/Student.module.css';

function Student() {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fromConfirmation = localStorage.getItem("fromConfirmation");

    if (fromConfirmation === "true") {
      const saved = JSON.parse(localStorage.getItem("studentInfo"));
      if (saved) {
        setName(saved.name || "");
        setCnic(saved.cnic || "");
        setFatherName(saved.fatherName || "");
        setDob(saved.dob || "");
        setSelectedSubject(saved.selectedSubject || "");
      }
      localStorage.removeItem("fromConfirmation"); // Only once
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !cnic || !fatherName || !dob || !selectedSubject) {
      alert("Please fill all fields.");
      return;
    }

    const studentData = {
      name,
      cnic,
      fatherName,
      dob,
      selectedSubject,
    };

    // Store data temporarily
    localStorage.setItem("studentInfo", JSON.stringify(studentData));
    localStorage.setItem("fromStudentForm", "true");

    // Navigate to confirmation page
    navigate(`/quiz-intro/${selectedSubject}`);
  };

  const handleGoHome = () => {
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("fromStudentForm");
  };

  return (
    <div className={Styles.bgContainer}>
      <div className={Styles.card}>
        <h2 className={`text-center mb-4 ${Styles.title}`}>Student Entry Form</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" className={`form-control mb-3 ${Styles.input}`} placeholder="Enter Candidate Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" className={`form-control mb-3 ${Styles.input}`} placeholder="Enter Father Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
          <input type="text" className={`form-control mb-3 ${Styles.input}`} placeholder="Enter a valid CNIC number" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
          <input type="date" className={`form-control mb-3 ${Styles.input}`} value={dob} onChange={(e) => setDob(e.target.value)} required />

          <select className={`form-control mb-3 ${Styles.input}`} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
            <option value="">Select Subject</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Express">Express</option>
          </select>

          <button type="submit" className={`btn w-100 mb-2 ${Styles.submitBtn}`} disabled={isSubmitting}> 
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <Link to="/" className={`btn w-100 ${Styles.backBtn}`} onClick={handleGoHome}>
            Go back to home page
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Student;
