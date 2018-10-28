const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Load routes
const users = require('./routes/users');
const projects = require('./routes/projects');
const notes = require('./routes/notes');


// set the view engine to ejs
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')))


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
    const title = 'devlpr npad';
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
