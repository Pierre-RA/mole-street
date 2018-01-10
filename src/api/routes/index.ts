import { Router } from 'express';
import HomeRoutes from './home';
import QuoteRoutes from './quotes';
import UserRoutes from './users';

const router = Router();

router.use('/', HomeRoutes);
router.use('/quotes', QuoteRoutes);
router.use('/users', UserRoutes);

export default router;
