import express, { Request, Response } from 'express';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        'Characters': 'https://doctor-who-api.onrender.com/api/character',
        'Species': 'https://doctor-who-api.onrender.com/api/species',
        'Locations': 'https://doctor-who-api.onrender.com/api/location'
    });
});
