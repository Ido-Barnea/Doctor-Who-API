const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const api = require('./routes/api')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('/', (req, res) => {
    res.status(200).json('Welcome to Doctor Who API! Visit /documentation for the documentation and /api for the API.');
});

app.get('/documentation', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/documentation/documentation.html'));
});

app.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}.`);
});