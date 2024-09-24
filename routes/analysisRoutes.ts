import { Router } from 'express';
import { getUserProductOrders, getWeeklyOrders, getTopProducts } from '../controllers/analysisController';

const router = Router();

router.get('/user-product-orders', getUserProductOrders);
router.get('/weekly-orders', getWeeklyOrders);
router.get('/top-products', getTopProducts);

export default router;
