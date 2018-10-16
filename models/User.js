const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
        unique: true
    }
    githubName: {
        type: String,
        unique: true
    },
    githubPassword: {
        type: String,
        unique: true
    },
    missionGoal: String,  // need max length?
    createdOn: {
        type: Date,
        'default': Date.now
    },
    userModifiedOn: {
        type: Date,
        'default': Date.now
    },
    userActiveStatus: {
        type: Boolean,
        default: true
    }
});

mongoose.model('users', userSchema);