import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.route';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', apiRoutes);

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

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

export default app; 