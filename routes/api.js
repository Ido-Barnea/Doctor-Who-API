const express = require('express');
const router = express.Router();
module.exports = router;

const characters = require('./../data/characters.json');
const species = require('./../data/species.json');
const locations = require('./../data/locations.json');

router.get('/', (req, res) => {
    res.status(200).json({
        'Characters': 'https://doctorwhoapi.cyclic.app/api/characters',
        'Species': 'https://doctorwhoapi.cyclic.app/api/species',
        'Locations': 'https://doctorwhoapi.cyclic.app/api/locations'
    });
});

router.get('/characters', (req, res) => {
    handleDataRequest(req, res, characters);
});

router.get('/species', (req, res) => {
    handleDataRequest(req, res, species);
});

router.get('/locations', (req, res) => {
    handleDataRequest(req, res, locations);
});



function handleDataRequest(req, res, json) {
    const query = req.query;
    let isValid = true;
    const filteredJSON = json.filter(item => {
        const validationResponse = validateQuery(item, query);
        if (validationResponse.code) {
            isValid = false;
            res.status(validationResponse.code).json(validationResponse.error);
        }

        return validationResponse.response;
    });

    if (isValid) res.status(200).json(filteredJSON);
}



class QueryResponse {
    constructor(response, code, error) {
        this.response = response;
        this.code = code;
        this.error = error;
    }
}

function validateQuery(jsonObject, query) {
    for (key in query) {
        // Return false and Bad Request error code if key doesn't exist.
        if (!(key in jsonObject)) return new QueryResponse(false, 400, 'Unknown Filter.');
        // Return false if key values don't match.
        if (key == 'species') {
            const species = jsonObject['species'].split('?name=')[1];
            if (query[key] != species) return new QueryResponse(false, null, null);
        }
        else if (jsonObject[key] != query[key]) return new QueryResponse(false, null, null);
    }

    return new QueryResponse(true, null, null);
}