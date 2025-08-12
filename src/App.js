import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/SignupForm';
import LoginForm from './Components/LoginForm';
import Quiz from './Components/Quiz';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path='/quiz/:subject' element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
