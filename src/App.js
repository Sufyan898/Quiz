import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AdminRegister from './AdminPages/AdminRegister';
import AdminLogin from './AdminPages/AdminLogin';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminDashboard from './AdminPages/AdminDashboard';
import Student from './StudentPages/Student';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/student" element={<Student />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
