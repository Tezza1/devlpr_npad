const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {protectRoute} = require('../helpers/auth');

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

    // if the array has anything in it then re-render the form
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
        // check if the email address has already been used
        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    req.flash('error_msg', 'Unique email required')
                    res.redirect('/users/register');
                }
                else {
                        const newUser = new User ({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        });
                        // https://www.npmjs.com/package/bcryptjs
                        // encrypt the password and use 10 characters
                        bcrypt.genSalt(10, (err, salt) => {
                            // (err, hash) --> hash is the hashed password
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'Successful registration');
                                        res.redirect('/users/login');
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                            });
                        });
                }
            })
            .catch(err => {
                req.flash('error_msg', 'Error registering')
                res.redirect('/users/register')
            });
    }

});

router.get('/edit', protectRoute, (req, res) => {
    res.send('User edit');
    // req.user.id
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

router.post('/edit', protectRoute, (req, res) => {
    res.send('Users edit')
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logged out')
    res.redirect('/users/login');
});

module.exports = router;
