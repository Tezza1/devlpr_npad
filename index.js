const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Load routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const notes = require('./routes/notes');

// set the view engine to ejs
app.set('view engine', 'ejs');

// Connect to database
mongoose.Promise = global.Promise;
const dbURI = 'mongodb://localhost/devlpr-npad';
mongoose.connect(dbURI,  {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
// TODO: undo this when working from home

// Middleware
app.use ((req, res, next) => {
    next();
});

// About route
app.get('/', (req, res) => {
    const title = 'Welcome'
    res.render('index', {
        title: title
    });
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Use routes
app.use('/users', users);
app.use('/projects', projects);
app.use('/notes', notes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})