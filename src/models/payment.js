// CRIO_SOLUTION_END_MODULE_AUTH
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require('./User');

const PAYMENT_METHODS = ['credit_card', 'debit_card', 'paypal', 'bank_transfer']; // Define payment methods
const CARD_TYPES = ['Visa', 'MasterCard', 'American Express', 'Discover']; // Define card types

const paymentSchema = mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    payment_method: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true,
      trim: true
    },
    billing_address: {
      type: String,
      required: true,
      trim: true
    },
    card_type: {
      type: String,
      enum: CARD_TYPES,
      default: null
    },
    card_number: {
      type: String,
      unique: true,
      default: null
    },
    card_expiry_month: {
      type: Number,
      default: null
    },
    card_expiry_year: {
      type: Number,
      default: null
    },
    card_cvv: {
      type: Number,
      default: null
    },
    card_holder_name: {
      type: String,
      default: null
    },
    payment_status: {
      type: String,
      required: true,
      trim: true
    },
    transaction_amount: {
      type: Number,
      required: true,
      trim: true
    },
    transaction_date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);



const Payment = mongoose.model("Payment", paymentSchema);

module.exports.Payment = Payment;
module.exports.paymentSchema = paymentSchema;
