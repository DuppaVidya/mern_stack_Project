import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home/home';
import Login from './components/login/login';
import Signup from './components/login/signup';
import Navbar from './components/navbar/navbar';
import Dashboard from './components/student/dashboard';
import Profile from './components/student/profile';
import TeacherDashboard from './components/teacher/teacherdashboard';
import Addlessons from './components/teacher/addLessons';
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/login', '/signup','/dashboard'].includes(location.pathname);

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/addLessons" element={<Addlessons />} />
        {/* Add more routes for other components if needed */}
      </Routes>
    </div>
  );
}

export default App;
