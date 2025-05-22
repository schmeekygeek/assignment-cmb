import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import config from './config/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/user', userRoutes);

mongoose.connect(`mongodb://${config.mongoUser}:${config.mongoPass}@localhost:27017/task-app?authSource=admin`)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(config.port, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error(err));
