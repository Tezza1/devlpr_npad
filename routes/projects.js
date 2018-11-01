const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/Project');
const Project = mongoose.model('projects');

// protect routes
const protectRoute = (req, res, next) => {
        if(req.isAuthenticated()){
            return next;
        }
        // TODO: implement flash
        // req.flash('error_msg', 'Not authorized');
        res.redirect('/users/login');
};

// Dashboard route
router.get('/dashboard', (req, res) => {
    const pageName = "Dashboard";
    Project.find({})
        .sort({ date: 'desc' })
        .then(project => {
            res.render('projects/dashboard', {
                pageName: pageName,
                functionBarRoute: '/projects/add',
                functionBarLabel: 'Project',
                projectList: project
    });  
        })
});

router.get('/add', (req, res) => {
    res.render('projects/add', {
        pageName: 'Add a project',
        errors: null,
        title: null,
        details: null
    });
});

router.post('/add', (req, res) => {
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
        })
    }
    else {
        const newProject = {
            title: req.body.title,
            details: req.body.details
        }
        new Project(newProject)
            .save()
            .then(idea => {
                res.redirect('/projects/dashboard')
            })
    }
});

router.get('/edit/:id', (req, res) => {
    const pageName = 'Edit project';
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

router.put('projects/edit/:id', (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
           project.title = req.body.title;
           project.details = req.body.details;
           
           project.save()
            .then(project => {
                res.redirect('/projects/dashboard')
            })
           
        })
});

module.exports = router;