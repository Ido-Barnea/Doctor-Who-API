import express, { Request, Response } from 'express';
import { handleDataRequest } from './../../utils/handleDataRequest';

const locations = require('../../../data/location.json');

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    handleDataRequest(req, res, locations);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id) - 1;
    if (id < 0 || locations.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(locations[id]);
});
