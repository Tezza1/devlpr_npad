const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {protectRoute} = require('../helpers/auth');

// Load Mongoose Model
require('../models/Note');
const Note = mongoose.model('notes');

// Load Mongoose Model
require('../models/Project');
const Project = mongoose.model('projects');

router.get('/all/:id', protectRoute, (req, res) => {
    let pageName = " - Project notes";
    let projectName = "";
    Project.findOne({_id: req.params.id })
        .then(project => {
            projectName = project.title;
        });
    Note.find({project: req.params.id})
        .sort({ date: 'desc' })
        .then(note => {
            res.render('notes/notes', {
                pageName: pageName,
                functionBarRoute: `/notes/add/${req.params.id}`,
                functionBarLabel: 'Note',
                projectName: projectName,
                noteList: note
            })
        });
});

router.get('/add/:id', protectRoute, (req, res) => {
    res.render('notes/add', {
        pageName: ' - Add a Note',
        errors: null,
        title: null,
        details: null,
        project: req.params.id
    });
});

router.post('/add/:id', protectRoute, (req,res) => {
    const newNote = {
            title: req.body.title,
            details: req.body.details,
            project: req.params.id,
            phase: req.body.phase
        };
        new Note(newNote)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Note added');
                res.redirect(`/notes/all/${req.params.id}`);
            });
});

router.get('/edit/:id', protectRoute, (req, res) => {
    const pageName = ' - Edit project';
    Note.findOne({
        _id: req.params.id
    })
        .then(note => {
            res.render('notes/edit', {
                pageName: pageName,
                errors: null,
                note: note
            });
        });
});

router.put('/edit/:id', protectRoute, (req, res) => {
    Note.findOne({ _id: req.params.id })
        .then(note => {
           note.title = req.body.title;
           note.details = req.body.details;

           note.save()
            .then(note => {
                req.flash('success_msg', 'Note updated');
                res.redirect(`/notes/all/${note.project}`);
            });

        });
});


router.delete('/edit/:id', protectRoute, (req, res) => {
    Note.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Note deleted');
            res.redirect(`/notes/all/${req.body.project}`);
        });
});

module.exports = router;