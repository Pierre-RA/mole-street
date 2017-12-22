import { Router } from 'express';
import HomeRoutes from './home';
import StockRoutes from './stocks';

const router = Router();

router.use('/', HomeRoutes);
router.use('/stocks', StockRoutes);

export default router;
