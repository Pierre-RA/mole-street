import { Request, Response, Router } from 'express';

import { DBUser } from '../db';

const router = Router();

/**
 * GET /
 * return list of users
 */
router.get('/', (req: Request, res: Response) => {
  DBUser.find({})
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * GET /:id
 * get user with id
 */
router.get('/:id', (req: Request, res: Response) => {
  DBUser.findOne({ _id: req.params.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
