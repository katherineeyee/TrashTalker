const mongoose = require('mongoose');

const QuizRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  imageId: { type: String, required: true },
  object: { type: String, required: true },
  subCategory: { type: String, required: true },
  mainCategory: { type: String, required: true },
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  rewardGiven: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizRecord', QuizRecordSchema);
