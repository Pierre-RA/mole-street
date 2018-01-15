import { Request, Response, NextFunction, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { JwtOptions } from '../utils/jwtoptions';
import { DBUser } from '../db';
import canRegister from '../middlewares/can-register';

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
 * POST /accessToken
 * send user credentials and get access token
 */
router.post('/accessToken', (req: Request, res: Response) => {
  if (!(req.body.email && req.body.password)) {
    return res.status(401).json({
      message: 'Not enough information for login.'
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  DBUser.findOne({ email: email}).select('+password')
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'user not found.'
        });
      }
      bcrypt.compare(password, user.password)
        .then(isValid => {
          const payload = {id: user.id};
          const token = jwt.sign(payload, JwtOptions.secretOrKey);
          return res.json({user: user, token: token});
        })
        .catch(err => {
          return res.status(401).json({
            message: 'No such user found.'
          });
        });
    })
    .catch(err => {
      return res.status(400).json(err);
    });
});

/**
 * POST /register
 * register user to the database
 */
router.post('/register', canRegister, (req: Request, res: Response) => {
  if (!req.body.user) {
    return res.status(400)
      .json({
        message: 'Not enough information to register.'
      });
  }
  const user = new DBUser(req.body.user);
  user.isAdmin = req.body.isAdmin || false;
  user.save()
    .then(doc => {
      return res.json(doc);
    })
    .catch(err => {
      return res.status(400)
        .json(err);
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
