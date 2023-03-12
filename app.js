const express = require('express');
const app = express();
module.exports = app;

const api = require('./routes/api')

app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).json('Welcome to Doctor Who API!');
});