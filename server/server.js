// server/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5001; //changed port no. from 5000 to 5001

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const MongoDbURI = 'mongodb+srv://TrashTalker:055ECBBFF0F0FE62161096C6D4A32EBD@trashtalkercluster.lygarak.mongodb.net/TrashTalkerDB?retryWrites=true&w=majority&appName=TrashTalkerCluster'

const mongoose = require("mongoose");
mongoose.connect(MongoDbURI)
    .then(() => console.log("Connected to TrashTalker MongoDB database"))
    .catch(err => console.log("Error connecting to database", err));


const User = require("./models/Users");
const Users = require("./models/Users");

// API gets all user objects
// can test in browser by starting app
// and visiting url http://localhost:5001/api/users
// make sure port number is correct for your system
app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error (get)");
  }
});

app.post("/api/users", async (req, res)=> {
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

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));