import { Response } from 'express';

type TPayload<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data: T;
};

export const sendResponse = <T>(res: Response, payload: TPayload<T>) => {
  const { success, statusCode, message, token, data } = payload;

  if (token) {
    res.status(statusCode).json({
      success,
      statusCode,
      message,
      token,
      data,
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
