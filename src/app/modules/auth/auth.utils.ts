import { Response } from 'express';
import { sendResponse } from '../../utils/sendResponse';

export const authResponse = (res: Response) => {
  sendResponse(res, {
    success: false,
    statusCode: 401,
    message: 'You have no access to this route',
  });
};
