const express = require('express');
const apiRouter = require('./api/index');
const charactersRouter = require('./api/character');
const speciesRouter = require('./api/species');
const locationsRouter = require('./api/location');

const router = express.Router();

router.use('/', apiRouter);
router.use('/character', charactersRouter);
router.use('/species', speciesRouter);
router.use('/location', locationsRouter);

module.exports = router;
