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
    // TODO: move this to post
    // Insert test data
    const jim = new User({
        userName: 'John Doe',
        userEmail: 'def@abc.com',
        userPassword: 'def456',
        githubName: 'doey11',
        githubPassword: 'githubpass2'
    });

    jim.save();

});

router.post('/register', (req, res) => {

});

router.get('/edit', (req, res) => {
    res.send('User edit');

    // // move to post
    // User.find({
    //     UserName: 'John Doe'
    // })
    // .then(user => {
    //     // new values
    //     user.userName = "Jane Doe";
    //     user.save()
    // });
    User.findOneAndUpdate({userName: 'Joe Doe'}, {userName: 'Jane Doe'});
    // User.findOneAndUpdate({userName: 'Joe Doe'}, { $set:{userName: 'Jane Doe'}});
});

router.post('/edit', (req, res) => {

});

router.get('/logout', (req, res) => {
    res.send('Users logout');
});

module.exports = router;