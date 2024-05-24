const express = require('express');
const router = express.Router();
const locations = require('../../data/locations.json');
const handleDataRequest = require('../../utils/handleDataRequest');

router.get('/', (req, res) => {
    handleDataRequest(req, res, locations);
});

router.get('/:id', (req, res) => {
    const id = req.params.id - 1;
    if (id < 0 || locations.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(locations[id]);
});

module.exports = router;
