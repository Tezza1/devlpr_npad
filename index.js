const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

// Load routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const notes = require('./routes/notes');

// Passport config file
require('./config/passport')(passport);

// set the view engine to ejs
app.set('view engine', 'ejs');

// Body parser middleware --> to catch data from a form submission
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Connect to database --> because running old 32 bit version 
mongoose.Promise = global.Promise;
const dbURI = 'mongodb://localhost/devlpr-npad';
mongoose.connect(dbURI,  {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

/*
// if using latest veersion of Mongodb
mongoose.Promise = global.Promise;
const dbURI = 'mongodb://localhost/devlpr-npad';
mongoose.connect(dbURI,  {useMongoClient: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

*/



// Middleware
app.use ((req, res, next) => {
    next();
});

/*
// TODO: set up sessions
// Express session middleware
app.use(session({
    secrect: 'secrect',
    resave: true,
    saveUninitialized: true
}))
*/


// http://www.passportjs.org/docs/configure/
app.use(passport.initialize());
app.use(passport.session());

// app.use(flash());


// About route
app.get('/', (req, res) => {
    const title = 'devlpr_npad';
    const tagline = 'The place for developers to keep their thoughts, ideas and notes on a kanban board linked to their code development';
    const pageName = 'Welcome';
    res.render('index', {
        title: title,
        tagline: tagline,
        pageName: pageName
    });
});

// Use routes
app.use('/users', users);
app.use('/projects', projects);
app.use('/notes', notes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
