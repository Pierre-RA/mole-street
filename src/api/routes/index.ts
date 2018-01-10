import { Router } from 'express';
import HomeRoutes from './home';
import IndicatorRoutes from './indicator';
import StockRoutes from './stocks';
import UserRoutes from './users';

const router = Router();

router.use('/', HomeRoutes);
router.use('/indicators', IndicatorRoutes);
router.use('/stocks', StockRoutes);
router.use('/users', UserRoutes);

export default router;
