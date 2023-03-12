const express = require('express');
const router = express.Router();
module.exports = router;

const characters = require('./../data/characters.json');

router.get('/', (req, res) => {
    const query = req.query;
    let isValid = true;
    const filteredCharacters = characters.filter(character => {
        const validationResponse = validateQuery(character, query);
        if (validationResponse.code) {
            isValid = false;
            res.status(validationResponse.code).json(validationResponse.error);
        }

        return validationResponse.response;
    });

    if (isValid) res.status(200).json(filteredCharacters);
});


class QueryResponse {
    constructor(response, code, error) {
        this.response = response;
        this.code = code;
        this.error = error;
    }
}

function validateQuery(character, query) {
    for (key in query) {
        // Return false and Bad Request error code if key doesn't exist.
        if (!(key in character)) return new QueryResponse(false, 400, "Unknown Filter.");
        // Return false if key values don't match.
        if (character[key] != query[key]) return new QueryResponse(false, null, null);
    }

    return new QueryResponse(true, null, null);
}