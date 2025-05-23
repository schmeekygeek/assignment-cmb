import * as userRepository from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { CreateJWT } from '../util/jwtutil';

export const registerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  password = hashedPassword
  try {
    const user = await userRepository.createUser({ username, email, password });
    const jwt = CreateJWT(user.id, user.email) 
    return jwt
  } catch (err: any) {
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyValue)[0];
      throw new Error(`${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already taken`)
    } else {
      throw new Error(err.message)
    }
  }
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (user === null) {
    throw new Error("User account not found")
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error("Incorrect password")
  }
  return CreateJWT(user.id, user.email)
}
