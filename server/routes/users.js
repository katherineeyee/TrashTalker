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

// API gets user by email
router.get("/:email/UserByEmail", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
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
      return res.status(200).json({ message: 'User already exists with this email.' });
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
//  http://localhost:5001/api/users/rileyshort1%40gmail.com/points?numPoints=x
router.put("/:email/points", async (req, res) => {
  const { email }= req.params;
  // define # of pts to increment by
  const ptsIncrement = parseInt(req.query.numPoints) || 1;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Error: User not found");
    }

    const updatedPoints = user.points + ptsIncrement;
    await User.updateOne({email}, {$set: {points: updatedPoints}});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (put)");
  }
});

// API to increment user streak by 1 using email
//  http://localhost:5001/api/users/rileyshort1%40gmail.com/streak
router.put("/:email/streak", async (req, res) => {
  const { email }= req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Error: User not found");
    }
    const updatedStreak = user.streak + 1;
    await User.updateOne({email}, {$set: {streak: updatedStreak}});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (put)");
  }
});

// API to reset user streaks to 1 by email
//  http://localhost:5001/api/users/rileyshort1%40gmail.com/resetStreak
router.put("/:email/resetStreak", async (req, res) => {
  const { email }= req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Error: User not found");
    }

    await User.updateOne({email}, {$set: {streak: 1}});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (put)");
  }
});

// API to update lastLoginDate by email
//  http://localhost:5001/api/users/rileyshort1%40gmail.com/date
router.put("/:email/date", async (req, res) => {
  const { email }= req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Error: User not found");
    }

    await User.updateOne({email}, {$set: {dateOfLastLogin: Date.now()}});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (put)");
  }
});

// API to update user location by email
//  http://localhost:5001/api/users/rileyshort1%40gmail.com/location
router.put("/:email/location", async (req, res) => {
  const { email }= req.params;
  const { location } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
        { email },
        { location },
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

// API to update user rewards (streak and points for logging in)
//  http://localhost:5001/api/users/rileyshort1%40gmail.com/updateRewards
router.put("/:email/updateRewards", async (req, res) => {
  const { email }= req.params;
  // points given for logging in (limit x per day)
  const pointIncrement = 5;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Error: User not found");
    }
    // get user data
    const response = await fetch(`http://localhost:5001/api/users/${email}/UserByEmail`);
    const userData = await response.json();

    // get time values
    const now = new Date(); // Local time
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())); // UTC today at midnight
    const lastLogin = new Date(userData.dateOfLastLogin); // Assuming this is already in UTC

    const todayDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const lastLoginDate = new Date(Date.UTC(lastLogin.getUTCFullYear(), lastLogin.getUTCMonth(), lastLogin.getUTCDate()));

    const diffInMs = todayDate - lastLoginDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // update date of last login
    await fetch(`http://localhost:5001/api/users/${email}/date`,{
      method: "PUT"
    });

    if (Math.round(diffInDays) === 1) { // streak increment and point increment
      // call api to increment streak by 1 and increment points
      await fetch(`http://localhost:5001/api/users/${email}/streak`, {
        method: "PUT"
      });
      await fetch(`http://localhost:5001/api/users/${email}/points?numPoints=` + pointIncrement, {
        method: "PUT"
      });

    } else if (Math.round(diffInDays) > 1) {
      // increment points
      await fetch(`http://localhost:5001/api/users/${email}/points?numPoints=` + pointIncrement, {
        method: "PUT"
      });
      // reset streaks to 1
      await fetch(`http://localhost:5001/api/users/${email}/resetStreak`,{
        method: "PUT"
      });
    }

    res.json(response);
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