import { Request, Response, Router } from 'express';
import * as passport from 'passport';
import { Generator, Evaluator } from '../utils';
import { DailyQuote } from '../../shared';
import { DBQuote } from '../db';
import isAdmin from '../middlewares/is-admin';
const pkg = require('../../../package.json');

const router = Router();

/**
 * GET /
 * Basic welcome route
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Mole-Street API',
    version: pkg['version'],
  });
});

/**
 * POST /random
 * Add random stocks to the list
 */
router.post('/random', passport.authenticate('jwt', {session: false}), isAdmin, (req: Request, res: Response) => {
  const length = req.query['length'] || 50;
  DBQuote.find().distinct('symbol')
    .then(doc => {
      return DBQuote.insertMany(Generator.getStockList(length, doc));
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
