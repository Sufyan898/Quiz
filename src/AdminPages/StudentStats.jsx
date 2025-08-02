import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Styles from '../Styling/StudentStats.module.css';
import { FaUserCircle } from 'react-icons/fa';
import { MdUploadFile } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';

function StudentStats() {
  return (
<div>
  <div className="d-flex"> {/* Dashboard Container Start*/}
    {/* Sidebae Section Start */}
    <div className={`${Styles.sidebar} d-flex flex-column p-4 justify-content-between`}>
      <div>
        <h2 className="text-white fw-bold mb-5">Admin Panel</h2>

        <Link to="/admin/profile" className="nav-item mb-3 text-decoration-none text-white">
          <div className={`${Styles.nav_link_custom} active`}>
            <FaUserCircle className="me-2" /> Admin Profile
          </div>
        </Link>

        <Link to="/admin/mcqs" className="nav-item mb-3 text-decoration-none text-white">
          <div className={`${Styles.nav_link_custom}`}>
            <MdUploadFile className="me-2" /> MCQs Upload
          </div>
        </Link>

        <Link to="/admin/statistics" className="nav-item text-decoration-none text-white">
          <div className={`${Styles.nav_link_custom}`}>
            <PiStudentBold className="me-2" /> Student Statistics
          </div>
        </Link>
      </div>

      {/* Footer Section Start */}
      <div>
        <hr className="bg-light" />
        <p className="text-white mb-1 fw-bold text-center">Admin Name</p>
        <p className={`${Styles.footerText} text-center`}>admin@example.com</p>
      </div>
      {/* Footer Section End */}
    </div>
    {/* Sidebae Section End */}
    </div>
</div>
  )
}

export default StudentStats
