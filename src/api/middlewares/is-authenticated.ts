import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(403)
      .json({
        message: 'user is not authenticated'
      });
  }
  return next();
}
