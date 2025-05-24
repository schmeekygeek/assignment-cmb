import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  mongoUser: String;
  mongoPass: String;
  secretKey: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  mongoUser: String(process.env.MONGODB_USERNAME) || "root",
  mongoPass: String(process.env.MONGODB_PASSWORD) || "root",
  secretKey: String(process.env.SECRET_KEY) || "secret123",
};

export default config;
