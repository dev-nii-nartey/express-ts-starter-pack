import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Ok api is working with TypeScript 🚀' });
});

export default router; 