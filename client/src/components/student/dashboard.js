import React, { useState ,useEffect} from 'react';
import './studentDashboard.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import imageCourse1 from '../../images/c1.jpg';
import imageCourse2 from '../../images/c2.jpg';




// StudentDashboard component
function StudentDashboard() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Function to toggle profile dropdown menu
    function toggleProfileMenu() {
        setShowProfileMenu(!showProfileMenu);
    }

    return (
        <div className="student-dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Logo</div>
                <ul className="nav-menu">
                    <li>My Courses</li>
                    <li>Notifications</li>
                    <li className="profile" onMouseEnter={toggleProfileMenu} onMouseLeave={toggleProfileMenu}>
                        Profile
                        {showProfileMenu && (
                            <ul className="dropdown-menu">
                                <Link to="/Profile"><li><FontAwesomeIcon icon={faIdCard} />Profile</li></Link>
                                <li><FontAwesomeIcon icon={faGear}/> Settings</li>
                                <li>Logout</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>

            <div className='d-home'>
                {/* My Courses Section */}
                <div className="my-courses">
                    {/* Course Cards */}
                    <div className="course-card">
                        <img src={imageCourse1} alt="Course 1" />
                        <h3>Course 1</h3>
                        <p>Description of Course 1</p>
                    </div>
                    <div className="course-card">
                        <img src={imageCourse2} alt="Course 2" />
                        <h3>Course 2</h3>
                        <p>Description of Course 2</p>
                    </div>
                    <div className="course-card">
                        <img src={imageCourse2} alt="Course 2" />
                        <h3>Course 2</h3>
                        <p>Description of Course 2</p>
                    </div>
                    <div className="course-card">
                        <img src={imageCourse2} alt="Course 2" />
                        <h3>Course 2</h3>
                        <p>Description of Course 2</p>
                    </div> <div className="course-card">
                        <img src={imageCourse2} alt="Course 2" />
                        <h3>Course 2</h3>
                        <p>Description of Course 2</p>
                    </div>
                    {/* Add more course cards as needed */}
                </div>
                <div className='d-right'>
                    <h5>Other content</h5>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
