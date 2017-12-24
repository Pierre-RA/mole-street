import { Request, Response, Router } from 'express';

import { Generator, Evaluator } from '../utils';
import { DBStock } from '../db';

const router = Router();

/**
 * GET /
 * get list of stocks
 */
router.get('/', (req: Request, res: Response) => {
  DBStock.find({})
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
  DBStock.aggregate([{
    $sort: { initials: 1, time: -1}
  }, {
    $group: {
      _id: '$initials',
      name: {$first: '$name'},
      initials: {$first: '$initials'},
      time: {$first: '$time'},
      volume: {$first: '$volume'},
      high: {$first: '$high'},
      low: {$first: '$low'},
      open: {$first: '$open'},
      close: {$first: '$close'},
      last: {$first: '$last'},
      prev: {$first: '$prev'},
      change: {$first: '$change'},
    }
  }])
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/last/:initials', (req: Request, res: Response) => {
  DBStock.find({ initials: req.params.initials }).sort({ time: -1 }).limit(1)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /:id
 * get one stock
 */
router.get('/:id', (req: Request, res: Response) => {
  DBStock.findOne({ _id: req.params.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
