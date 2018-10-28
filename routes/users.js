const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const passport = require('passport');
const bcrypt = require('bcryptjs');

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
    }
    else {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    // TODO: create screen for this
                    console.log('User with same email already exists');
                    res.redirect('/users/register');
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
                            res.redirect('/users/login');
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        })
                }
            })
    }

        // TODO: delete if don't need to encrypt password
        // encrypt the password using bcrypt
        // # of characters (10)
        // bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //         // if(err) throw err;
        //         newUser.password = hash;
        //         newUser.save()
        //             .then(user => {
        //                 // send a success message to the page
        //                 res.redirect('/users/login');
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //                 return;
        //             })
        //     });
        // });
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
