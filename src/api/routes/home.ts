import { Request, Response, Router } from 'express';

import { Generator, Evaluator } from '../utils';
import { Stock } from '../../shared';
import { DBStock } from '../db/stock';
const pkg = require('../../../package.json');

const router = Router();

/**
 * GET /
 * Basic welcome route
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Skilful API',
    version: pkg['version'],
  });
});

router.post('/random', (req: Request, res: Response) => {
  const length = req.query['length'] || 5;
  DBStock.insertMany(Generator.getStockList(length))
    .then(doc => {
      return DBStock.insertMany(Evaluator.evalList(doc));
    })
    .then(doc => {
      res.json(doc);
    });
});

router.get('/test', (req: Request, res: Response) => {
  const length = req.query['length'] || 20;
  const list = Generator.getStockList(length);
  const list2 = Evaluator.evalList(list);
  res.json({
    length: length,
    turns: 2,
    list: list,
    eval: list2
  });
});

export default router;
