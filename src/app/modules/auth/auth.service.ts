import config from '../../config';
import { TUser, TUserLogin } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { AppError } from '../../errors/AppError';
import jwt from 'jsonwebtoken';

const signup = async (payload: TUser) => {
  // password that comes from body is hashing by bcrypt to make a user secured
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.saltOrRounds),
  );

  // by default role will be user
  payload.role = 'user';

  // post an user
  const createUser = await User.create(payload);

  // never return createUser directly because password also select with create
  // so again find it by _id
  const result = await User.findById(createUser._id);

  return result;
};

const login = async (payload: TUserLogin) => {
  // find a user by email with selecting password for comparison
  const user = await User.findOne({
    email: payload.email,
  }).select('+password');

  // check whether an user is exists or not with this email
  if (!user) {
    throw new AppError(401, 'email', 'Invalid email');
  }

  // to compare password that comes from body & password that comes from database is matched or not
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  // check that password is matched or not
  if (!isPasswordMatched) {
    throw new AppError(401, 'password', 'Invalid password');
  }

  // JwtPayload can carry email and role
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // signup with jwt for get a token to determine authentic user
  const token = jwt.sign(jwtPayload, config.jwtAccessToken as string, {
    expiresIn: '1d',
  });

  // again find user by _id without password
  const data = await User.findById(user?._id);

  return {
    token,
    data,
  };
};

const getUser = async (email: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AppError(401, 'email', 'There is no user with this email');
  }

  return user;
};

export const AuthServices = {
  signup,
  login,
  getUser,
};
