const httpStatus = require("http-status");
const config = require("../config/config");
const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const axios = require('axios').default;
const Transaction = require("../../src/models/transaction")



const saveTransaction = async (transactionDetails) => {
    try {
        console.log(transactionDetails)
        // Create a new Transaction object using your model
        const newTransaction = new Transaction({
            user_id: transactionDetails.user_id,
            course_id: transactionDetails.course_id,
            amount: transactionDetails.amount,
            transaction_date: new Date(),
            payment_method: transactionDetails.payment_method,
            status: 'pending' // Assuming status defaults to 'pending'
        });

        // Save the transaction to the database
        await newTransaction.save();

        // Optionally, you can return the saved transaction object or a success message
        return newTransaction; // Return the saved transaction object
    } catch (error) {
        console.error('Error saving transaction:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error saving transaction');
    }
};


module.exports = {
    saveTransaction
  };
  