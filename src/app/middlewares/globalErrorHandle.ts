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
  // eslint-disable-next-line prefer-const
  let message = error?.message || 'Error!';

  // eslint-disable-next-line prefer-const
  let statusCode: number = error?.statusCode || 404;
  // eslint-disable-next-line prefer-const
  let errorMessages = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  // message = error?.message || 'Something went wrong!';

  // statusCode = error?.statusCode || 404;

  if (statusCode === 401 && message === 'You have no access to this route') {
    res.status(error.statusCode).json({
      success: false,
      statusCode,
      message,
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      // stack: config.nodeEnv === 'development' ? error?.stack : null,
      error,
    });
  }
};
