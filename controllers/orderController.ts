import { Request, Response, NextFunction } from 'express';
import { Order, OrderItem, Product } from '../models';
import { JwtPayload } from 'jsonwebtoken';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (typeof req.user === 'string') {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    const userId = (req.user as JwtPayload).id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token' });
    }

    const orders = await Order.findAll({
      where: { UserId: userId },
      include: {
        model: OrderItem,
        include: [Product],
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
