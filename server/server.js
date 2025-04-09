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


// Routes
const Test = require("./models/Test");

app.get("/api/tests", async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));