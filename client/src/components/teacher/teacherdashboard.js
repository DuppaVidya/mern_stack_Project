import  { useState, useEffect } from 'react';
import './teacherDashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TeacherDashboard() {
    const [courses, setCourses] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCourseData, setNewCourseData] = useState({
        title: '',
        description: '',
        coverImage: null
    });

    useEffect(() => {
        // Fetch courses when the component mounts using Axios
        // axios.get('http://localhost:5000/courses')
        //     .then(response => {
        //         setCourses(response.data);
        //     })
        //     .catch(error => console.error('Error fetching courses:', error));
    }, []);

    // Function to handle course creation using Axios
    function createCourse() {
        const newCourse = { id: courses.length + 1, ...newCourseData };
        setCourses([...courses, newCourse]);
        setShowCreateModal(false);
        setNewCourseData({ title: '', description: '', coverImage: null });
        if (!newCourseData.title || !newCourseData.description) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append('title', newCourseData.title);
        formData.append('description', newCourseData.description);
        if (newCourseData.coverImage) {
            formData.append('coverImage', newCourseData.coverImage);
        }

        // Post the data to the backend using Axios
        axios.post('http://localhost:5000/courses', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Course created:', response.data);
            setCourses([...courses, response.data]);
            setShowCreateModal(false);
            setNewCourseData({ title: '', description: '', coverImage: null });
        })
        .catch(error => {
            console.error('Error creating course:', error);
        });
    }

    // Function to handle cover image file upload
    function handleCoverImageUpload(event) {
        setNewCourseData({ ...newCourseData, coverImage: event.target.files[0] });
    }

    return (
        <div className="teacher-dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Logo</div>
                <ul className="nav-menu">
                    <button className="create-course-btn" onClick={() => setShowCreateModal(true)}>Create New Course</button>
                    <li>My Courses</li>
                    <li>Profile</li>
                    <li>Notifications</li>
                </ul>
            </nav>

            {/* Class Cards */}
            <div className="class-cards">
                {courses.map(course => (
                    <div key={course._id} className="class-card">
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        {/* Display the cover image using an absolute URL */}
                        <Link to="/addlessons"><img src={`http://localhost:5000/uploads/${course.coverImage}`} alt="Course Cover" /></Link>
                    </div>
                ))}
            </div>

            {/* Create Course Modal */}
            {showCreateModal && (
                <div className="create-course-modal">
                    <div className="modal-content">
                        <h2>Create New Course</h2>
                        <form>
                            <input type="text" placeholder="Course Title" value={newCourseData.title} onChange={(e) => setNewCourseData({ ...newCourseData, title: e.target.value })} />
                            <textarea placeholder="Course Description" value={newCourseData.description} onChange={(e) => setNewCourseData({ ...newCourseData, description: e.target.value })}></textarea>
                            <label htmlFor="coverImage">Cover Image:</label>
                            <input type="file" id="coverImage" accept="image/*" onChange={handleCoverImageUpload} />
                            <button id='cc' type="button" onClick={createCourse}>Create Course</button>
                            <button id= 'c' type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherDashboard;
