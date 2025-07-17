import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
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

  const data = { name, cnic, fatherName, dob, lastMarks };

  try {
    const res = await fetch("http://localhost:5000/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.status === 201) {
      alert("Form submitted successfully!");
      // Reset form
      setName(""); setCnic(""); setFatherName(""); setDob(""); setLastMarks("");
    } else if (res.status === 409) {
      alert("❗ User with this CNIC already exists.");
    } else {
      alert(result.error || "Submission failed");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Network error. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="container mt-5">
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

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={isSubmitting} //  disable during submission
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
