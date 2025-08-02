import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Styles from '../Styling/Home.module.css';

function Home() {
  return (
    // home_container Start
    <div className={Styles.home_container}>  
      <div className={Styles.home_box}> {/* home_box Start */}
        <h1 className='display-6 mb-4 text-dark'>WELCOME TO OUR QUIZ WEB APPLICATION</h1>
        <p className='mb-4 text-secondary'>
          Register as a <strong>student</strong> to take quizzes or as an <strong>admin</strong> to manage the quizzes.
        </p>
        <div className="d-grid gap-2">
          <Link to={"/student"} className='btn btn-outline-primary'>
            Register as a Student
          </Link>
          <Link to={"/adminRegister"} className='btn btn-outline-success'>
            Register as an Admin
          </Link>
          <Link to={"/admin-login"} className='btn btn-outline-success'>
            Already have an account as an Admin?
          </Link>
        </div>
      </div> {/* home_box End */}
    </div> // home_container End
  );
}

export default Home;
