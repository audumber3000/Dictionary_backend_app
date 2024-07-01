const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    imageSrc: { type: String, required: true, trim: true },
    authorImageSrc: { type: String, trim: true },
    title: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    lessonCount: { type: Number, default: 0 },
    duration: { type: Number, required: true },
    level: { type: String, required: true, trim: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    language: { type: String, required: true, trim: true },
    authorName: { type: String, required: true, trim: true },
    paid: { type: Boolean, default: true },
    category: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    viewStatus: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
