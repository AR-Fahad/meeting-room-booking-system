/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import config from '../config';

export const globalErrorHandle = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message;

  // eslint-disable-next-line prefer-const
  let statusCode: number = 404;
  // eslint-disable-next-line prefer-const
  let errorMessages = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // stack: config.nodeEnv === 'development' ? error?.stack : null,
    error,
  });
};
