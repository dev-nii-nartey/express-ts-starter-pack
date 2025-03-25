import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './routes/api.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Awesome it works with TypeScript 🐻' });
});

app.use('/api', apiRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

export default app; 