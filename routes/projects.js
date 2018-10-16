const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/Project');
const Project = mongoose.model('projects');

router.get('/new', (req, res) => {
    res.send('New project');
});

router.post('/new', (req,res) => {

});

module.exports = router;