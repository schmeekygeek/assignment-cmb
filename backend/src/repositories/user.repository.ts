import { User } from '../models/user';

export const createUser = async (data: {
  username: string,
  email: string,
  password: string,
}) => {
  const user = new User(data);
  return await user.save();
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email: email });
}
