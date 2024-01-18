const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const competitionSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  image: {
    type: String, // Assuming you store the image URL
    required: true
  },
  text_heading: {
    type: String,
    required: true
  },
  
  views: {
    type: Number,
    default: 0 // Default value for views
  },
  exp_time: {
    type: String,
    required: true
  }
});

// Create the model
const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
