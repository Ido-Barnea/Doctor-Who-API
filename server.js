const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const mainRouter = require('./routes/mainRouter');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRouter);

app.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT}.`);
});
