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
    // TODO: delete dummy and get from database
    // TODO: create add project button next to login
    let projectList = [
        {
            projectName: 'Project1',
            startDate: '22 October 2018',
            endDate: '1 April 2020',
            numNotes: 10
        },
        {
            projectName: 'Project2',
            startDate: '2 October 2018',
            endDate: '12 April 2020',
            numNotes: 7
        },
        {
            projectName: 'Project3',
            startDate: '2 September 2018',
            endDate: '12 January 2020',
            numNotes: 8
        },
        {
            projectName: 'Project4',
            startDate: '12 July 2018',
            endDate: '12 June 2020',
            numNotes: 2
        },
        {
            projectName: 'Project5',
            startDate: '12 April 2018',
            endDate: '2 June 2019',
            numNotes: 6
        },
        {
        projectName: 'Project6',
            startDate: '12 April 2018',
            endDate: '2 June 2019',
            numNotes: 11
        },
        {
            projectName: 'Project7',
            startDate: '12 April 2018',
            endDate: '2 June 2019',
            numNotes: 9
        },
        {
            projectName: 'Project8',
            startDate: '12 April 2018',
            endDate: '2 June 2019',
            numNotes: 3
        },
        {
            projectName: 'Project9',
            startDate: '12 April 2018',
            endDate: '2 June 2019',
            numNotes: 12
        },
        {
            projectName: 'Project10',
            startDate: '12 April 2018',
            endDate: '2 June 2019',
            numNotes: 4
        }
    ];
    res.render('projects/dashboard', {
        pageName: pageName,
        functionBarRoute: '/projects/add',
        functionBarLabel: 'Project',
        projectList: projectList
    });
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
        res.send("Added a project")
    }
});

module.exports = router;