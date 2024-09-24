import express from 'express';
import { addToCart, checkout } from '../controllers/cartController';
import { addToCartValidator } from '../validators/cartValidators';
import { validateRequest } from '../middleware/validationMiddleware';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add', authenticateToken, addToCartValidator, validateRequest, addToCart);

router.post('/checkout', authenticateToken, checkout);

export default router;
