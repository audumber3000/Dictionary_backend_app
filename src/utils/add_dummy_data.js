const mongoose = require('mongoose');
const {WordCategory}  = require('../models/wordCategory'); // Replace with the actual path to your model file

mongoose.connect('mongodb+srv://audumber:Ramdas3000@cluster0.bj3vd.mongodb.net/LaundryApplication?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Connection error:', error);
});

db.once('open', async () => {
  // Create more dummy data
  const dummyData = [
    {
      name: 'Vocabulary Builder',
      image: 'https://d3nn873nee648n.cloudfront.net/900x600/20732/300-SM1072581.jpg',
      totalWords: 100,
      likes: 50,
      isPremium: false,
      tags: ['education', 'language'],
      isCompleted: true,
      categoryType: 'Popular',
      wordsList: [
        {
          word: 'Ubiquitous',
          meaning: 'Present, appearing, or found everywhere',
          Image: 'https://example.com/ubiquitous.jpg',
          use_case: 'The technology has become ubiquitous in our daily lives.',
          isKnown: 'yes',
        },
        {
          word: 'Ephemeral',
          meaning: 'Lasting for a very short time',
          Image: 'https://example.com/ephemeral.jpg',
          use_case: 'The beauty of cherry blossoms is ephemeral.',
          isKnown: 'no',
        },
        // Add more words as needed
      ],
    },
    {
      name: 'Medical Terminology',
      image: 'https://d3nn873nee648n.cloudfront.net/900x600/20747/300-SM1072866.jpg',
      totalWords: 50,
      likes: 20,
      isPremium: true,
      tags: ['medicine', 'health'],
      isCompleted: false,
      categoryType: 'Popular',
      wordsList: [
        {
          word: 'Hypertension',
          meaning: 'High blood pressure',
          Image: 'https://example.com/hypertension.jpg',
          use_case: 'Regular exercise can help manage hypertension.',
          isKnown: 'unknown',
        },
        {
          word: 'Anesthesia',
          meaning: 'Loss of sensation, especially to feel pain',
          Image: 'https://example.com/anesthesia.jpg',
          use_case: 'The patient was under general anesthesia during surgery.',
          isKnown: 'yes',
        },
        // Add more words as needed
      ],
    },
  ];
  
  module.exports = dummyData;
  

  try {
    // Insert the dummy data into the database
    await WordCategory.create(dummyData);

    console.log('Dummy data has been inserted into the database.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  } finally { 
    // Close the database connection
    db.close();
  }
});