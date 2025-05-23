import express from 'express';
import { createTask } from '../controllers/task.controller';

const router = express.Router();

router.post('/create', createTask);

export default router;
