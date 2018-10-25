const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/Project');
const Project = mongoose.model('projects');

// Dashboard route
router.get('/dashboard', (req, res) => {
    const pageName = "Dashboard";
    // TODO: delete dummy and get from database
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
    res.render('dashboard', {
        pageName: pageName,
        projectList: projectList
    });
});

router.get('/new', (req, res) => {
    res.send('New project');
});

router.post('/new', (req,res) => {

});

module.exports = router;