import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signup(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  const { token, data } = result;
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token,
    data,
  });
});

export const AuthControllers = {
  signup,
  login,
};
