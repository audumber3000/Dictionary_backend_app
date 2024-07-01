const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollmentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollment_date: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    last_accessed: { type: Date }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;