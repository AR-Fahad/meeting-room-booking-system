import { NextFunction, Request, Response } from 'express';
import { TRole } from '../modules/user/user.interface';
import { catchAsync } from '../utils/catchAsync';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { AppError } from '../errors/AppError';

export const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req?.headers?.authorization;

    if (!authorization) {
      throw new AppError(401, '', 'You have no access to this route');
    }

    const token = (authorization as string).split(' ')[1];

    Jwt.verify(
      token as string,
      config.jwtAccessToken as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(401, '', 'You have no access to this route');
        }
        req.user = decoded as JwtPayload;
      },
    );

    const { email, role } = req.user;

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, '', 'You have no access to this route');
    }

    if (!(await User.findOne({ email, role }))) {
      throw new AppError(401, '', 'You have no access to this route');
    }

    next();
  });
};
