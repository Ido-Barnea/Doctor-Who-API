const express = require('express');
const router = express.Router();
const characters = require('../../data/characters.json');
const handleDataRequest = require('../../utils/handleDataRequest');

router.get('/', (req, res) => {
    handleDataRequest(req, res, characters);
});

router.get('/:id', (req, res) => {
    const id = req.params.id - 1;
    if (id < 0 || characters.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(characters[id]);
});

module.exports = router;
