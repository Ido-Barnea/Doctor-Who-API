import express, { Request, Response } from 'express';
import { handleDataRequest } from './../../utils/handleDataRequest';

const species = require('../../../data/species.json');

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    handleDataRequest(req, res, species);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id) - 1;
    if (id < 0 || species.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(species[id]);
});
