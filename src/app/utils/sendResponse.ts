import { Response } from 'express';

type TPayload<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data?: T;
};

export const sendResponse = async <T>(res: Response, payload: TPayload<T>) => {
  const { success, statusCode, message, token, data } = payload;

  if (token) {
    res.status(statusCode).json({
      success,
      statusCode,
      message,
      token,
      data,
    });
  } else if (data === 'undefined') {
    res.status(statusCode).json({
      success,
      statusCode,
      message,
    });
  } else {
    res.status(statusCode).json({
      success,
      statusCode,
      message,
      data,
    });
  }
};
