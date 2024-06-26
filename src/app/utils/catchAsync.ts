import { NextFunction, Request, RequestHandler, Response } from 'express';

export const catchAsync = (fs: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fs(req, res, next)).catch((err) => next(err));
  };
};
