const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
    res.send('Users login');
});

// middleware to login
router.post('/login', (req, res, next) => {

    next();
});

router.get('/register', (req, res) => {
    res.send('Users register')
    // TODO: put into postman & delete
    // Insert test data
    const newUser = new User({
        userName: 'John Doe',
        userEmail: 'def@abc.com',
        userPassword: 'def456',
        githubName: 'doey11',
        githubPassword: 'githubpass2'
    });

    newUser.save();

});

router.post('/register', (req, res) => {

});

router.get('/edit', (req, res) => {
    res.send('User edit');

    // TODO: put into postman & delete
    // -------------------------------------------
    // Use this one
    User.findOne({
        userName: 'John Doe'
    })
    .then(user => {
        // new values
        user.userName = "Jane Doe";
        user.save()
    });

    // potential method
    // User.findOneAndUpdate({userName: 'Joe Doe'}, { $set:{userName: 'Jane Doe'}});
});

router.post('/edit', (req, res) => {

});

router.get('/logout', (req, res) => {
    res.send('Users logout');
});

module.exports = router;