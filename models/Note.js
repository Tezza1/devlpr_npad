const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let noteSchema = new mongoose.Schema({
    noteName: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true,
        default: ' '
    },
    noteCreatedOn: {
        type: Date,
        'default': Date.now
    },
    notePipeline: {
        type: String,
        enum: ['Not Started', 'WIP', 'Under Review', 'Completed'],
        required: true
    },
    noteActiveStatus: {
        type: Boolean,
        default: true
    }
});

mongoose.model('notes', noteSchema);