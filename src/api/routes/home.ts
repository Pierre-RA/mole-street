import { Request, Response, Router } from 'express';

import { Generator, Evaluator } from '../utils';
import { DailyQuote, DailyIndicator } from '../../shared';
import { DBIndicator, DBStock } from '../db';
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

/**
 * POST /random
 * Add random stocks to the list
 */
router.post('/random', (req: Request, res: Response) => {
  const length = req.query['length'] || 50;
  DBIndicator.insertMany(Generator.getBasicIndicators())
    .catch(err => {
      return true;
    })
    .then(doc => {
      return DBStock.find().distinct('initials');
    })
    .then(doc => {
      return DBStock.insertMany(Generator.getStockList(length, doc));
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// TODO: remove this route
// router.post('/update/:id', (req: Request, res: Response) => {
//   DBStock.findOne({ _id: req.params.id })
//     .then(doc => {
//       const tmp = new DBStock(Evaluator.evalStock(doc, new Date().getTime()));
//       return tmp.save();
//     })
//     .then(doc => {
//       res.json(doc);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

export default router;
