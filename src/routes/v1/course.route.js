const express = require('express');
const router = express.Router();
const {enrollUser} = require('../../services/course.service')


//----------------------------------------Course Enrollment--------------------------------------------
// POST enrollments
router.post('/enrollment', async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const enrollment = await enrollUser(userId, courseId);
        res.status(200).json({ message: 'User enrolled successfully', enrollment });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

//delete enrollemts. //needs changes here as we dont have nenrollmentId
router.delete('/:enrollmentId', async (req, res) => {
    const { enrollmentId } = req.params;
    try {
        // Find and delete the enrollment
        const deletedEnrollment = await Enrollment.findByIdAndDelete(enrollmentId);

        if (!deletedEnrollment) {
            throw new ApiError(404, 'Enrollment not found');
        }

        res.status(200).json({ message: 'Enrollment deleted successfully', deletedEnrollment });
    } catch (error) {
        console.error('Error deleting enrollment:', error);
        res.status(error.status || 500).json({ message: error.message });
    }
});


//---------------------------------------- Normal Course API's -----------------------------------------------------

//create new course

router.post('/add-new-course', async (req, res) => {
    try {
        // Create a new course based on request body
        const newCourse = new Course(req.body);
        await newCourse.save();

        res.status(201).json({ message: 'Course created successfully', newCourse });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
});


//get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
});

//get course based on courseid
router.get('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError(404, 'Course not found');
        }
        res.status(200).json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(error.status || 500).json({ message: error.message });
    }
});

//delete course
router.delete('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    try {
        // Find and delete the course
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            throw new ApiError(404, 'Course not found');
        }

        res.status(200).json({ message: 'Course deleted successfully', deletedCourse });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(error.status || 500).json({ message: error.message });
    }
});

//update course
router.put('/:courseId', async (req, res) => {
    const { courseId } = req.params;
    const updateData = req.body;

    try {
        // Find the course by ID and update it with the new data
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true, runValidators: true });

        if (!updatedCourse) {
            throw new ApiError(404, 'Course not found');
        }

        res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;
