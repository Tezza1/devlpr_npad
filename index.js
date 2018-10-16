const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Load routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const notes = require('./routes/notes');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/devlpr-npad', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Middleware
app.use ((req, res, next) => {
    next();
});

// About route
app.get('/', (req, res) => {
    res.send('About');
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

// Use routes
app.use('/users', users);
app.use('/projects', projects);
app.use('/notes', notes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})