const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load Mongoose Model
const User = mongoose.model('users');

module.exports = (passport) => {
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        // check for the user by matching email
        User.findOne({
            email: email
        })
        .then(user =>{
            // if a user is NOT found
            if(!user) {
                // null errors
                // false for the user because they weren't found
                // TODO: to output message see 31 - 2:30
                // TODO: uncomment flass message
                return done(null, false/*, {message: 'User not found'}*/);  
            }
            
            // if a user is found, next we need to check that the password matches
            // password = unecrypted password coming from the form
            // user.password = comes from the user found in the db (and has an encrypted password)
            bcrypt.compare(password, user.password, (err, matchPassword) => {
                if (err) throw err;
                if(matchPassword) {
                    return done(null, user);
                }
                else {
                    // null for error, false for user
                    // TODO: uncomment flass message
                    return done(null, false/*, {message: 'Password incorrect'}*/);
                }
            });
        });
    }));
    
    // http://www.passportjs.org/docs/configure/    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};

