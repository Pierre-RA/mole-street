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

/**
 * DELETE /
 * remove all stocks
 */
router.delete('/', (req: Request, res: Response) => {
  DBStock.findOneAndRemove({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
