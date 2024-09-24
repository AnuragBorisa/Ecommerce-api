import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import { syncDatabase } from './models';


dotenv.config();


const app: Application = express();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/cart',  cartRoutes);  
app.use('/api/orders',orderRoutes);  


app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce API is running!');
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});


const PORT = process.env.PORT || 5000;

syncDatabase().then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Error synchronizing the database:', err);
});
