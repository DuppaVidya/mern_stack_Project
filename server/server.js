// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/DLP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error(err));


const Student = require('./models/studentSchema');
const Teacher = require('./models/teacherSchema');
// const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

app.post('/signup/student', async (req, res) => {
    const { name, phoneNumber, email, branch, password } = req.body;

    try {
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            console.log("Student already exist");
            return res.status(400).json({ message: 'Student already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const student = new Student({
            name,
            phoneNumber,
            email,
            branch,
            password: hashedPassword
        });

        await student.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
});

app.post('/signup/teacher', async (req, res) => {
    
    const { name, phoneNumber, email, department, password } = req.body;
    console.log("I am a Teaher!");
    try {
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            console.log("Teacher already exist");
            return res.status(400).json({ message: 'Teacher already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const teacher = new Teacher({
            name,
            phoneNumber,
            email,
            department,
            password: hashedPassword
        });

        await teacher.save();
        res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering teacher', error });
    }
});

app.post('/login/student', async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) {
            console.log("Student not found!");
            return res.status(404).json({ message: 'Student not found' });
           
        }

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            console.log("Wrong credentials");
            return res.status(400).json({ message: 'Invalid credentials' });
            
        }

        // Generate a token or session here if needed
        // const token = jwt.sign({ id: student._id, email: student.email, role: 'student' }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Student logged in successfully' });
        console.log("success");
    } catch (error) {
        res.status(500).json({ message: 'Error logging in student', error });
    }
});


app.post('/login/teacher', async (req, res) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            console.log("Teacher not found!");
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            console.log("Invalid credentials!");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token or session here if needed
        res.status(200).json({ message: 'Teacher logged in successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in teacher', error });
    }
});


app.post('/login/admin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token or session here if needed
        // const token = jwt.sign({ id: admin._id, email: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Admin logged in successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin', error });
    }
});

const Lesson = require('./models/lessonSchema');

// Middleware for authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Middleware to check if the authenticated teacher owns the course
const checkCourseOwnership = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const teacherId = req.user.id;

        // Find the course in the database
        const course = await Course.findOne({ _id: courseId });

        // If the course doesn't exist or the teacher ID doesn't match, return an error
        if (!course || course.teacherId !== teacherId) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }

        // If the teacher owns the course, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error checking course ownership:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Route to create a lesson
app.post('/courses/:courseId/lessons', authenticateToken, checkCourseOwnership, async (req, res) => {
    try {
        const { title, description } = req.body;
        const courseId = req.params.courseId;
        const teacherId = req.user.id;

        // Create the lesson
        const lesson = new Lesson({
            title,
            description,
            courseId,
            teacherId
        });

        // Save the lesson to the database
        await lesson.save();

        res.status(201).json({ message: 'Lesson created successfully', lesson });
    } catch (error) {
        console.error('Error creating lesson:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to create a course
app.post('/courses', async (req, res) => {
try {
const { title, description } = req.body;
// Create the course
    const course = new Course({
        title,
        description,
        // Assuming you have the teacher ID from the authenticated user
        teacherId: req.email
    });

    // Save the course to the database
    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
} catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
