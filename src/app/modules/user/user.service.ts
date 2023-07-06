import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const result = await User.create(user);
  return result;
};

const getUser = async () => {
  const result = await User.find({});
  return result;
};

const updateUser = async (payload: string, id: string) => {
  const result = await User.findByIdAndUpdate({ _id: id, payload });
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const userService = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
