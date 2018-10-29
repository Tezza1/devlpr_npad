const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load Mongoose Model
//require('../models/User');
const User = mongoose.model('users');

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({
                email: email,
            },)
            .then( (user) => {
                console.log(user);
                console.log(user.password);
                if(!user){
                    // null --> for errors and false --> for user
                    return done(null, false);
                }
                else if (!password) {
                    return done(null, false);
                }
                else {
                    return done(null, user)
                }
            })
    }));
};

