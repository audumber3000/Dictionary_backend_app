
//const Transaction = require('../models/transaction');
const Enrollment = require('../models/enrollment');
const ApiError = require('../utils/ApiError');


async function enrollUser(userId, courseId) {
    try {
        // Check if the transaction exists and is successful
        // const transaction = await Transaction.findById(transactionId);
        // if (!transaction || transaction.status !== 'success') {
        //     throw new ApiError(400, 'Invalid or unsuccessful transaction');
        // }

        // Check if the user is already enrolled in the course
        const existingEnrollment = await Enrollment.findOne({ user_id: userId, course_id: courseId });
        if (existingEnrollment) {
            throw new ApiError(400, 'User is already enrolled in this course');
        }

        // Create a new enrollment record
        const newEnrollment = new Enrollment({
            user_id: userId,
            course_id: courseId,
            enrollment_date: new Date(),
            progress: 0, // Assuming starting progress is 0%
            completed: false,
            last_accessed: null // No access yet
        });

        // Save the enrollment record
        await newEnrollment.save();

        // Optionally, update any additional logic related to course access or user privileges

        return newEnrollment; // Return the created enrollment object if needed
    } catch (error) {
        throw new ApiError(error.status || 500, error.message || 'Error enrolling user');
    }
}

// Export the enrollment service method
module.exports = {
    enrollUser
};
