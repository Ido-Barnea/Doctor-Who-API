const express = require('express');
const app = express();

const SUCCESS_STATUS_CODE = 200;
const NOT_FOUND_STATUS_CODE = 404;

const actors = require('./data/actors.json');
const showrunners = require('./data/showrunners.json');
const doctors = require('./data/doctors.json');
const companions = require('./data/companions.json');
const allies = require('./data/allies.json');
const villains = require('./data/villains.json');

function retrieveItemFromJSON(id, json) {
    // Check if id is within array length.
    if (0 <= id && id < json.length) {
        // If so, return an array with two values:
        // (1) HTTP Response Status Code.
        // (2) The desired JSON.
        return [SUCCESS_STATUS_CODE, json[id]];
    } else {
        // If not, return an array with two values:
        // (1) HTTP Response Status Code.
        // (2) An error message.
        return [NOT_FOUND_STATUS_CODE, "Error: Invalid id."];
    }
}

app.get('/', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json('Doctor Who API')
});



app.get('/actors', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json(actors);
});

app.get('/actors/:id', (req, res) => {
    let values = retrieveItemFromJSON(req.params.id - 1, actors);
    res.status(values[0]).json(values[1]);
});



app.get('/showrunners', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json(showrunners);
});

app.get('/showrunners/:id', (req, res) => {
    let values = retrieveItemFromJSON(req.params.id - 1, showrunners);
    res.status(values[0]).json(values[1]);
});



app.get('/doctors', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json(doctors);
});

app.get('/doctors/:id', (req, res) => {
    let values = retrieveItemFromJSON(req.params.id - 1, doctors);
    res.status(values[0]).json(values[1]);
});



app.get('/companions', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json(companions);
});

app.get('/companions/:id', (req, res) => {
    let values = retrieveItemFromJSON(req.params.id - 1, companions);
    res.status(values[0]).json(values[1]);
});



app.get('/allies', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json(allies);
});

app.get('/allies/:id', (req, res) => {
    let values = retrieveItemFromJSON(req.params.id - 1, allies);
    res.status(values[0]).json(values[1]);
});



app.get('/villains', (req, res) => {
    res.status(SUCCESS_STATUS_CODE).json(villains);
});

app.get('/villains/:id', (req, res) => {
    let values = retrieveItemFromJSON(req.params.id - 1, villains);
    res.status(values[0]).json(values[1]);
});

module.exports = app;