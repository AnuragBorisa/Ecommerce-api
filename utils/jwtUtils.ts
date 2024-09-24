import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateToken = (user: any, res: Response) => {
  const payload = {
    id: user.id,
    email: user.email, 
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.status(200).json({
    token,
    userId: user.id,
  });
};
