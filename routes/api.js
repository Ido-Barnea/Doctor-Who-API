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

router.get('/characters/:id', (req, res) => {
    const id = req.params.id - 1;
    if (id < 0 || characters.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(characters[id]);
});

router.get('/species', (req, res) => {
    handleDataRequest(req, res, species);
});

router.get('/species/:id', (req, res) => {
    const id = req.params.id - 1;
    if (id < 0 || species.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(species[req.params.id]);
});

router.get('/locations', (req, res) => {
    handleDataRequest(req, res, locations);
});

router.get('/locations/:id', (req, res) => {
    const id = req.params.id - 1;
    if (id < 0 || locations.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(locations[req.params.id]);
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

function validateQuery(jsonDict, query) {
    const availableFilteringKeys = ['name', 'status', 'species', 'gender', 'placeOfOrigin', 'jobs', 'relationsWithTheDoctor'];
    const dictionaryFieldsKeys = ['species', 'placeOfOrigin'];

    for (key in query) {
        if (key in jsonDict && availableFilteringKeys.includes(key)) {
            let jsonValue = jsonDict[key];
            // If key value is a dictionary.
            if (dictionaryFieldsKeys.includes(key)) jsonValue = jsonValue['name'];
            // If json value doesn't match query value
            if (jsonValue.toLowerCase() != query[key].toLowerCase()) return new QueryResponse(false, null, null);
        } else {
            // Return false and Bad Request error code if key doesn't exist.
            return new QueryResponse(false, 400, 'Unknown Filter.');
        }
    }

    // Found a match.
    return new QueryResponse(true, null, null);
}