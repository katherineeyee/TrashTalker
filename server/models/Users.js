const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String, required: true, unique: true },
    points: {type: Number, required: true},
    dateCreated: { type: Date, default: Date.now },
    dataOfLastLogin: {type: Date, default: Date.now},
    location: {type: String, required: false},
    streak: {type: Number, default: 1}
});

const users = mongoose.model('users', userSchema, 'users');
module.exports = users;