const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
    const pageName = ''
    res.render('login', {
        pageName: pageName
    });
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

    // TODO: uncomment at home
    // newUser.save();

});

router.post('/register', (req, res) => {

});

router.get('/edit', (req, res) => {
    res.send('User edit');

    // TODO: put into edit & delete
    // TODO: uncomment at home
    /*
    User.findOne({
        userName: 'John Doe'
    })
    .then(user => {
        // new values
        user.userName = "Jane Doe";
        user.save()
    });
    */

});

router.post('/edit', (req, res) => {

});

router.get('/logout', (req, res) => {
    res.send('Users logout');
});

module.exports = router;
