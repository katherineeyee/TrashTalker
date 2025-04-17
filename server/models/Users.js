const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String, required: true },
    googleId: {type: String, required: true },
    points: {type: Number, required: true},
    dateCreated: { type: Date, default: Date.now },
    location: {type: String, required: false}
});

const users = mongoose.model('users', userSchema, 'users');
module.exports = users;