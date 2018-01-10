import { Request, Response, Router } from 'express';
import * as moment from 'moment';

import { Generator, Evaluator } from '../utils';
import { DBQuote } from '../db';

const router = Router();

/**
 * GET /
 * get list of stocks
 */
router.get('/', (req: Request, res: Response) => {
  const time = moment();
  let hours = time.get('hours');
  let quarter: number = Math.floor(time.get('minutes').valueOf() / 15);
  let date = time.startOf('day');
  if (req.query.date) {
    date = moment(req.query.date).startOf('day');
  }
  if (hours < 8) {
    hours = 8;
    quarter = 0;
  }
  if (hours > 16) {
    hours = 16;
    quarter = 3;
  }
  const projection = '_id name symbol date indicators isIndex amount hours.' + hours + '.' + quarter;
  DBQuote.find({ date: date }, projection)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /by-indicator/:symbol
 * Return list of stocks from indicator :symbol
 */
router.get('/by-indicator/:symbol', (req: Request, res: Response) => {
  const time = moment();
  let hours = time.get('hours');
  let quarter: number = Math.floor(time.get('minutes').valueOf() / 15);
  let date = time.startOf('day');
  if (req.query.date) {
    date = moment(req.query.date).startOf('day');
  }
  if (hours > 16 || hours < 8) {
    hours = 8;
    quarter = 0;
  }
  const projection = '_id name symbol date indicators isIndex amount hours.' + hours + '.' + quarter;
  DBQuote.find({ date: date, indicators: req.params.symbol }, projection)
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
  DBQuote.findOne({ _id: req.params.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /:symbol
 * get list of values for stock :symbol
 */
router.get('/:symbol', (req: Request, res: Response) => {
  DBQuote.find({ symbol: req.params.symbol }).sort({ time: -1 })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
