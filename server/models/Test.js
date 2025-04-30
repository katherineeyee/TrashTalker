const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    data: { type: String, required: true },
    message: { type: String, required: true }
});

const test = mongoose.model('test', testSchema, 'test_collection');
module.exports = test;