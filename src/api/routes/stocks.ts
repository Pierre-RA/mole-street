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
      type: {$first: '$type'},
      initials: {$first: '$initials'},
      time: {$first: '$time'},
      volume: {$first: '$volume'},
      high: {$first: '$high'},
      low: {$first: '$low'},
      open: {$first: '$open'},
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

/**
 * GET /last/:initials
 * get latest stock value
 */
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
 * GET /stock/:id
 * get stock at a time from id
 */
router.get('/stock/:id', (req: Request, res: Response) => {
  DBStock.findOne({ _id: req.params.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /sectors
 * get list of sectors
 */
router.get('/sectors', (req: Request, res: Response) => {
  DBStock.find().distinct('type')
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /:initials
 * get list of values for stock :initials
 */
router.get('/:initials', (req: Request, res: Response) => {
  DBStock.find({ initials: req.params.initials }).sort({ time: -1 })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
