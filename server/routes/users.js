const express = require('express');
const router = express.Router();
const User = require("../models/Users"); // Schema definition

// API gets all user objects
// can test in browser by starting app
// and visiting url http://localhost:5001/api/users
// make sure port number is correct for your system
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (get)");
  }
});

// http://localhost:5001/api/users/topScore?numUsers=3
// get top users by score
// can get variable number of users by
// changing numUsers value in http req (default is 5)
router.get("/topScore", async (req, res) => {
  const numUsers = parseInt(req.query.numUsers) || 5;
  try {
    const topUsers = await User.find()
        .sort({points: -1})
        .limit(numUsers);

    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (get top users)")
  }
})

// API posts new user to database
router.post("/", async (req, res)=> {
  const {firstName, lastName, email, points, location} = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // if user exists return
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      points: points || 0,
      location,
      dateCreated: new Date()
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (post)");
  }
});

// API to update user score by email
// http://localhost:5001/api/users/<email>
router.put("/:email", async (req, res) => {
  const { email }= req.params;
  const { points } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { points },
        { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("Error: User not found");
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (put)");
  }
});

router.get("/byEmail", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (get user by email)");
  }
});

module.exports = router;