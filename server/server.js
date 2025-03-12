// server/server.js
const express = require('express');
//const mongoose = require('mongoose'); //temp commented out bc we havent set up mongodb yet
const cors = require('cors');
const morgan = require('morgan');
//require('dotenv').config(); //temp commented out bc we havent set up mongodb yet

const app = express();
const PORT = process.env.PORT || 5001; //changed port no. from 5000 to 5001

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to MongoDB
//temp commented out bc we havent set up mongodb yet
//mongoose.connect(process.env.MONGODB_URI)
//  .then(() => console.log('MongoDB connected...'))
//  .catch(err => console.log(err));

// Routes (to be added)
app.use('/api/users', require('./routes/users'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));