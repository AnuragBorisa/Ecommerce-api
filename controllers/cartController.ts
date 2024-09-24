import { Request, Response, NextFunction } from 'express';
import { Cart, CartItem, Product, Order, OrderItem } from '../models';
import { sequelize } from '../models';
import { JwtPayload } from 'jsonwebtoken';

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;

  try {
    if (typeof req.user === 'string') {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    const userId = (req.user as JwtPayload).id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token' });
    }

    const cart = await Cart.findOne({ where: { UserId: userId } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cartItem = await CartItem.findOne({ where: { CartId: cart.id, ProductId: productId } });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await CartItem.create({ CartId: cart.id, ProductId: productId, quantity });
    }

    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    next(error);
  }
};

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
    const t = await sequelize.transaction();
  
    try {
     
      if (typeof req.user === 'string') {
        return res.status(400).json({ message: 'Invalid token payload' });
      }
  
      const userId = (req.user as JwtPayload).id;
      if (!userId) {
        return res.status(400).json({ message: 'User ID not found in token' });
      }
  
      const cart = await Cart.findOne({ where: { UserId: userId } });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
    
      const cartItems = await CartItem.findAll({
        where: { CartId: cart.id },
        include: [{ model: Product }], 
      });
  
      if (cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  
      let totalAmount = 0;
  
    
      for (let item of cartItems) {
        if (item.Product && item.Product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.Product.name}`);
        }
        totalAmount += item.quantity * (item.Product ? item.Product.price : 0);
  
      
        if (item.Product) {
          item.Product.stock -= item.quantity;
          await item.Product.save({ transaction: t });
        }
      }
  
     
      const order = await Order.create(
        { UserId: userId, totalAmount, orderDate: new Date() },
        { transaction: t }
      );
  
   
      for (let item of cartItems) {
        if (item.Product) {
          await OrderItem.create(
            {
              OrderId: order.id,
              ProductId: item.ProductId,
              quantity: item.quantity,
              price: item.Product.price,
            },
            { transaction: t }
          );
        }
      }  
      await CartItem.destroy({ where: { CartId: cart.id }, transaction: t });
      await t.commit();
      res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  };
