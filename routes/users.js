const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// const bcrypt = require('bcryptjs');
// TODO: remove if not required 

// Load Mongoose Model
require('../models/User');
const User = mongoose.model('users');

router.get('/login', (req, res) => {
    const pageName = ''
    res.render('users/login', {
        pageName: pageName,
        display: 'none',
        success: null,
    });
});

// using passport local strategy to authenticate login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/projects/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    
});

router.get('/register', (req, res) => {
    const pageName = '';
    const errors = null
    res.render('users/register', {
        pageName: pageName,
        errors: null,
        name: null,
        email: null,
        display: 'none'
    })
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
            display: 'inherit',
            errors: errors,
            name: req.body.name,
            email: req.body.email
        })
    }
    else {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    res.redirect('/users/register', {
                        pageName: '',
                        display: 'inherit',
                        errors: 'User with same email already exists'
                    });
                }
                else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    newUser.save()
                        .then(user => {
                            // send a success message to the page
                            res.redirect('/users/login'/*, {
                                pageName: '',
                                display: 'inherit',
                                success: 'User successfully registered'
                            }*/);
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        })
                }
            })
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
