import { Request, Response, Router } from 'express';

import { Generator, Evaluator } from '../utils';
import { DBIndicator } from '../db';

const router = Router();

/**
 * GET /
 * get list of indicators
 */
router.get('/', (req: Request, res: Response) => {
  DBIndicator.find({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /last
 * get list of last values
 */
router.get('/last', (req: Request, res: Response) => {
  DBIndicator.aggregate([{
    $sort: { initials: 1, time: -1}
  }, {
    $group: {
      _id: '$short',
      name: {$first: '$name'},
      time: {$first: '$time'},
      high: {$first: '$high'},
      low: {$first: '$low'},
      last: {$first: '$last'},
      change: {$first: '$change'}
    }
  }])
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});
