import { Request, Response, NextFunction, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { JwtOptions } from '../utils/jwtoptions';
import { DBUser, DBQuote } from '../db';
import { Asset, SixthlyQuote, DailyQuote, User } from '../../shared';
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
      res.status(400)
        .json({
          error: err.message
        });
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
      return res.status(400)
        .json({
          error: err.message
        });
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
        .json({
          error: err.message
        });
    });
});

/**
 * PUT /buy/:id
 * buy quote for user :id
 * @payload: {
 *  symbol: string
 *  amount: number
 * }
 */
router.put('/buy/:id', (req: Request, res: Response) => {
  const date = moment().startOf('day');
  let user: User = null;
  DBUser.findOne({ _id: req.params.id })
    .then(doc => {
      user = doc;
      return DBQuote.findOne({ symbol: req.body.symbol, date: date });
    })
    .then(doc => {
      if (!doc) {
        throw new Error('no-quote');
      }
      const quote: SixthlyQuote = getLastQuote(doc);
      const price = quote.last * req.body.amount;
      if (!user.balance || price > user.balance) {
        throw new Error('not-enough-money');
      }
      const asset = getAssetIndex(user.portfolio, doc.symbol);
      if (asset !== -1) {
        user.portfolio[asset].amount += req.body.amount;
        user.portfolio[asset].price += quote.last;
        user.portfolio[asset].timestamp = moment().toISOString();
        user.balance -= price;
        return DBUser.findOneAndUpdate({ _id: req.params.id }, user, {new: true});
      } else {
        user.portfolio.push({
          symbol: doc.symbol,
          amount: req.body.amount,
          price: quote.last,
          timestamp: moment().toISOString()
        });
        user.balance -= price;
        return DBUser.findOneAndUpdate({ _id: req.params.id }, user, {new: true});
      }
    })
    .then(doc => {
      return res.json(doc);
    })
    .catch(err => {
      return res.status(400)
        .json({
          error: err.message
        });
    });
});

/**
 * PUT /sell/:id
 * sell quote
 */
router.put('/sell/:id', (req: Request, res: Response) => {
  const date = moment().startOf('day');
  let user: User = null;
  DBUser.findOne({ _id: req.params.id })
    .then(doc => {
      user = doc;
      return DBQuote.findOne({ symbol: req.body.symbol, date: date });
    })
    .then(doc => {
      const quote: SixthlyQuote = getLastQuote(doc);
      let amount = req.body.amount < 0 ? 0 : req.body.amount;
      const asset = getAssetIndex(user.portfolio, doc.symbol);
      if (asset !== -1) {
        throw new Error('no-asset');
      }
      amount = amount > user.portfolio[asset].amount ? user.portfolio[asset].amount : amount;
      const price = quote.last * amount;

      user.portfolio[asset].amount -= amount;
      user.portfolio[asset].price -= price;
      user.portfolio[asset].timestamp = moment().toISOString();
      user.balance += price;
      if (user.portfolio[asset].amount === 0) {
        user.portfolio.splice(asset, 1);
      }
      return DBUser.findOneAndUpdate({ _id: req.params.id }, user, {new: true});
    })
    .then(doc => {
      return res.json(doc);
    })
    .catch(err => {
      return res.status(400)
        .json({
          error: err.message
        });
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
      res.status(400)
        .json({
          error: err.message
        });
    });
});

/**
 * PUT /:id
 * update user with id
 */
router.put('/:id', (req: Request, res: Response) => {
  delete req.body.balance;
  delete req.body.portfolio;
  delete req.body.isAdmin;
  DBUser.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(400)
        .json({
          error: err.message
        });
    });
});

/**
 * getLastQuote(quote: DailyQuote): SixthlyQuote
 */
function getLastQuote(quote: DailyQuote): SixthlyQuote {
  let last: SixthlyQuote;
  for (let i = 8; i < 17; i++) {
    for (let j = 0; j < 6; j++) {
      if (quote.hours[i][j] && quote.hours[i][j].last) {
        last = quote.hours[i][j];
      }
    }
  }
  return last;
}

/**
 * getAssetIndex(assets: Array<Asset>, symbol: string): number
 * Find asset in assets
 */
function getAssetIndex(assets: Array<Asset>, symbol: string): number {
  for (let i = 0; i < assets.length; i++) {
    if (assets[i].symbol === symbol) {
      return i;
    }
  }
  return -1;
}

export default router;
