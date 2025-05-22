import { User } from '../models/user';

export const createUser = async (data: { name: string, email: string, password: string }) => {
  const user = new User(data);
  return await user.save();
};
