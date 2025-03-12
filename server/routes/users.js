const express = require('express');
const router = express.Router();

// Sample route: Get all users
router.get('/', (req, res) => {
  res.json({ message: 'List of users' });
});

// Example: Get a specific user
router.get('/:id', (req, res) => {
  res.json({ message: `User with ID ${req.params.id}` });
});

// Add more routes here as needed

module.exports = router;
