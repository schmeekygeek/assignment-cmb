import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config/config";

const SECRET_KEY: Secret = config.secretKey.toString();

export const createJWT = (userId: String, email: String): String => {
  const token = jwt.sign(
    { _id: userId, email: email },
    SECRET_KEY,
    { expiresIn: '7d', }
  );
  return token;
}

export const getUserIdFromToken = (token: string | JwtPayload): string => {
  return (token as JwtPayload)._id
}
