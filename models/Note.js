const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        enum: ['Not Started', 'WIP', 'Under Review', 'Completed'],
        required: true
    },
    date: {
        type: Date,
        'default': Date.now
    }
});

mongoose.model('notes', noteSchema);