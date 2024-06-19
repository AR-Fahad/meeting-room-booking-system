import config from '../../config';
import { TUser, TUserLogin } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import jwt from 'jsonwebtoken';

const signup = async (payload: TUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.saltOrRounds),
  );
  const createUser = await User.create(payload);

  const result = await User.findById(createUser._id);

  return result;
};

const login = async (payload: TUserLogin) => {
  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  if (!user) {
    throw new AppError(401, 'email', 'Invalid email');
  }

  // to compare password that comes from body & password that comes from database is matched or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(401, 'password', 'Invalid password');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, config.jwtAccessToken as string, {
    expiresIn: '1d',
  });

  const data = await User.findById(user?._id);

  return {
    token,
    data,
  };
};

export const AuthServices = {
  signup,
  login,
};
