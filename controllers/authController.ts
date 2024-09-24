import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User, Cart } from '../models';
import { generateToken } from '../utils/jwtUtils';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
  
      await Cart.create({ UserId: user.id });
  
      generateToken(user, res);
    } catch (error) {
      next(error);
    }
  };

  export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      generateToken(user, res);
    } catch (error) {
      next(error);
    }
  };

  export const logout = (req: Request, res: Response) => {
    res.json({ message: 'Logged out successfully' });
  };