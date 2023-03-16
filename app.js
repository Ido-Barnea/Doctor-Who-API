const express = require('express');
const app = express();
module.exports = app;

const api = require('./routes/api')

app.use(express.static(__dirname + '/public'));
app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).json('Welcome to Doctor Who API! Visit https://doctorwhoapi.cyclic.app/documentation for the documentation and https://doctorwhoapi.cyclic.app/api for the API.');
});

app.get('/documentation', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/documentation/documentation.html');
});