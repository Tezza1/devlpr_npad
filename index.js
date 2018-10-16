const express = require('express');

const app = express();

// Load routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const notes = require('./routes/notes');


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