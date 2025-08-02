import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; // ✅ required

function QuizIntro() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fromForm = localStorage.getItem("fromStudentForm");
    const saved = JSON.parse(localStorage.getItem("studentInfo"));

    if (fromForm === "true" && saved) {
      setStudentData(saved);
    } else {
      navigate("/studentform"); // Prevent direct access
    }
  }, [navigate]);

  const handleConfirm = async () => {
    if (!studentData) return;

    try {
      setIsSubmitting(true);
      alert("Form is submitting and quiz is now starting...");

      //  Send student data to backend
      const response = await axios.post("http://localhost:5000/api/studentform", studentData);

      if (response.status === 201 || response.status === 200) {
        //  Clear localStorage
        localStorage.removeItem("studentInfo");
        localStorage.removeItem("fromStudentForm");

        //  Navigate to quiz
        navigate(`/quiz/${studentData.selectedSubject}`);
      } else {
        alert("Failed to submit. Try again.");
      }
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Server error while submitting. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!studentData) return <p>Loading...</p>;

  return (
    <div className="container mt-5 p-4 border rounded shadow">
      <h2 className="mb-3">Ready to Begin?</h2>
      <p><strong>Subject:</strong> {studentData.selectedSubject}</p>
      <p><strong>Candidate:</strong> {studentData.name}</p>
      <p><strong>Instructions:</strong></p>
      <ul>
        <li>Each question = 1 mark</li>
        <li>Each question = 1 minute</li>
        <li>Minimum 10 MCQs per test</li>
        <li>Once started, cannot be paused or exited</li>
      </ul>

      <div className="d-flex justify-content-between mt-4">
        <Link to="/student" className="btn btn-secondary mt-2" onClick={() => localStorage.setItem("fromConfirmation", "true")}>
          Change Subject
        </Link>

        <button onClick={handleConfirm} className="btn btn-success" disabled={isSubmitting}> {isSubmitting ? "Submitting..." : "Start Quiz"}</button>
      </div>
    </div>
  );
}

export default QuizIntro;
