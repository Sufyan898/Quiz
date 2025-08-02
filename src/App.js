import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import AdminRegister from './AdminPages/AdminRegister';
import AdminLogin from './AdminPages/AdminLogin';
import AdminDashboard from './AdminPages/AdminDashboard';
import Mcqs from './AdminPages/Mcqs';
import Student from './StudentPages/Student';
import StudentStats from './AdminPages/StudentStats';
import Quiz from './StudentPages/Quiz';
import QuizIntro from './StudentPages/QuizIntro';
import Result from './StudentPages/Result';
import ProtectedRoute from './Components/protectedRoute/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
       
        <Route path="/student" element={<Student />} />
        <Route path="/quiz-intro/:subject" element={<QuizIntro />} />
        <Route path='/quiz' element={<Quiz></Quiz>} />
        <Route path='/result' element={<Result></Result>} />

        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        {/* <Route path="/admin/profile" element={<AdminDashboard />}/> */}
        <Route path="/admin/mcqs" element={<ProtectedRoute><Mcqs /></ProtectedRoute>}/>
        <Route path="/admin/statistics" element={<ProtectedRoute><StudentStats /></ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
