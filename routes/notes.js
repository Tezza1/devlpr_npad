const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.send('New note');
});

router.post('/new', (req,res) => {

});

module.exports = router;