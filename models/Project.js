const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    projectCreatedOn: {
        type: Date,
        'default': Date.now
    },
    projectModifiedOn: {
        type: Date,
        default: Date.now
    },
    projectCreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // projectNotes: [noteSchema],
    projectActiveStatus: {
        type: Boolean,
        default: true
    }
});

// TODO: create noteSchema
// TODO: at timeline & milestones

mongoose.model('projects', projectSchema);