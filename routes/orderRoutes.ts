import express from 'express';
import { getOrders } from '../controllers/orderController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getOrders);

export default router;
