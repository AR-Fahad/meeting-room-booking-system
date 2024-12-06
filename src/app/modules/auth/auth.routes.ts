import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  userLoginValidation,
  userSignupValidation,
} from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { auth } from '../../middlewares/auth';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validateRequest(userSignupValidation),
  AuthControllers.signup,
);

authRouter.post(
  '/login',
  validateRequest(userLoginValidation),
  AuthControllers.login,
);

authRouter.get('/user', auth('admin', 'user'), AuthControllers.getUser);
