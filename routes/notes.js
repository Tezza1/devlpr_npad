const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/Note');
const Note = mongoose.model('notes');


router.get('/new', (req, res) => {
    res.send('New note');
});

router.post('/new', (req,res) => {

});

module.exports = router;