import express from 'express';
import { createTask, getAllTasks } from '../controllers/task.controller';

const router = express.Router();

router.post('/create', createTask);
router.get('/getAll', getAllTasks)

export default router;
