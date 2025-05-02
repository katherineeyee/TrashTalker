const express = require('express');
const router = express.Router();
const QuizRecord = require('../models/QuizRecord');

// POST /api/quiz
router.post('/', async (req, res) => {
  try {
    console.log("📩 Quiz Data:", req.body);
    const record = new QuizRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error("❌ Error saving quiz:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
