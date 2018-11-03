const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Load routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const notes = require('./routes/notes');

// Passport config file
require('./config/passport')(passport);

// set the view engine to ejs
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware --> to catch data from a form submission
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// https://github.com/expressjs/method-override
// override using a query value
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

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

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// http://www.passportjs.org/docs/configure/
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// About route
app.get('/', (req, res) => {
    const title = 'devlpr_npad';
    const tagline = 'The place for developers to keep their thoughts, ideas and notes on a kanban style board';
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
