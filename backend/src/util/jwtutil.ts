import jwt, { Secret } from "jsonwebtoken";
import config from "../config/config";

const SECRET_KEY: Secret = config.secretKey.toString();

export function CreateJWT(userId: String, email: String): String {
  const token = jwt.sign(
    { _id: userId, email: email },
    SECRET_KEY,
    { expiresIn: '7d', }
  );
  return token;
}
