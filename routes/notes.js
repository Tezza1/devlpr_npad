const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/Note');
const Note = mongoose.model('notes');

router.get('/all/:id', (req, res) => {
    let pageName = "Project notes";
    Note.find({project: req.params.id})
        .sort({ date: 'desc' })
        .then(note => {
            res.render('notes/notes', {
                pageName: pageName,
                functionBarRoute: '/notes/add',
                functionBarLabel: 'Note',
                noteList: note
            })
        });
});

router.get('/add', (req, res) => {
    console.log(req.noteProject);
    res.send('New note');
});

router.post('/add', (req,res) => {

});

module.exports = router;