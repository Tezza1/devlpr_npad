const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
        // unique: true
    },
    date: {
        type: Date,
        'default': Date.now
    },
    userActiveStatus: {
        type: Boolean,
        default: true
    }
});

mongoose.model('users', userSchema);