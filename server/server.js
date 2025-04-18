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

// set route handling
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const MongoDbURI = 'mongodb+srv://TrashTalker:055ECBBFF0F0FE62161096C6D4A32EBD@trashtalkercluster.lygarak.mongodb.net/TrashTalkerDB?retryWrites=true&w=majority&appName=TrashTalkerCluster'

const mongoose = require("mongoose");
mongoose.connect(MongoDbURI)
    .then(() => console.log("Connected to TrashTalker MongoDB database"))
    .catch(err => console.log("Error connecting to database", err));


// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));