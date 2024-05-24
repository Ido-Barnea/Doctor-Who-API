const express = require('express');
const router = express.Router();
const species = require('../../../data/species.json');
const handleDataRequest = require('../../utils/handleDataRequest');

router.get('/', (req, res) => {
    handleDataRequest(req, res, species);
});

router.get('/:id', (req, res) => {
    const id = req.params.id - 1;
    if (id < 0 || species.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(species[id]);
});

module.exports = router;
