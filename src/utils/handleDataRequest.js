const validateQuery = require('./validateQuery');

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

module.exports = handleDataRequest;
