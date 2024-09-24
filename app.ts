import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { sequelize, syncDatabase } from './models';

dotenv.config();

const app = express();


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce API is running');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await syncDatabase();

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:8000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
