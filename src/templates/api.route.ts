import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Ok api is working 🚀' });
});

export default router; 