import { NextFunction, Request, Response } from 'express';
import { TRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';
import { authResponse } from '../modules/auth/auth.utils';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

export const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      authResponse(res);
    }

    const decoded = Jwt.verify(
      token as string,
      config.jwtAccessToken as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    if (requiredRole && !requiredRole.includes(role)) {
      authResponse(res);
    }

    if (!(await User.findOne({ email, role }))) {
      authResponse(res);
    }

    next();
  });
};
