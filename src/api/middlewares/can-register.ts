import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

export default function canRegister(req: Request, res: Response, next: NextFunction) {
  if (!req.headers['authorization']) {
    return res.status(401).json({
      message: 'Open signup is disabled.'
    });
  }

  if (req.headers['authorization'] !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({
      message: 'Open signup is disabled.'
    });
  }

  req.body.isAdmin = true;
  next();
}
