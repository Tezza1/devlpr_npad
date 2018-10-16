const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.send('New project');
});

router.post('/new', (req,res) => {

});

module.exports = router;