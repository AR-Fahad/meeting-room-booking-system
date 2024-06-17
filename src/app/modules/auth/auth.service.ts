import config from '../../config';
import { TUser } from '../user/user.interface';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';

const signUp = async (payload: TUser) => {
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.saltOrRounds),
  );
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  signUp,
};
