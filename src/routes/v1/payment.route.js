const express = require("express");
const sha256 = require('crypto-js/sha256');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch'); // Import node-fetch
const { saveTransaction } = require('../../services/payment.service')
const {enrollUser} = require('../../services/course.service')
const router = express.Router();


// POST /phonepe/callback
router.post('/callback/:user_id/:course_id', async (req, res) => {
  try {
    

      // Assuming status comes from PhonePe indicating the transaction status
      const status = req.body.status; // Adjust as per PhonePe's actual response structure

      const { user_id ,course_id } = req.params; // Extract user_id from URL params

      // Find the existing transaction in the database based on user_id and course_id
      const existingTransaction = await Transaction.findOne({ user_id, course_id });

      if (!existingTransaction) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
      }

      // Update the existing transaction's status
      existingTransaction.status = status; // Update status based on callback data

      // Save the updated transaction to the database
      await existingTransaction.save();
      //enroll user to new course
      await enrollUser(user_id,course_id)

      // Respond to PhonePe with a success message
      res.status(200).send('Transaction details updated successfully');
  } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(error.status || 500).send(error.message || 'Error processing callback');
  }
});


router.post('/api/phonepe', async (req, res) => {
  const transactionid = 'Tr-' + uuidv4().toString(36).slice(-6);

  const payload = {
    merchantId: 'M22AWJC5OXCHL',
    merchantTransactionId: transactionid,
    merchantUserId: 'USERID', // Make sure this is set correctly
    amount: 1000, // assuming the input amount is in units (like dollars) and needs to be converted to smallest unit (like cents)
    redirectUrl: 'https://www.nextclass.in',
    redirectMode: 'GET',
    callbackUrl: `https://www.nextclass.in/callback?userId=${encodeURIComponent(req.body.user_id)}&transactionId=${encodeURIComponent(transactionid)}`,
    mobileNumber: '7798121777',
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  //this will help us to save transaction with status pending
  await saveTransaction(req.body);

  const dataPayload = JSON.stringify(payload);
  const dataBase64 = Buffer.from(dataPayload).toString('base64');

  const fullURL = dataBase64 + '/pg/v1/pay' + '47af02e6-3017-4b48-8a12-f446081228f4';
  const dataSha256 = sha256(fullURL).toString();

  const checksum = dataSha256 + '###' + '1';

  console.log("X-Verify:", checksum);
  console.log("Base64:", dataBase64);

  const UAT_PAY_API_URL = 'https://api.phonepe.com/apis/hermes/pg/v1/pay';

  try {
    const response = await fetch(UAT_PAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      body: JSON.stringify({ request: dataBase64 }),
    });

    if (!response.ok) {
      console.log("Error", response);
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error forwarding the request');
  }
});

module.exports = router;
