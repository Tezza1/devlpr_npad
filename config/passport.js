const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load Mongoose Model
//require('../models/User');
const User = mongoose.model('users');

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
            email: email
        })
            .then( (user, password) => {
                if(!user){
                    // null --> for errors and false --> for user
                    return done(null, false);
                }
                if (!password) {
                    return done(null, false);
                }
            })
    }));
};

/*
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
*/