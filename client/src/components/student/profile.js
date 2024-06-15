// studentProfile.js

import React from 'react';
import './studentProfile.css';  

function StudentProfile() {
    // Sample student data
    const student = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        enrollmentYear: 2022,
        department: 'Computer Science',
        coursesEnrolled: ['Course 1', 'Course 2', 'Course 3'],
        // Add more student data as needed
    };

    return (
        <div className="student-profile">
            <h2>Student Profile</h2>
            <div className="profile-details">
                <div className="profile-info">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Enrollment Year:</strong> {student.enrollmentYear}</p>
                    <p><strong>Department:</strong> {student.department}</p>
                </div>
                <div className="courses-enrolled">
                    <h3>Courses Enrolled:</h3>
                    <ul>
                        {student.coursesEnrolled.map((course, index) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                </div>
                {/* Add more profile details as needed */}
            </div>
        </div>
    );
}

export default StudentProfile;
