import { Request, Response, NextFunction } from 'express';

export default function canRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(req.user && req.user.isAdmin)) {
    return res.status(403)
      .json({
        message: 'Restricted area.'
      });
  }

  return next();
}
