const express = require('express');
const {Student , Course} = require('./models')
const app = express();

app.use(express.json());

// Create a new Student
app.post('/students' , async (req , res) => {
    try {
        const student = await Student.create(req.body);
        res.json(student);
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
});

// Get all students
app.get('/students' , async (req , res) => {
    try{
        const students = await Student.findAll();
        res.json(students);
    }

    catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Get one student
app.get('/students/:id' , async (req , res) => {
    try{
        const student = await Student.findByPk(req.params.id);
        res.json(student);
    }

    catch(error) {
        res.status(500).json({error: error.message});
    }
});

// Update a student
app.put('/students/:id' , async (req , res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if(!student) {
            res.status(404).json({error : 'Student not found'});
        }
        await student.update(req.body);
        res.json(student);
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

// Delete a student
app.delete('/students/:id' , async (req , res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if(!student){
            res.status(404).json({error : 'Student not found'});
        }
        await student.destroy();
        res.json({message : "Student removed successfully"});
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

// Create a new Course
app.post('/courses' , async (req  , res) => {
    try {
        const course = await Course.create(req.body);
        res.json(course);
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

// Get all courses
app.get('/courses' , async (req , res) => {
    try {
        const courses = await Course.findAll();
        res.json(courses);
    }
    catch(error) {
        res.status(500).json({error : error.message})
    }
});

// Update a course
app.put('/courses/:id' , async (req , res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if(!course) {
            res.status(404).json({error : 'Course not found'});
        }
        await course.update(req.body);
        res.json(course);
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

// Delete a course
app.delete('/courses/:id' , async (req , res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if(!course){
            res.status(404).json({error : 'Course not found'});
        }
        await course.destroy();
        res.json({message : "Course removed successfully"});
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

// Enroll a student in course
app.post('/enroll' , async (req , res) => {
    try {
        const {studentId , courseId} = req.body;
        const student = await Student.findByPk(studentId);
        const course = await Course.findByPk(courseId);
        await student.addCourse(course);
        res.json({message : 'Enrolled Successfully'});
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

// Get all course a student is enrolled in
app.get('/students/:id/courses' , async (req , res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        const courses = await student.getCourses();
        res.json();
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
});

// Get all students in a course
app.get('/courses/:id/students' , async (req , res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        const students = await course.getStudents();
        res.json(students);
    }
    catch(error) {
        res.status(500).json({error : error.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});

