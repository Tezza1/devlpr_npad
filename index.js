const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// Middleware
app.use ((req, res, next) => {
    next();
});

// Welcome screen route
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


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})