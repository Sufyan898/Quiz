import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <div className="container mt-5">
            <h1 className='display-5'>Welcome to our quiz web application.</h1>
            <p>Register as a <strong>student</strong> to take quizzes or as an admin to manage the quizzes.</p>
            <Link to={"/student"} className='text-decoration-none btn btn-outline-dark'>Student</Link>
            <Link to={"/adminRegister"} className='text-decoration-none btn btn-outline-dark'>Admin</Link>
        </div>
    </div>
  )
}

export default Home
