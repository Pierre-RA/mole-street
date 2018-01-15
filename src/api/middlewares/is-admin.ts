import { Request, Response, NextFunction } from 'express';

export default function canRegister(req: Request, res: Response, next: NextFunction) {
  if (!req.body.isAdmin) {
    return res.status(403).json({
      message: 'Restricted area.'
    });
  }

  next();
}
