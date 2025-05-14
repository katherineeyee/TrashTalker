const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateOfLastLogin: { type: Date, default: Date.now },
  location: { type: String, required: false },
  streak: { type: Number, default: 1 },
  badges: { type: [String], default: [] }, //badges to db
});

const users = mongoose.model("users", userSchema, "users");
module.exports = users;
