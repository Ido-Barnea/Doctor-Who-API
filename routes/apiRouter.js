const express = require('express');
const apiRouter = require('./api/index');
const charactersRouter = require('./api/characters');
const speciesRouter = require('./api/species');
const locationsRouter = require('./api/locations');

const router = express.Router();

router.use('/', apiRouter);
router.use('/characters', charactersRouter);
router.use('/species', speciesRouter);
router.use('/locations', locationsRouter);

module.exports = router;
