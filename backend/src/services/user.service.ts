import * as userRepository from '../repositories/user.repository';
import bcrypt from 'bcrypt';

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  password = hashedPassword
  return await userRepository.createUser({ name, email, password });
};
