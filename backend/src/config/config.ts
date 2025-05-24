import dotenv from 'dotenv';

dotenv.config();

interface Config {
  mongoUser: String;
  mongoPass: String;
  secretKey: string;
}

const config: Config = {
  mongoUser: String(process.env.MONGODB_USERNAME) || "root",
  mongoPass: String(process.env.MONGODB_PASSWORD) || "root",
  secretKey: String(process.env.SECRET_KEY) || "secret123",
};

export default config;
