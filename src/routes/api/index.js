const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        'Characters': 'https://doctor-who-api.onrender.com/api/character',
        'Species': 'https://doctor-who-api.onrender.com/api/species',
        'Locations': 'https://doctor-who-api.onrender.com/api/location'
    });
});

module.exports = router;
