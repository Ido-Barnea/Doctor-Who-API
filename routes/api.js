const express = require('express');
const router = express.Router();
module.exports = router;

const characters = require('./../data/characters.json');
const species = require('./../data/species.json');
const planets = require('./../data/planets.json');

router.get('/', (req, res) => {
    res.status(200).json({
        'Characters': 'https://doctorwhoapi.cyclic.app/api/characters',
        'Species': 'https://doctorwhoapi.cyclic.app/api/species',
        'Planets': 'https://doctorwhoapi.cyclic.app/api/planets'
    });
});

router.get('/characters', (req, res) => {
    handleDataRequest(req, res, characters);
});

router.get('/species', (req, res) => {
    handleDataRequest(req, res, species);
});

router.get('/planets', (req, res) => {
    handleDataRequest(req, res, planets);
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
        if (!(key in jsonObject)) return new QueryResponse(false, 400, "Unknown Filter.");
        // Return false if key values don't match.
        if (jsonObject[key] != query[key]) return new QueryResponse(false, null, null);
    }

    return new QueryResponse(true, null, null);
}