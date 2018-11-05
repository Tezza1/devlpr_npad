const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {protectRoute} = require('../helpers/auth');

// Load Mongoose Model
require('../models/Project');
const Project = mongoose.model('projects');

// Dashboard route
router.get('/dashboard', protectRoute, (req, res) => {
    const pageName = " - Dashboard";
    Project.find({user: req.user.id})
        .sort({ date: 'desc' })
        .then(project => {
            res.render('projects/dashboard', {
                pageName: pageName,
                userName: req.user.name,
                functionBarRoute: '/projects/add',
                functionBarLabel: 'Project',
                projectList: project
    });
        });
});

router.get('/add', protectRoute, (req, res) => {
    res.render('projects/add', {
        pageName: ' - Add a project',
        errors: null,
        title: null,
        details: null
    });
});

router.post('/add', protectRoute, (req, res) => {
    let errors = [];

    if(!req.body.title){
        errors.push({text: 'Title required'});
    }

    if (req.body.title.length < 2) {
        errors.push({
            text: "Minimum 2 characters required for Title"
        });
    }

    if(!req.body.details) {
        errors.push({text: 'Details required'});
    }

    if (req.body.details.length < 10) {
        errors.push({
            text: "Minimum 10 characters required for Details"
        });
    }

    if(errors.length){
        const pageName = "";
        res.render('projects/add', {
            pageName: 'Add a project',
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    }
    else {
        const newProject = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        };
        new Project(newProject)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Project added');
                res.redirect('/projects/dashboard');
            });
    }
});

router.get('/edit/:id', protectRoute, (req, res) => {
    const pageName = ' - Edit project';
    Project.findOne({
        _id: req.params.id
    })
        .then(project => {
            res.render('projects/edit', {
                pageName: pageName,
                errors: null,
                project: project
            });
        });
});

router.put('/edit/:id', protectRoute, (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
           project.title = req.body.title;
           project.details = req.body.details;

           project.save()
            .then(project => {
                req.flash('success_msg', 'Project updated');
                res.redirect('/projects/dashboard');
            });

        });
});

router.delete('/edit/:id', protectRoute, (req, res) => {
    Project.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Project deleted');
            res.redirect('/projects/dashboard');
        });
});

module.exports = router;