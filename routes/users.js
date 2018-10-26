const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load Mongoose Model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
    const pageName = ''
    res.render('users/login', {
        pageName: pageName
    });
});

// middleware to login
router.post('/login', (req, res, next) => {

    next();
});

router.get('/register', (req, res) => {
    const pageName = '';
    const errors = null
    res.render('users/register', {
        pageName: pageName,
        errors: null,
        name: null,
        email: null
    })
    // TODO: put into postman & delete
    // Insert test data
    // const newUser = new User({
    //     userName: 'John Doe',
    //     userEmail: 'def@abc.com',
    //     userPassword: 'def456',
    //     githubName: 'doey11',
    //     githubPassword: 'githubpass2'
    // });

    // TODO: uncomment at home
    // newUser.save();

});

router.post('/register', (req, res) => {

    let errors = [];

    if (req.body.password != req.body.password2){
        errors.push({
            text: "Passwords don't match"
        });
    }

    if (req.body.password.length < 6) {
        errors.push({
            text: "Minimum 6 characters required"
        });
    }

    if (errors.length) {
        const pageName = "";
        res.render('users/register', {
            pageName: pageName,
            errors: errors,
            name: req.body.name,
            email: req.body.email
        })
    } else {
        res.send('passed')
    }
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
