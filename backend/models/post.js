const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});