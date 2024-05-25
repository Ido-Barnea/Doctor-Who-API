import express, { Request, Response } from 'express';
import { handleDataRequest } from './../../utils/handleDataRequest';

const characters = require('../../../data/character.json');

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    handleDataRequest(req, res, characters);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id) - 1;
    if (id < 0 || characters.length <= id) res.status(400).json("Unknown Filter.");
    else res.status(200).json(characters[id]);
});
