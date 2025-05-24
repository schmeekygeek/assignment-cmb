import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import config from './config/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as taskService from './services/task.service';

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: [ 'http://localhost:5173', 'https://topical-slightly-weevil.ngrok-free.app' ],
  credentials: true
}));
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/task', taskService.authenticateJWT, taskRoutes)

mongoose.connect(
  `mongodb://${config.mongoUser}:${config.mongoPass}@localhost:27017/task-app?authSource=admin`, {
    autoIndex: true,
  }
)
  .then(() => {
    console.log('MongoDB connected');
    app.listen("8080", () => console.log(`Server running on port 8080`));
  })
  .catch(err => console.error(err));
