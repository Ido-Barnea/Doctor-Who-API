import express, { Request, Response } from 'express';
import path from 'path';
import { router as apiRouter } from './apiRouter';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to Doctor Who API! Visit /documentation for the documentation and /api for the API.');
});

router.get('/documentation', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, '../../public/documentation/documentation.html'));
});

router.use('/api', apiRouter);
