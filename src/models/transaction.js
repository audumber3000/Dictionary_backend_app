const mongoose = require('mongoose');
const { Schema } = mongoose;

//if require will add more feilds based on phonepe respone.

const transactionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' , default: '12345678Demo_userId' },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course' , default: '123Demo_courseId' },
    amount: { type: Number, required: false },
    transaction_date: { type: Date, default: Date.now },
    payment_method: { type: String, required: false },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;