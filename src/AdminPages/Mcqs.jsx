// AdminPages/Mcqs.jsx
import React, { useState } from 'react';
import McqForm from './McqForm';
import McqPreviewTable from './McqPreview';
import axios from 'axios';
import Styles from '../Styling/Mcqs.module.css';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { MdUploadFile } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';

function Mcqs() {
  const [mcqs, setMcqs] = useState([]);

  const addMcq = (newMcq) => {
    setMcqs([...mcqs, newMcq]);
  };

  const deleteMcq = (index) => {
    const updated = mcqs.filter((_, i) => i !== index);
    setMcqs(updated);
  };

  const handleFinalSubmit = async () => {
  if (mcqs.length < 10) {
    alert('Please add at least 10 MCQs before submitting.');
    return;
  }

  if (mcqs.length > 40) {
    alert('You can add a maximum of 40 MCQs.');
    return;
  }

  try {
    const time = mcqs.length;

    const response = await axios.post('http://localhost:5000/api/mcqs', { mcqs, time });

    alert(response.data.message);
    setMcqs([]);
  } catch (error) {
    console.error('Submission error:', error.response?.data || error.message);
    alert('Failed to submit MCQs. Please check the console for details.');
  }
};


  return (

    <div className="d-flex">
      {/* Sidebar Section Start */}
      <div className={`${Styles.sidebar} d-flex flex-column p-4 bg-success justify-content-between`}>
        <div>
          <h2 className="text-white fw-bold mb-5">Admin Panel</h2>

          <Link to="/admin/profile" className="nav-item mb-3 text-decoration-none text-white">
            <div className={`${Styles.nav_link_custom} active`}>
              <FaUserCircle className="me-2" /> Admin Profile
            </div>
          </Link>

          <Link to="/admin/mcqs" className="nav-item mb-3 text-decoration-none text-white">
            <div className={Styles.nav_link_custom}>
              <MdUploadFile className="me-2" /> MCQs Upload
            </div>
          </Link>

          <Link to="/admin/statistics" className="nav-item text-decoration-none text-white">
            <div className={Styles.nav_link_custom}>
              <PiStudentBold className="me-2" /> Student Statistics
            </div>
          </Link>
        </div>

        <div>
          <hr className="bg-light" />
          <p className={`${Styles.footerText} text-center text-white fw-light`}>admin email</p>
        </div>
      </div>
      {/* Sidebar Section End */}
    
    <div className="container mt-4">
      <McqForm addMcq={addMcq} />
      <McqPreviewTable mcqs={mcqs} deleteMcq={deleteMcq} />
      {mcqs.length > 0 && (
        <button className="btn btn-primary mt-3" onClick={handleFinalSubmit}>
          Submit All MCQs
        </button>
      )}
    </div>
</div>
  );
}

export default Mcqs;
