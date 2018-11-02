const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    details: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        'default': Date.now
    },
});

mongoose.model('projects', projectSchema);