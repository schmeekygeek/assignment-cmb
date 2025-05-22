import * as userRepository from '../repositories/user.repository';

export const registerUser = async (name: string, email: string, password: string) => {
  return await userRepository.createUser({ name, email, password });
};
