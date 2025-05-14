const express = require("express");
const router = express.Router();
const QuizRecord = require("../models/QuizRecord");
const User = require("../models/Users"); // make sure this import is added

// POST /api/quiz
router.post("/", async (req, res) => {
  try {
    console.log("📩 Quiz Data:", req.body);

    let { userId, ...rest } = req.body;

    // if userId is an email, resolve it to ObjectId
    if (typeof userId === "string" && userId.includes("@")) {
      const user = await User.findOne({ email: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      userId = user._id;
    }

    const record = new QuizRecord({
      userId,
      ...rest,
      createdAt: new Date(),
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error("❌ Error saving quiz:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
