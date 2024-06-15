import React, { useState } from 'react';
import './loginStyles.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import imageTeacher from '../../images/teacher.jpg';
import imageAdmin from '../../images/admin.jpg';
import imageStudent from '../../images/student.jpg';
import image2 from '../../images/Logo.png';

function Login() {
    const navigate=useNavigate();
    const [activeOption, setActiveOption] = useState('student');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // const history = useHistory(); // Move useHistory hook here

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        try {
            await axios.post(`http://localhost:5000/login/${activeOption}`, formData);
            console.log(`Successfully logged in!${activeOption}`, formData);    
            alert("Login Success!");

            if(activeOption==="student"){
                navigate("/Dashboard")
            }else if(activeOption==="teacher"){
                navigate("/teacherDashboard")
            }
            else{
                console.log("NO Content Found! UNDER DEVELOPMENT");
                // navigate("/adminDashboard");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error
        }
    };

    return (
        <div className="login">
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
            <div className="content">
                <div className="left-side">
                    <div className="login-form">
                        <h2>{activeOption === 'teacher' ? 'Teacher Login' : activeOption === 'admin' ? 'Admin Login' : 'Student Login'}</h2>
                        <input type="text" name="email" value={formData.email} placeholder="Username" onChange={handleInputChange} />
                        <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleInputChange} />
                        <button onClick={handleLogin}>Login</button>
                        <p>If you are a new user, <Link to="/signup">signup</Link></p>
                    </div>
                </div>
                <div className="right-side"> 
                    <h2>Welcome to Our Learning Platform!</h2>
                    <p>Sign in to access your account and st    art learning.</p>
                    {activeOption === 'teacher' && <img src={imageTeacher} alt="Teacher" />}
                    {activeOption === 'admin' && <img src={imageAdmin} alt="Admin" />}
                    {activeOption === 'student' && <img src={imageStudent} alt="Student" />}
                </div>
            </div>
        </div>
    );
}

export default Login;