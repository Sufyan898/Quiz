import React from 'react'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        //If token is missing, redirect to login page
        return <Navigate to="/admin-login" replace />;
    }
    // If token is exist, show the protected route page 
  return children 

}

export default ProtectedRoute
