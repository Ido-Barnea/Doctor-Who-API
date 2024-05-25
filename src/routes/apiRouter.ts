import express from 'express';
import { router as apiRouter } from './api/index';
import { router as charactersRouter } from './api/character';
import { router as speciesRouter } from './api/species';
import { router as locationsRouter } from './api/location';

export const router = express.Router();

router.use('/', apiRouter);
router.use('/character', charactersRouter);
router.use('/species', speciesRouter);
router.use('/location', locationsRouter);
