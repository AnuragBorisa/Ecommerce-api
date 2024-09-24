import { body } from 'express-validator';

export const addToCartValidator = [
  body('productId').isInt({ gt: 0 }).withMessage('Product ID must be a positive integer'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
];
