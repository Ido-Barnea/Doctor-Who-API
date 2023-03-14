const express = require('express');
const app = express();
module.exports = app;

const api = require('./routes/api')

app.use('/api', api);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
    //res.status(200).json('Welcome to Doctor Who API!');
});