const express = require('express');
const path = require('path');
const apiRouter = require('./apiRouter');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/', (req, res) => {
    res.status(200).json('Welcome to Doctor Who API! Visit /documentation for the documentation and /api for the API.');
});

router.get('/documentation', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../public/documentation/documentation.html'));
});

module.exports = router;
