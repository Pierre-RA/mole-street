import { Request, Response, Router } from 'express';
import * as moment from 'moment';

import { Generator, Evaluator } from '../utils';
import { DBIndicator } from '../db';

const router = Router();

/**
 * GET /
 * get list of indicators
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
  const projection = '_id name symbol date hours.' + hours + '.' + quarter;
  DBIndicator.find({ date: date }, projection)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /:symbol
 * get specific indicator
 */
router.get('/:symbol', (req: Request, res: Response) => {
  let date = moment().startOf('day');
  if (req.query.date) {
    date = moment(req.query.date).startOf('day');
  }
  DBIndicator.findOne({ symbol: req.params.symbol, date: date })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
