const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Users login');
});

// middleware to login
router.post('/login', (req, res, next) => {

    next();
});

router.get('/register', (req, res) => {
    res.send('Users register')
});

router.post('/register', (req, res) => {

});

router.get('/edit', (req, res) => {
    res.send('User edit');
});

router.post('/edit', (req, res) => {

});

router.get('/logout', (req, res) => {
    res.send('Users logout');
});

module.exports = router;