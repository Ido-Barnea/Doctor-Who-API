const express = require('express');
const router = express.Router();
module.exports = router;

const characters = require('./characters');

router.use('/characters', characters);

router.get('/', (req, res) => {
    res.status(200).json({
        'Characters': 'https://doctorwhoapi.cyclic.app/api/characters'
    });
});