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
  const {firstName, lastName, email, googleId, points, location} = req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      googleId,
      points: points || 0,
      location,
      dateCreated: new Date()
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).send("Server Error (post)")
  }
});

// API to update user score
// http://localhost:5001/api/users/<user id>
router.put("/:id", async (req, res) => {
  const {id} = req.params;
  const {points} = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {points},
        {new: true}
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

module.exports = router;
