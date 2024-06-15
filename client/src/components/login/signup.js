import React, { useState } from 'react';
import './signupStyles.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import imageTeacher from '../../images/teacher.jpg';
import imageAdmin from '../../images/admin.jpg';
import imageStudent from '../../images/student.jpg';
import image2 from '../../images/Logo.png';
// import { useNavigate } from "react-router-dom";
// Navbar section
function Navbar({ setActiveOption }) {
    return (
        <nav>
            <a href="/" className="logo-link">
                <img src={image2} alt="Logo" className="logo" />
            </a>
            <div className="options">
                <li className="option" onClick={() => setActiveOption('student')}>Student</li>
                <li className="option" onClick={() => setActiveOption('teacher')}>Teacher</li>
                <li className="option" onClick={() => setActiveOption('admin')}>Admin</li>
            </div>
        </nav>
    );
}

// Content section
function Content({ activeOption }) {
const navigate = useNavigate()

// Signup form section for Teacher
function TeacherSignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/signup/teacher', formData);
            console.log(formData); // Print form data to console
            navigate("/login")
        }catch (error) {
            console.error('Error logging in:', error);
            // Handle error
        }
    };

    return (
        <div className="signup-form">
            
            <form onSubmit={handleSubmit}>
                <h2>Teacher Signup</h2>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                <button type="submit">Signup</button>
                <p>If you are an existing user, <Link to="/login">login</Link></p>
            </form>
        </div>
    );
    
}
    // Signup form section for Admin
    function AdminSignupForm() {
        return (
            <div className="signup-form">
                <form>
                <h2>Admin Signup</h2>
               
                <h3>Not allowed to signup </h3>
                <p>If you are an existing user, <Link to="/login">login</Link></p>
                </form>
        </div>
        );
    }

    // Signup form section for Student
    function StudentSignupForm() {
        const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        branch: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/signup/student', formData);
            console.log(formData); // Print form data to console
            navigate("/login")
        }catch (error) {
            console.error('Error logging in:', error);
            // Handle error
        }
    };
        return (
            <div className="signup-form">
            
            <form onSubmit={handleSubmit}>
            <h2>Student Signup</h2>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            <button type="submit">Signup</button>
            <p>If you are an existing user, <Link to="/login">login</Link></p>
            </form>
        </div>
        );
    }

    return (
        <div className="content">
            <div className="left-side">
                {activeOption === 'student' && <StudentSignupForm />}
                {activeOption === 'teacher' && <TeacherSignupForm />}
                {activeOption === 'admin' && <AdminSignupForm />}
            </div>
            <div className="right-side1">
                <h2>Welcome to Our Learning Platform!</h2>
                <p>Sign up now to access our educational resources and start learning.</p>
                {activeOption === 'teacher' && <img src={imageTeacher} alt="Teacher" />}
                {activeOption === 'admin' && <img src={imageAdmin} alt="Admin" />}
                {activeOption === 'student' && <img src={imageStudent} alt="Student" />}
            </div>
        </div>
    );
    }

// Default export
export default function Signup() {
    const [activeOption, setActiveOption] = useState('student');

    return (
        <div className="signup">
            <Navbar setActiveOption={setActiveOption} />
            <Content activeOption={activeOption} />
        </div>
    );
}

